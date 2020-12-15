"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const localize_1 = __importDefault(require("../config/localize"));
class AI {
    constructor() {
        this.id = '';
        this.displayName = localize_1.default.__('game.ai');
    }
    operate(game) {
        if (!game.boardEmpty) {
            return AI.minimax(game.clone(), game.emptyCellAmount, game.currentPlayer);
        }
        else {
            return { move: Math.floor(Math.random() * game.boardSize), score: 0 };
        }
    }
    toString() {
        return this.displayName;
    }
    static minimax(game, depth, player) {
        const winner = game.winner;
        const type = AI.getComputeType(player);
        let best;
        if (type === 1) {
            best = { score: -1000 };
        }
        else {
            best = { score: +1000 };
        }
        if (depth === 0 || winner) {
            return { score: AI.getComputeType(winner) };
        }
        game.board.forEach((cell, index) => {
            if (cell === 0) {
                game.board[index] = player;
                const deep = this.minimax(game, depth - 1, Player_1.getOpponent(player));
                game.board[index] = 0;
                deep.move = index;
                if (type === 1) {
                    if (deep.score > best.score) {
                        best = deep;
                    }
                }
                else {
                    if (deep.score < best.score) {
                        best = deep;
                    }
                }
            }
        });
        return best;
    }
    static getComputeType(player) {
        if (player === 1) {
            return -1;
        }
        else if (player === 2) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
exports.default = AI;
