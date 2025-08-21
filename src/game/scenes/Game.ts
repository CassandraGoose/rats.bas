import { Scene } from "phaser";
import { GameState } from "../state/GameState";
import { PlayerState } from "../state/PlayerState";
import { createAngleVelocityUI } from "../utilities/GameHelpers";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  buildings: Phaser.Physics.Arcade.StaticGroup;
  rats: Phaser.Physics.Arcade.Group;
  player1: PlayerState;
  player2: PlayerState;
  pizza: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null;
  explosionDamages: Phaser.Physics.Arcade.StaticGroup;
  gameState: GameState;

  constructor() {
    super("Game");
  }
  //todo
  // rat -> add rat, explode rat? setupPhysics? or  do we need that stuff in the game? idk
  // buildings -> create buildings, setupPhysics

  create() {
    this.setupBackground();
    this.setupGame();
    this.setupUI();

    this.setupPlayerPhysics();
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

    this.createBuildings();
  }

  setupProjectialUI() {
    const callback = (
      angleInput: HTMLInputElement,
      velocityInput: HTMLInputElement
    ) => {
      const angle = parseFloat(angleInput.value);
      const velocity = parseFloat(velocityInput.value);

      this.firePizza(this.gameState.currentPlayer, angle, velocity);
    };

    createAngleVelocityUI(this.gameState.currentPlayer.name, callback);
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
    const [rat1, rat2] = this.createRats();
    // todo fix hard code rounds
    this.gameState = new GameState(3, rat1, rat2);
    this.player1 = this.gameState.player1;
    this.player2 = this.gameState.player2;
    this.explosionDamages = this.physics.add.staticGroup();
  }

  setupPlayerPhysics() {
    this.player1.playerObject.setBounce(0.2);
    this.player2.playerObject.setBounce(0.2);
    this.player1.playerObject.setCollideWorldBounds(true);
    this.player2.playerObject.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1.playerObject, this.buildings);
    this.physics.add.collider(this.player2.playerObject, this.buildings);
  }

  startNextRound() {
    this.gameState.setNextRound();

    this.resetBuildings();
    this.resetExplosionDamage();
    this.resetRats();
  }

  resetBuildings() {
    this.buildings.clear(true, true); // remove all old buildings
    this.createBuildings(); // add new buildings

    // 🔑 re-add the collider with rats (or any other objects that need it)
    this.physics.add.collider(this.rats, this.buildings);
  }

  resetExplosionDamage() {
    this.explosionDamages.clear(true, true);
  }

  resetRats() {
    const buildingCount = this.buildings.getChildren().length;

    const rat1Building =
      this.buildings.getChildren()[1] as Phaser.Physics.Arcade.Image;
    const rat2Building = this.buildings.getChildren()[
      buildingCount - 2
    ] as Phaser.Physics.Arcade.Image;

    this.player1.playerObject.setPosition(rat1Building.x, 0);
    this.player1.playerObject.setVelocity(0, 0);
    this.player1.playerObject.setAcceleration(0, 0);

    this.player2.playerObject.setPosition(rat2Building.x, 0);
    this.player2.playerObject.setVelocity(0, 0);
    this.player2.playerObject.setAcceleration(0, 0);
  }

  // todo deal with the pizza flying off the edge, need to go to next player if so.

  onPizzaHit() {
    if (!this.pizza) return;

    // todo make a mini explosion thing for this. dont' need to damage the buildings tho

    this.pizza.destroy();
    this.pizza = null;
    this.removeProjectialUI();

    const newPlayer =
      this.gameState.currentPlayer === this.gameState.player1
        ? this.gameState.player2
        : this.gameState.player1;

    this.gameState.setCurrentPlayer(newPlayer);

    this.setupProjectialUI();
  }

  explodeRat() {
    console.log("explode rat");

    //trigger some kind of explosion sprite
    // todo make the size of the rats saved somehwere....
    // make the colors globally accessible in some way
    const circle = this.explosionDamages.create(
      this.player2.playerObject.x,
      this.player2.playerObject.y,
      "white"
    ) as Phaser.Physics.Arcade.Image;
    this.add.circle(
      this.player2.playerObject.x,
      this.player2.playerObject.y,
      179,
      0xff0000a3
    );

    this.startNextRound();
  }

  firePizza(player: PlayerState, angle: number, velocity: number) {
    this.pizza = this.physics.add
      .image(player.playerObject.x, player.playerObject.y, "pizza")
      .setScale(0.3);

    this.physics.add.collider(
      this.player2.playerObject,
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

  createRats() {
    this.rats = this.physics.add.group();

    const rat1Building =
      this.buildings.getChildren()[1] as Phaser.Physics.Arcade.Sprite;
    const rat2Building = this.buildings.getChildren()[
      this.buildings.getChildren().length - 2
    ] as Phaser.Physics.Arcade.Sprite;

    // todo we can just add x and then make the buildings collidable and not have to a y, right???? idk
    const player1 = this.physics.add
      .image(rat1Building.x, 0, "rat")
      .setScale(0.7);
    const player2 = this.physics.add
      .image(rat2Building.x, 0, "rat")
      .setScale(0.7);

    player1.body.setSize(126, 179);
    player2.body.setSize(126, 179);
    player1.body.setOffset(0, 0);
    player2.body.setOffset(0, 0);

    this.rats.add(player1);
    this.rats.add(player2);
    return [player1, player2];

    // this.add.sprite(rat1Building.x, rat1Building.x - rat1Building.height / 2 - 30, 'rat');
    // this.add.sprite(rat2Building.x, rat2Building.x - rat2Building.height / 2 - 30, 'rat');
  }

  createBuildings() {
    this.buildings = this.physics.add.staticGroup();

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
