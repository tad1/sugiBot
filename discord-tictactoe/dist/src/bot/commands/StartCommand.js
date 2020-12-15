"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localize_1 = __importDefault(require("../../config/localize"));
class StartCommand {
    constructor(bot) {
        this.bot = bot;
        this.triggers = [bot.controller.config.command];
    }
    run(message, params) {
        const channel = this.bot.getorCreateGameChannel(message.channel);
        if (channel.gameRunning) {
            return;
        }
        if (params && params.length > 0) {
            const invited = StartCommand.getMentionedUser(message);
            if (invited) {
                channel.sendDuelRequest(message, invited).catch(console.error);
            }
            else {
                const username = params[0].replace(/^@/, '');
                message.channel
                    .send(localize_1.default.__('duel.unknown-user', { username }))
                    .catch(console.error);
            }
        }
        else {
            channel.createGame(message.member).catch(console.error);
        }
    }
    static getMentionedUser(message) {
        if (message.mentions.members != null) {
            const invited = message.mentions.members.first();
            if (invited &&
                !invited.user.bot &&
                message.member !== invited &&
                invited.permissionsIn(message.channel).has('VIEW_CHANNEL')) {
                return invited;
            }
        }
        return null;
    }
}
exports.default = StartCommand;
