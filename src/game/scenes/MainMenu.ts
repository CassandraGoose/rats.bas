import { Scene, GameObjects } from "phaser";

export class MainMenu extends Scene {
  // background: GameObjects.Image;
  // logo: GameObjects.Image;
  title: GameObjects.Text;
  description: GameObjects.Text;
  instruction: GameObjects.Text;
  background: [
    GameObjects.Text,
    GameObjects.Text,
    GameObjects.Text,
    GameObjects.Text,
    GameObjects.Text,
    GameObjects.Text,
    GameObjects.Text,
    GameObjects.Text
  ];

  constructor() {
    super("MainMenu");
  }

  create() {
    // this.background = this.add.image(512, 384, 'background');

    // this.logo = this.add.image(512, 300, 'logo')

    //todo rename mainmenu to instructions or something

    // todo lol make these with loops or something and put them in a method
    this.add.text(
      10,
      10,
      "*    *    *    *    *    *    *    *    *    *    *    *",
      { color: "red", fontFamily: "Courier New", fontSize: 32 }
    );
    this.add.text(
      10,
      550,
      "*    *    *    *    *    *    *    *    *    *    *    *",
      { color: "red", fontFamily: "Courier New", fontSize: 32 }
    );
    this.add.text(10, 112, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });
    this.add.text(10, 224, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });

    this.add.text(10, 336, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });

    this.add.text(10, 448, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });

    this.add.text(972, 112, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });
    this.add.text(972, 224, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });

    this.add.text(972, 336, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });

    this.add.text(972, 448, "*", {
      color: "red",
      fontFamily: "Courier New",
      fontSize: 32,
    });

    this.title = this.add
      .text(512, 200, "R A T S", {
        fontFamily: "Courier",
        fontSize: 38,
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    this.description = this.add
      .text(
        512,
        300,
        "Your mission is to hit your opponent with the exploding pizza slice by varying the angle and power of your throw, taking into account gravity and the city skyline.",
        {
          fontFamily: "Courier New",
          fontSize: 26,
          color: "#ffffff",
          align: "center",
          wordWrap: { width: 850, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5);

    this.description = this.add
      .text(512, 600, "Press any key to continue", {
        fontFamily: "Courier New",
        fontSize: 26,
        color: "#ffffff",
        align: "center",
        wordWrap: { width: 850, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    this.input.keyboard?.on('keydown', () => {
      this.scene.start("Game");
    });
  }
}
