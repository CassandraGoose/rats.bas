import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  buildings: Phaser.GameObjects.Rectangle[] = [];
  rats: Phaser.GameObjects.Sprite
  constructor() {
    super("Game");
  }

  create() {
    // todo what is this do we need it (genned with the template)
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xFF0000A3);

    this.createBuildings();
    this.createRats();

    // this.background = this.add.image(512, 384, "background");
    // this.background.setAlpha(0.5);

    // todo put in method
    this.msg_text = this.add.text(512, 720, "0>Score<0", {
      fontFamily: "Courier",
      fontSize: 26,
      backgroundColor: '#0000A3',
      color: "#ffffff",
      align: "center",
    });
    this.msg_text.setOrigin(0.5);

    // this.input.once("pointerdown", () => {
    //   this.scene.start("GameOver");
    // });
  }

  createRats() {
    const rat1Building = this.buildings[1];
    const rat2Building = this.buildings[this.buildings.length - 2];

    this.add.image(rat1Building.x, rat1Building.y - rat1Building.height / 2 - 65, 'rat').setScale(0.7);
    this.add.image(rat2Building.x, rat2Building.y - rat2Building.height / 2 - 65
      , 'rat').setScale(0.7);
    // this.add.sprite(rat1Building.x, rat1Building.x - rat1Building.height / 2 - 30, 'rat');
    // this.add.sprite(rat2Building.x, rat2Building.x - rat2Building.height / 2 - 30, 'rat');
  }

  createBuilding(x: number, y: number, width: number, height: number) {
    const building = this.add.rectangle(x, y, width, height, 0xFFAAAAAA);
    return building;
  }

  createBuildings() {
    const buildingCount = 8;
    const buildingWidth = this.scale.width / buildingCount;

    for (let i = 0; i < buildingCount; i++) {
      const x = i * buildingWidth + buildingWidth / 2;
      const height = Phaser.Math.Between(100, this.scale.height - 200);
      const y = 750 - height / 2;

      const building = this.createBuilding(x, y, buildingWidth - 10, height);
      this.buildings.push(building);
    }
  }
}
