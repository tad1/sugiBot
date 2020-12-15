"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandHandler_1 = __importDefault(require("./CommandHandler"));
const StartCommand_1 = __importDefault(require("./commands/StartCommand"));
const GameChannel_1 = __importDefault(require("./channel/GameChannel"));
class TicTacToeBot {
    constructor(controller, client) {
        this._controller = controller;
        this._client = client !== null && client !== void 0 ? client : new discord_js_1.Client();
        this._commandHandler = new CommandHandler_1.default();
        this._channels = [];
        //this.registerCommands();
        this.addEventListeners();
    }
    get controller() {
        return this._controller;
    }
    setCommandName(command){
        this.commandName = command;
    }
    get client() {
        return this._client;
    }
    getorCreateGameChannel(parent) {
        const found = this._channels.find(channel => channel.channel === parent);
        if (found) {
            return found;
        }
        else {
            const instance = new GameChannel_1.default(this, parent);
            this._channels.push(instance);
            return instance;
        }
    }
    registerCommands() {
        this._commandHandler.addCommand();
    }
    addEventListeners() {
        this.client.on('message', this.onMessage.bind(this));
    }
    onMessage(message) {
        if (!message.author.bot && message.channel.type === 'text') {
            const [command, ...params] = message.content.split(' ');
            if(this.commandName.indexOf(command) != -1){
                const cmd = new StartCommand_1.default(this);
                cmd.run(message, params)
            }
        }
    }
}
exports.default = TicTacToeBot;
