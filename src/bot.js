require("dotenv").config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "r-";

client.on('ready', () => {
    console.log(`${client.user.tag} online.`);
})

client.on('message', async (message) => {
    if (message.author.bot) return;

    if (message.content === 'lol') {
        console.log(`[${message.author.tag}]: ${message.content}`);
        message.channel.send('lol');
    }

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        console.log(CMD_NAME);
        console.log(args);
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);