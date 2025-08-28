import { Scene, GameObjects } from "phaser";
import { createStarRectangle } from "../utilities/GameHelpers";

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
    createStarRectangle(this);

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
