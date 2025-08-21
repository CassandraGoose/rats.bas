import { PlayerState } from "./PlayerState";

export class GameState {
  currentPlayer: PlayerState;
  rounds: number;
  currentRound: number;
  player1: PlayerState;
  player2: PlayerState;

  constructor(
    rounds: number,
    player1Object: Phaser.Types.Physics.Arcade.ImageWithDynamicBody,
    player2Object: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    this.rounds = rounds | 3;
    this.currentRound = 0;
    this.player1 = new PlayerState("Player 1", player1Object);
    this.player2 = new PlayerState("Player 2", player2Object);
    this.currentPlayer = this.player1;
  }

  setNextRound() {
    this.currentRound = this.currentRound + 1;
  }

  checkGameOver() {
    return this.currentRound > this.rounds;
  }

  setCurrentPlayer(player: PlayerState) {
    this.currentPlayer = player;
  }
}
