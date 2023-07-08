const {globalPrefix, prefixes, tictactoe} = require('../config/config');
const {PermissionFlagsBits} = require("discord.js")


module.exports = {
    name: "prefix",
    description: "Check and change prefix",
    arguments: '`<new_prefix>`',
    execute: async (message, args) => {
        
        if (args.length) {
            if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send({content: "You don't have administrator powers to use this command."});
            await prefixes.set(message.guild.id, args[0]);
            
            //Change tictactoeprefix
            tictactoe.setCommandName([args[0] + 'tictactoe', args[0] + 'ttt']);
			return message.channel.send({content: `Successfully set prefix to \`${args[0]}\``})
		}

		return message.channel.send({content: `Prefix is \`${await prefixes.get(message.guild.id) || globalPrefix}\``});
    } 
}