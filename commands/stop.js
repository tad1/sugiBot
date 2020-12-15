module.exports = {
	name: 'stop',
    description: 'On default: Say to bot that music he plays is ugly.\nThe bot will get mental brakdown and he will leave voice chat.\nPlease consider say a nice word to bot if you like him.',
	aliases: ['s', 'leave', 'l'],
	arguments: "`[message to bot that his music is fine, but you don't want to listen is now]`",
	execute(message, args) {

		if(!message.member.voice.channel) return message.channel.send("I don't see you voice channel with me");
		console.log(`[${message.author.tag}] requested leave`);

		message.member.voice.channel.leave();
	},
};