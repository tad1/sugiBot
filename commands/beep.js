module.exports = {
	name: 'beep',
	description: 'Get ping response from bot.',
	execute(message, args) {

		console.log(`[${message.author.tag}] requested beep`);

		message.channel.send('boop');
	},
};