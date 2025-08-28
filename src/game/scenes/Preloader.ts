import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets");
    this.load.spritesheet("rat", "rat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("pizza", "pizza.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("explosion", "explosion.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.textures.generate("white", {
      data: ["1"],
      pixelWidth: 1,
      pixelHeight: 1,
    });
  }

  create() {
    this.scene.start("MainMenu");
  }
}
