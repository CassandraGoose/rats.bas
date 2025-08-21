export class PlayerState {
  name: string;
  score: number;
  playerObject: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(
    name: string,
    playerObject: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    this.name = name;
    this.score = 0;
    this.playerObject = playerObject;
  }

  increasePlayerScore() {
    this.score = this.score + 1;
  }
}
