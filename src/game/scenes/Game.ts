import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  buildings: Phaser.Physics.Arcade.StaticGroup;
  rats: Phaser.GameObjects.Sprite;
  constructor() {
    super("Game");
  }

  create() {
    // todo what is this do we need it (genned with the template)
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000a3);

    this.createBuildings();
    const [player1, player2] = this.createRats();

    player1.setBounce(0.2);
    player2.setBounce(0.2);
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    this.physics.add.collider(player1, this.buildings);
    this.physics.add.collider(player2, this.buildings);

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
      player2.body.setSize(126, 179)
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

    const building = this.buildings.create(x, y, 'white') as Phaser.Physics.Arcade.Image;

    building.setDisplaySize(buildingWidth - 10, height);

    building.refreshBody();

    building.setTint(0xFFAAAAAA);
  }
}



}
