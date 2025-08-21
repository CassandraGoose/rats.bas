import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  buildings: Phaser.Physics.Arcade.StaticGroup;
  rats: Phaser.GameObjects.Sprite;
  player1: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  player2: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  pizza: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null;
  constructor() {
    super("Game");
  }

  // gameManager -> number of rounds, player1, player2, score, gameover
  // player -> whichplayer, name (if we get that far), isCurrentTurn, setupPhysics
  // rat -> add rat, explode rat? setupPhysics? or  do we need that stuff in the game? idk
  // buildings -> create buildings, setupPhysics

  create() {
    // todo what is this do we need it (genned with the template)
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000a3);

    this.createAngleVelocityUI();
    this.createBuildings();
    const [rat1, rat2] = this.createRats();
    this.player1 = rat1;
    this.player2 = rat2;
    this.player1.setBounce(0.2);
    this.player2.setBounce(0.2);
    this.player1.setCollideWorldBounds(true);
    this.player2.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1, this.buildings);
    this.physics.add.collider(this.player2, this.buildings);
    // this.background = this.add.image(512, 384, "background");
    // this.background.setAlpha(0.5);

    // todo put in method
    this.msg_text = this.add.text(512, 720, "0>Score<0", {
      fontFamily: "Courier",
      fontSize: 26,
      backgroundColor: "#0000A3",
      color: "#ffffff",
      align: "center",
    });
    this.msg_text.setOrigin(0.5);

    // this.input.once("pointerdown", () => {
    //   this.scene.start("GameOver");
    // });
  }

  update() {
    if (this.pizza) {
      if (this.pizza.body.blocked.down || this.pizza.body.touching.down) {
        // todo make a mini explosion thing for this. dont' need to damage the buildings tho
        this.pizza.destroy();
        this.pizza = null;
      }
    }
  }

  shutdown() {
    const ui = document.getElementById("projectile-ui");
    if (ui) {
      ui.remove();
    }
  }

  createAngleVelocityUI() {
    // Create a container div
    //todo make this...better somehow
    const container = document.createElement("div");
    container.id = "projectile-ui";
    container.style.position = "absolute";
    container.style.top = "10px";
    container.style.left = "10px";
    container.style.zIndex = "10";
    container.style.color = "white";

    // Angle input
    const angleInput = document.createElement("input");
    angleInput.id = "angle";
    angleInput.type = "number";
    angleInput.min = "0";
    angleInput.max = "180";
    angleInput.value = "45";
    container.appendChild(document.createTextNode("Angle: "));
    container.appendChild(angleInput);
    container.appendChild(document.createTextNode("° "));

    // Velocity input
    const velocityInput = document.createElement("input");
    velocityInput.id = "velocity";
    velocityInput.type = "number";
    velocityInput.min = "0";
    velocityInput.max = "100";
    velocityInput.value = "50";
    container.appendChild(document.createTextNode("Velocity: "));
    container.appendChild(velocityInput);

    // Shoot button
    const shootButton = document.createElement("button");
    shootButton.id = "shoot";
    shootButton.innerText = "Throw!";
    container.appendChild(shootButton);

    document.body.appendChild(container);

    // Event listener
    shootButton.addEventListener("click", () => {
      const angle = parseFloat((angleInput as HTMLInputElement).value);
      const velocity = parseFloat((velocityInput as HTMLInputElement).value);

      this.firePizza(angle, velocity);
    });
  }

  explodeRat() {
    console.log("explode rat");
    //trigger some kind of explosion sprite
    // todo make the size of the rats saved somehwere....
    // make the colors globally accessible in some way
    this.add.circle(this.player2.x, this.player2.y, 179, 0xff0000a3);
  }

  firePizza(angle: number, velocity: number) {
    this.pizza = this.physics.add
      .image(this.player1.x, this.player1.y, "pizza")
      .setScale(0.3);
    this.physics.add.collider(
      this.player2,
      this.pizza,
      this.explodeRat,
      undefined,
      this
    );

    this.physics.add.collider(this.pizza, this.buildings);

    const velocityScaleFactor = 5;
    const speed = velocity * velocityScaleFactor;
    // todo, make all this dynamic
    this.pizza.setVelocity(
      speed * Math.cos(Phaser.Math.DegToRad(angle)),
      speed * Math.sin(Phaser.Math.DegToRad(angle)) * -1
    );
  }

  createRats() {
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
