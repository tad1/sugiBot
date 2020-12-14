const Discord = require('discord.js');

module.exports = {
	name: 'help',
    description: 'Display list of commands for funny-bot.',
    aliases: ['?', 'commands'],
	async execute(message, args) {
        
        console.log(`[${message.author.tag}] requested help`);

        bot_pfp = (await message.client.users.fetch('419918053825052682')).avatarURL();
        me_pfp = (await message.client.users.fetch('318826822550814720')).avatarURL();
        const embed = new Discord.MessageEmbed()
            .setTitle("Available Commands")
            .setColor("#000000")
            .setDescription("Prefix: `f-`")
            .setThumbnail(bot_pfp)
            .setTimestamp()
            .setFooter('funny-bot by rowwuk#6981', me_pfp)
            .addFields(
                { name: '\u200B', value: '**`help`**\nDisplay list of commands for funny-bot.\nAlias: `?` `commands`', inline: false },
                { name: '\u200B', value: '**`ping`**\nGet ping response from bot.\nAlias: `beep`', inline: false },
                { name: '\u200B', value: "**`fortnite-shop`**\nShow today's daily item shop in Fornite.\nAlias: `fortnite-store` `fs`", inline: false },
                { name: '\u200B', value: '**`justice`**\nPlay random Justice song.\nAlias: `random-justice`', inline: false },
                { name: '\u200B', value: '\u200B', inline: false },
            )
        message.channel.send(embed);

	},
};