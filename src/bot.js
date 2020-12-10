require("dotenv").config();

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log('The bot has logged in.');
})

client.login(process.env.DISCORDJS_BOT_TOKEN);