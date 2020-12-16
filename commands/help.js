const Discord = require('discord.js');
const {globalPrefix, prefixes} = require("../config/config");


module.exports = {
	name: 'help',
    description: 'Display list of commands for funny-bot.',
    arguments: "`<command_name...>`",
    aliases: ['?', 'commands'],
	async execute(message, args) {
        
        const client = message.client;
        let commands = client.commands.values();
        let title = "Available Commands";
        let prefix = globalPrefix;
        if(message.guild){
            prefix = await prefixes.get(message.guild.id);
            if(!prefix){
                prefix = globalPrefix;
            }
        }

        if(args.length){
            commands = [];
            title = 'Requested Command List';
            for(let arg of args){
                commands.push(client.commands.find(
                    (cmd) => cmd.name === arg || (cmd.aliases && cmd.aliases.includes(arg))
                    ));
            }
        }
        console.log(`[${message.author.tag}] requested help`);

        bot_pfp = (await message.client.users.fetch('788411929202655242')).avatarURL();
        me_pfp = (await message.client.users.fetch('788411929202655242')).avatarURL();
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setColor("#000000")
            .setDescription(`Prefix: \`${prefix}\``)
            .setThumbnail(bot_pfp)
            .setTimestamp()
            .setFooter('SugiBot by TeamSugimoto', me_pfp);

        for(let command of commands){
            let aliases = '';
            let title = command.name;
            if(command.arguments){
                title += ' '+command.arguments;
            }
            if(command.aliases){
                aliases = "Alias: `"+command.aliases.join('`, `') + '`\n';
            }
            embed.addField(title, command.description + '\n' + aliases)
        }
            // .addFields(
            //     { name: '\u200B', value: '**`help`**\nDisplay list of commands for funny-bot.\nAlias: `?` `commands`', inline: false },
            //     { name: '\u200B', value: '**`ping`**\nGet ping response from bot.\nAlias: `beep`', inline: false },
            //     { name: '\u200B', value: "**`fortnite-shop`**\nShow today's daily item shop in Fornite.\nAlias: `fortnite-store` `fs`", inline: false },
            //     { name: '\u200B', value: '**`justice`**\nPlay random Justice song.\nAlias: `random-justice`', inline: false },
            //     { name: '\u200B', value: '\u200B', inline: false },
            // )
        message.channel.send(embed);

	},
};