module.exports = {
	name: 'beep',
	description: 'Get boop response from bot.',
	async execute(message, args) {

		console.log(`[${message.author.tag}] requested beep`);

		message.channel.send({content: 'boop :robot:'});
	},
};