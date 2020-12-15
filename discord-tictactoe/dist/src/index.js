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
const localize_1 = __importDefault(require("./config/localize"));
const TicTacToeBot_1 = __importDefault(require("./bot/TicTacToeBot"));
const Game_1 = __importDefault(require("./tictactoe/Game"));
class TicTacToe {
    constructor(config, client) {
        this._config = config;
        this.bot = new TicTacToeBot_1.default(this, client);
        localize_1.default.setLanguage(config.language);
    }
    get config() {
        return this._config;
    }
    setCommandName(command_name){
        this._config.command = command_name;
        this.bot.setCommandName(command_name);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bot.client.login(this.config.token);
        });
    }
    
    createGame() {
        return new Game_1.default();
    }
}
module.exports = TicTacToe;
