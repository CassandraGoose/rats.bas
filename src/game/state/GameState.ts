export class GameState {
  currentPlayer: number;
  rounds: number;
  currentRound: number;


  constructor(
    rounds: number,
    // player1Object: Phaser.Types.Physics.Arcade.ImageWithDynamicBody,
    // player2Object: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    this.rounds = rounds | 3;
    this.currentRound = 0;

    this.currentPlayer = 0;
  }

  setNextRound() {
    this.currentRound = this.currentRound + 1;
  }

  checkGameOver() {
    return this.currentRound > this.rounds;
  }

  toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }
}
