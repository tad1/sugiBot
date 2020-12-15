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
const discord_js_1 = require("discord.js");
const localize_1 = __importDefault(require("../../config/localize"));
class DuelRequestMessage {
    constructor(channel, message, invited) {
        this.channel = channel;
        this.request = message;
        this.invited = invited;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            this.message = yield this.request.channel.send(this.createEmbed());
            for (const reaction of DuelRequestMessage.REACTIONS) {
                yield this.message.react(reaction);
            }
            this.message
                .awaitReactions((reaction, user) => {
                return (DuelRequestMessage.REACTIONS.includes(reaction.emoji.name) &&
                    user.id === this.invited.id);
            }, { max: 1, time: 60000, errors: ['time'] })
                .then(this.challengeAnswered.bind(this))
                .catch(this.challengeExpired.bind(this));
        });
    }
    close(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.message && this.message.deletable && !this.message.deleted) {
                yield this.message.delete();
            }
            if (message) {
                yield this.request.channel.send(message);
            }
        });
    }
    challengeAnswered(collected) {
        return __awaiter(this, void 0, void 0, function* () {
            if (collected.first().emoji.name === DuelRequestMessage.REACTIONS[0]) {
                yield this.channel.createGame(this.request.member, this.invited);
            }
            else {
                yield this.channel.closeDuelRequest(this, localize_1.default.__('duel.reject', { invited: this.invited.displayName }));
            }
        });
    }
    challengeExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.closeDuelRequest(this, localize_1.default.__('duel.expire', { invited: this.invited.displayName }));
        });
    }
    createEmbed() {
        var _a;
        return new discord_js_1.MessageEmbed()
            .setColor('#2980b9')
            .setTitle(localize_1.default.__('duel.title'))
            .setDescription(localize_1.default.__('duel.challenge', {
            invited: this.invited.toString(),
            initier: (_a = this.request.member) === null || _a === void 0 ? void 0 : _a.displayName
        }) +
            '\n' +
            localize_1.default.__('duel.action'));
    }
}
exports.default = DuelRequestMessage;
DuelRequestMessage.REACTIONS = ['👍', '👎'];
