const Discord = require("discord.js");

module.exports = {
    name: "whois",
    description: "Check info about anybody!",
    execute: (message, args) => {
        let member = message.member;
		let user = message.author;
		if (message.mentions.users.size) {
			member = message.mentions.users.first();
			user = message.mentions.users.first();
		}

        const joinedAt = member.joinedAt;
        const parsedDate = joinedAt.getUTCHours() + ':' + joinedAt.getUTCMinutes() + ' ' + joinedAt.getUTCDate() + '.' + joinedAt.getUTCMonth() + '.' + joinedAt.getUTCFullYear();
		const embedMessage = new Discord.MessageEmbed()
			.setAuthor(user.username, user.avatarURL())
            .setTitle("User Informations")
			.addFields(
				{ name: 'User name', value: `${user.username}#${user.discriminator}`, inline: true },
				{ name: 'User joined at', value: `${parsedDate}`, inline: true },
			)
			.addField("Roles:", member.roles.cache.map(r => `${r.name}`))
			.setThumbnail(user.avatarURL())
			.addField("Id:", member.id);

		message.channel.send(embedMessage);
    } 
}