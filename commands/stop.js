module.exports = {
	name: 'stop',
    description: 'Get ping response from bot.',
    aliases: ['s', 'leave', 'l'],
	execute(message, args) {

		console.log(`[${message.author.tag}] requested leave`);

		message.member.voice.channel.leave();
	},
};