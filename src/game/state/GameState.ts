export class GameState {
  currentPlayer: number;
  rounds: number;
  currentRound: number;

  constructor() {
    this.rounds = 3;
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
