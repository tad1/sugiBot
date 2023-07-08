const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "whois",
	description: "Check info about anybody!",
	arguments: '`<@username>`',
    execute: async (message, args) => {
        let member = message.member;
		let user = message.author;
		if (message.mentions.users.size) {
			const memberID = message.mentions.users.first().id;
			member = message.guild.members.cache.get(memberID);
			
			user = message.mentions.users.first();
		}

        const joinedAt = member.joinedAt;
        const parsedDate = joinedAt.getUTCHours() + ':' + joinedAt.getUTCMinutes() + ' ' + joinedAt.getUTCDate() + '.' + joinedAt.getUTCMonth() + '.' + joinedAt.getUTCFullYear();
		const embedMessage = new EmbedBuilder()
			.setAuthor({ name: user.username, iconURL: user.avatarURL()})
            .setTitle("User Informations")
			.addFields(
				{ name: 'User name', value: `${user.username}#${user.discriminator}`, inline: true },
				{ name: 'User joined server at', value: `${parsedDate}`, inline: true },
			)
			.addFields({name: "Roles:", value: member.roles.cache.map(r => `${r.name}`).join("\r\n")})
			.setThumbnail(user.avatarURL())
			.addFields({name: "Id:", value: member.id});

		message.channel.send({embeds: [embedMessage]});
    } 
}