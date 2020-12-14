module.exports = {
	name: 'ping',
	description: 'Get ping response from bot.',
	execute(message, args) {

		console.log(`[${message.author.tag}] requested ping`);

		message.channel.send('pong');
	},
};