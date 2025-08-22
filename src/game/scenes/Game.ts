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
  player1: Player;
  player2: Player;
  players: Player[];
  // todo?
  pizza: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null;
  explosionDamages: Phaser.Physics.Arcade.StaticGroup;
  gameState: GameState;

  constructor() {
    super("Game");
  }

  create() {
    this.setupBackground();
    this.setupGame();
    this.setupUI();
  }

  update() {
    if (this.pizza) {
      if (this.pizza.body.blocked.down || this.pizza.body.touching.down) {
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
    // todo what is this do we need it (genned with the template)
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000a3);

    this.buildings = this.physics.add.staticGroup();
    this.createBuildings();
  }

  setupProjectialUI() {
    console.log(this.playerGroup.children);
    const currentPlayer = this.playerGroup.getChildren()[
      this.gameState.currentPlayer
    ] as Phaser.Physics.Arcade.Image;
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

    this.msg_text = this.add.text(512, 720, "0>Score<0", {
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
    // todo
    this.player1 = new Player(this.physics, this.buildings, this.playerGroup);
    this.player2 = new Player(this.physics, this.buildings, this.playerGroup);
    this.players = [this.player1, this.player2];
    // fix hard code rounds
    this.gameState = new GameState(3);
    this.explosionDamages = this.physics.add.staticGroup();
  }

  startNextRound() {
    this.gameState.setNextRound();

    this.resetBuildings();
    this.resetExplosionDamage();
    //todo
    this.player1.resetPlayer();
    this.player2.resetPlayer();
  }

  resetBuildings() {
    this.buildings.clear(true, true);
    this.createBuildings();

    this.physics.add.collider(this.playerGroup, this.buildings);
  }

  resetExplosionDamage() {
    this.explosionDamages.clear(true, true);
  }

  // todo deal with the pizza flying off the edge, need to go to next player if so.

  onPizzaHit() {
    if (!this.pizza) return;

    // todo make a mini explosion thing for this. dont' need to damage the buildings tho

    this.pizza.destroy();
    this.pizza = null;
    this.removeProjectialUI();

    this.gameState.toggleCurrentPlayer();

    this.setupProjectialUI();
  }

  explodeRat() {
    //trigger some kind of explosion sprite
    // todo make the size of the rats saved somehwere....
    // make the colors globally accessible in some way
    this.explosionDamages.create(
      this.player2.gameObject.x,
      this.player2.gameObject.y,
      "white"
    ) as Phaser.Physics.Arcade.Image;

    const explosionCircle = this.add.circle(
      this.player2.gameObject.x,
      this.player2.gameObject.y,
      179,
      0xff0000a3
    );
    this.explosionDamages.add(explosionCircle);

    // todo put text on screen for who won.
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
      .image(player.x, player.y, "pizza")
      .setScale(0.3);

    this.physics.add.collider(
      this.player1.gameObject,
      this.pizza,
      this.explodeRat,
      undefined,
      this
    );
    // todo: make player method to handle this.

    this.physics.add.collider(
      this.player2.gameObject,
      this.pizza,
      this.explodeRat,
      undefined,
      this
    );

    this.physics.add.collider(this.pizza, this.buildings);

    const velocityScaleFactor = 5;
    const speed = velocity * velocityScaleFactor;

    this.pizza.setVelocity(
      speed * Math.cos(Phaser.Math.DegToRad(angle)),
      speed * Math.sin(Phaser.Math.DegToRad(angle)) * -1
    );
  }

  createBuildings() {
    // todo create building entity.
    const buildingCount = 8;
    const buildingWidth = this.scale.width / buildingCount;

    for (let i = 0; i < buildingCount; i++) {
      const x = i * buildingWidth + buildingWidth / 2;
      const height = Phaser.Math.Between(100, this.scale.height - 200);
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
