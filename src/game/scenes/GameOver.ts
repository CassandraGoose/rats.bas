import { Scene, GameObjects } from "phaser";
import { createStarRectangle } from "../utilities/GameHelpers";
import { Player } from "../entities/Player";

export class GameOver extends Scene {
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
  winningPlayerName: string;

  constructor() {
    super("GameOver");
  }

    init(data: { winningPlayer: Player}) {
        console.log('Received data:', data);
        this.winningPlayerName = `Player ${data.winningPlayer.number}`;
    }


  create() {
    createStarRectangle(this);

    this.description = this.add
      .text(
        512,
        300,
        "GAME OVER",
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
      .text(
        512,
        250,
        `${this.winningPlayerName} won! Nice work!`,
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
      .text(512, 600, "Press any key to play again", {
        fontFamily: "Courier New",
        fontSize: 26,
        color: "#ffffff",
        align: "center",
        wordWrap: { width: 850, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    this.input.keyboard?.on("keydown", () => {
      this.scene.start("MainMenu");
    });
  }
}
