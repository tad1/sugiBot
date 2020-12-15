const {globalPrefix, prefixes, tictactoe} = require('../config/config');


module.exports = {
    name: "prefix",
    description: "Check and change prefix",
    arguments: '`<new_prefix>`',
    execute: async (message, args) => {
        if (args.length) {
            await prefixes.set(message.guild.id, args[0]);
            
            //Change tictactoeprefix
            tictactoe.setCommandName(args[0]+'tictactoe');
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``)
		}

		return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || globalPrefix}\``);
    } 
}