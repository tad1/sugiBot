const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');
const { client } = require('../config/config');

module.exports = {
	name: 'resurrect',
	description: 'run this command to resurrect SugiBot',
	execute(message, args) {

        channelId = args[0]
        let user = message.author;
        if(user.id != 514369093424381963) return;
        console.log(channelId)
        console.log("requested to ressurect")
        client.channels.cache.get(channelId).send("@everyone Guess who's back!")
	},
};