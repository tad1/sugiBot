const Discord = require('discord.js');
const { client } = require('../config/config');

module.exports = {
	name: 'remind-lukgla',
	description: 'run this command to remind lukgla about gaming time',
	execute(message, args) {

        channelId = args[0]
        let user = message.author;
        if(user.id != 514369093424381963) return;
        console.log(channelId)
        client.channels.cache.get(channelId).send({content: `"@lukgla it's gaming time!`});
	},
};