"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
class Game {
    constructor(boardSize = 3) {
        this._boardSize = boardSize;
        this._board = [];
        this._currentPlayer = Math.random() < 0.5 ? 1 : 2;
        for (let i = 0; i < boardSize * boardSize; i++) {
            this._board[i] = 0;
        }
    }
    get boardSize() {
        return this._boardSize;
    }
    get board() {
        return this._board;
    }
    get currentPlayer() {
        return this._currentPlayer;
    }
    get winner() {
        for (let row = 0; row < this.boardSize; row++) {
            const i1 = this.toIndex(row, 0);
            const i2 = this.toIndex(row, 1);
            const i3 = this.toIndex(row, 2);
            if (this.validEquals(i1, i2) && this.validEquals(i2, i3)) {
                return this.board[i1];
            }
        }
        for (let col = 0; col < this.boardSize; col++) {
            const i1 = this.toIndex(0, col);
            const i2 = this.toIndex(1, col);
            const i3 = this.toIndex(2, col);
            if (this.validEquals(i1, i2) && this.validEquals(i2, i3)) {
                return this.board[i1];
            }
        }
        const middle = this.toIndex(1, 1);
        const topLeft = this.toIndex(0, 0);
        const topRight = this.toIndex(0, 2);
        const bottomRight = this.toIndex(2, 2);
        const bottomLeft = this.toIndex(2, 0);
        if (this.validEquals(topLeft, middle) && this.validEquals(middle, bottomRight)) {
            return this.board[middle];
        }
        if (this.validEquals(topRight, middle) && this.validEquals(middle, bottomLeft)) {
            return this.board[middle];
        }
        return 0;
    }
    get boardFull() {
        return this.board.every(cell => cell !== 0);
    }
    get boardEmpty() {
        return this.board.every(cell => cell === 0);
    }
    get emptyCellAmount() {
        return this.board.filter(cell => cell === 0).length;
    }
    clone() {
        const game = new Game(this.boardSize);
        for (let i = 0; i < this.board.length; i++) {
            game.board[i] = this.board[i];
        }
        return game;
    }
    isMoveValid(position) {
        return position < this.board.length && this.board[position] == 0;
    }
    updateBoard(player, position) {
        this.board[position] = player;
    }
    nextPlayer() {
        this._currentPlayer = Player_1.getOpponent(this.currentPlayer);
    }
    toIndex(row, column) {
        return row * this.boardSize + column;
    }
    validEquals(position1, position2) {
        return (this.board[position1] !== 0 && this.board[position1] === this.board[position2]);
    }
}
exports.default = Game;
