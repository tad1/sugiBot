"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localize_1 = __importDefault(require("../../config/localize"));
const AI_1 = __importDefault(require("../../tictactoe/AI"));
class GameBoardMessage {
    constructor(channel, game, member1, member2) {
        this.channel = channel;
        this.game = game;
        this.entities = [member1, member2];
        this.reactionsLoaded = false;
    }
    attemptNextTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentEntity instanceof AI_1.default) {
                const result = this.currentEntity.operate(this.game);
                if (result.move !== undefined) {
                    yield this.playTurn(result.move);
                }
            }
            else {
                this.awaitMove();
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = this.generateText();
            if (!this.message) {
                this.message = yield this.channel.channel.send(text);
                for (const reaction of GameBoardMessage.MOVE_REACTIONS) {
                    try {
                        yield this.message.react(reaction);
                    }
                    catch (_a) {
                        yield this.onExpire();
                        return;
                    }
                }
                this.reactionsLoaded = true;
                yield this.update();
            }
            else {
                yield this.message.edit(text);
            }
        });
    }
    static reactionToMove(reaction) {
        return GameBoardMessage.MOVE_REACTIONS.indexOf(reaction);
    }
    get currentEntity() {
        return this.entities[this.game.currentPlayer - 1];
    }
    onMoveSelected(collected) {
        return __awaiter(this, void 0, void 0, function* () {
            const move = GameBoardMessage.MOVE_REACTIONS.indexOf(collected.first().emoji.name);
            yield this.playTurn(move);
        });
    }
    playTurn(move) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.game.updateBoard(this.game.currentPlayer, move);
            const winner = this.game.winner;
            if (this.game.boardFull || winner) {
                yield ((_a = this.message) === null || _a === void 0 ? void 0 : _a.delete());
                yield this.channel.endGame(winner ? this.entities[winner - 1] : undefined);
            }
            else {
                this.game.nextPlayer();
                yield this.update();
                yield this.attemptNextTurn();
            }
        });
    }
    onExpire() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.message && this.message.deletable && !this.message.deleted) {
                yield this.message.delete();
            }
            yield this.channel.expireGame();
        });
    }
    awaitMove() {
        if (!this.message || this.message.deleted)
            return;
        this.message
            .awaitReactions((reaction, user) => {
            return (user.id === this.currentEntity.id &&
                this.game.isMoveValid(GameBoardMessage.reactionToMove(reaction.emoji.name)));
        }, { max: 1, time: 30000, errors: ['time'] })
            .then(this.onMoveSelected.bind(this))
            .catch(this.onExpire.bind(this));
    }
    generateText() {
        let message;
        message =
            localize_1.default.__('game.title', {
                player1: this.entities[0].displayName,
                player2: this.entities[1].displayName
            }) + '\n\n';
        for (let i = 0; i < this.game.boardSize * this.game.boardSize; i++) {
            message += GameBoardMessage.PLAYER_EMOJIS[this.game.board[i]] + ' ';
            if ((i + 1) % this.game.boardSize === 0) {
                message += '\n';
            }
        }
        message += '\n';
        if (this.reactionsLoaded) {
            if (this.currentEntity instanceof AI_1.default) {
                message += localize_1.default.__('game.waiting-ai');
            }
            else {
                message += localize_1.default.__('game.action', {
                    player: this.currentEntity.toString()
                });
            }
        }
        else {
            message += localize_1.default.__('game.load');
        }
        return message;
    }
}
exports.default = GameBoardMessage;
GameBoardMessage.MOVE_REACTIONS = ['↖️', '⬆️', '↗️', '⬅️', '⏺️', '➡️', '↙️', '⬇️', '↘️'];
GameBoardMessage.PLAYER_EMOJIS = ['⬜', '🇽', '🅾️'];
