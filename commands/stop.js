const {getVoiceConnection} = require('@discordjs/voice')

module.exports = {
	name: 'stop',
    description: 'On default: Say to bot that music he plays is ugly.\nThe bot will get mental brakdown and he will leave voice chat.\nPlease consider to say a nice word to bot if you like him.',
	aliases: ['s', 'leave', 'l'],
	arguments: "`[message to bot that his music is fine, but you don't want to listen it now]`",
	execute(message, args) {

		if(!message.member.voice.channel) return message.channel.send({content: "I don't see you on a voice channel with me"});
		console.log(`[${message.author.tag}] requested leave`);

		const connection = getVoiceConnection(message.guild.id);
		if(connection)
			connection.destroy();
	},
};