"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandHandler {
    constructor() {
        this.triggers = new Map();
    }
    addCommand(command) {
        command.triggers.forEach(trigger => this.triggers.set(trigger, command));
    }
    execute(message) {
        const [command, ...params] = message.content.split(' ');
        if (this.triggers.has(command)) {
            message.content = message.content.substring(command.length + 1);
            this.triggers.get(command).run(message, params);
        }
    }
}
exports.default = CommandHandler;
