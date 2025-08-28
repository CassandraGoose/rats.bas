import { Scene } from "phaser";
import { GameState } from "../state/GameState";
import { createAngleVelocityUI } from "../utilities/GameHelpers";
import { Player } from "../entities/Player";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  buildings: Phaser.Physics.Arcade.StaticGroup;
  playerGroup: Phaser.Physics.Arcade.Group;
  players: Player[];
  pizza: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null;
  explosionDamages: Phaser.Physics.Arcade.StaticGroup;
  gameState: GameState;

  constructor() {
    super("Game");
    this.players = [];
  }

  create() {
    this.setupBackground();
    this.setupGame();
    this.setupUI();

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: 0,
    });
  }

  update() {
    if (this.pizza) {
      if (
        this.pizza.body.blocked.down ||
        this.pizza.body.touching.down ||
        this.pizza.x < this.camera.worldView.x ||
        this.pizza.x > this.camera.worldView.right
      ) {
        this.onPizzaHit();
      }
    }
  }

  shutdown() {
    this.removeProjectialUI();
  }

  removeProjectialUI() {
    const ui = document.getElementById("projectile-ui");
    if (ui) {
      ui.remove();
    }
  }

  setupBackground() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000a3);

    this.buildings = this.physics.add.staticGroup();
    this.createBuildings();
  }

  getCurrentPlayer() {
    return this.playerGroup.getChildren()[
      this.gameState.currentPlayer
    ] as Phaser.Physics.Arcade.Image;
  }

  getOtherPlayer(nontargetPlayer: Player) {
    return this.players.find((player) => player !== nontargetPlayer);
  }

  setupProjectialUI() {
    const currentPlayer = this.getCurrentPlayer();
    const callback = (
      angleInput: HTMLInputElement,
      velocityInput: HTMLInputElement
    ) => {
      const angle = parseFloat(angleInput.value);
      const velocity = parseFloat(velocityInput.value);

      this.firePizza(currentPlayer, angle, velocity);
    };

    createAngleVelocityUI(this.gameState.currentPlayer, callback);
  }

  setupUI() {
    this.setupProjectialUI();
    this.updateScore("0>Score<0");
  }

  updateScore(score: string) {
    this.msg_text = this.add.text(512, 720, score, {
      fontFamily: "Courier",
      fontSize: 26,
      backgroundColor: "#0000A3",
      color: "#ffffff",
      align: "center",
    });

    this.msg_text.setOrigin(0.5);
  }

  setupGame() {
    this.playerGroup = this.physics.add.group();
    for (let i = 0; i < 2; i++) {
      const player = new Player(this.physics, this.buildings, this.playerGroup);
      this.players.push(player);
    }
    this.gameState = new GameState();
    this.explosionDamages = this.physics.add.staticGroup();
  }

  startNextRound() {
    this.gameState.setNextRound();
    this.resetBuildings();
    this.resetExplosionDamage();
    this.updateScore(this.getScore());

    this.players.forEach((player) => {
      if (player.score === 3) {
        this.scene.start("GameOver", { winningPlayer: player });
        this.removeProjectialUI();
      }
    });
    this.players.forEach((player) => player.resetPlayer());
  }

  getScore() {
    return `${this.players[0].score}>Score<${this.players[1].score}}`;
  }

  resetBuildings() {
    this.buildings.clear(true, true);
    this.createBuildings();
    this.physics.add.collider(this.playerGroup, this.buildings);
  }

  resetExplosionDamage() {
    this.explosionDamages.clear(true, true);
  }

  onPizzaHit() {
    if (!this.pizza) return;

    const explosionX = this.pizza.x;
    const explosionY = this.pizza.y;

    this.pizza.destroy();
    this.pizza = null;
    const explosion = this.physics.add
      .sprite(explosionX, explosionY, "explosion")
      .setScale(3);
    explosion.body.allowGravity = false;
    explosion.anims.play("explode", true);
    explosion.on("animationcomplete", () => {
      explosion.destroy();
    });

    this.removeProjectialUI();

    this.gameState.toggleCurrentPlayer();
    console.log("pizza hit, new current player:", this.gameState.currentPlayer);
    this.setupProjectialUI();
  }

  explodeRat(player: Player) {
    this.explosionDamages.create(
      player.gameObject.x,
      player.gameObject.y,
      "white"
    );

    const explosionCircle = this.add.circle(
      player.gameObject.x,
      player.gameObject.y,
      80,
      0xff0000a3
    );
    this.explosionDamages.add(explosionCircle);

    const scoredPlayer = this.getOtherPlayer(player);
    scoredPlayer?.updateScore();
    this.updateScore(this.getScore());
    this.physics.pause();

    this.time.delayedCall(1000, () => {
      this.physics.resume();
      this.startNextRound();
    });
  }

  firePizza(
    player: Phaser.Physics.Arcade.Image,
    angle: number,
    velocity: number
  ) {
    this.pizza = this.physics.add
      .sprite(player.x, player.y - 80, "pizza")
      .setScale(2);

    this.tweens.add({
      targets: this.pizza,
      angle: 360,
      duration: 500,
      repeat: -1,
      ease: "Linear",
    });

    this.players.forEach((player) => {
      this.physics.add.overlap(
        this.pizza!,
        player.gameObject,
        () => {
          this.explodeRat(player);
          this.time.delayedCall(50, () => {
            this.onPizzaHit();
          });
        },
        undefined,
        this
      );
    });

    this.physics.add.collider(
      this.pizza,
      this.buildings,
      () => {
        this.onPizzaHit();
      },
      undefined,
      this
    );

    let calculatedAngle = angle;
    const velocityScaleFactor = 5;
    const speed = velocity * velocityScaleFactor;

    if (this.gameState.currentPlayer === 2) {
      calculatedAngle = Phaser.Math.Angle.WrapDegrees(angle + 180);
    }

    const xDirection = this.gameState.currentPlayer === 1 ? -1 : 1;
    const yDirection = -1;

    this.pizza.setVelocity(
      xDirection * speed * Math.cos(Phaser.Math.DegToRad(calculatedAngle)),
      yDirection * speed * Math.sin(Phaser.Math.DegToRad(calculatedAngle))
    );
  }

  createBuildings() {
    const buildingCount = 8;
    const buildingWidth = this.scale.width / buildingCount;

    for (let i = 0; i < buildingCount; i++) {
      const x = i * buildingWidth + buildingWidth / 2;
      const height = Phaser.Math.Between(100, this.scale.height - 300);
      const y = 750 - height / 2;

      const building = this.buildings.create(
        x,
        y,
        "white"
      ) as Phaser.Physics.Arcade.Image;

      building.setDisplaySize(buildingWidth - 10, height);

      building.refreshBody();

      building.setTint(0xffaaaaaa);
    }
  }
}
