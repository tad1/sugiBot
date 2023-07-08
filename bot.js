console.log("Initalizing!");

require("dotenv").config();
const fs = require("fs");
const {Collection, version, ActivityType} = require("discord.js");
const {globalPrefix, prefixes, client} = require("./config/config");



//For voice channels
var connection;

console.log(`Discord.js version: ${version}`);

//Bot commands import
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Sort commands list
client.commands = new Collection([...client.commands.entries()].sort());


prefixes.on('error', err => console.error('Keyv connection error:', err));

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		status: "online",  // You can show online, idle... Do not disturb is dnd
		activities: [{
			name: "s-help",  // The message shown
			type: ActivityType.Listening // PLAYING, WATCHING, LISTENING, STREAMING,
		}]
	});
})


client.on('messageCreate', async message => {
	if (message.author.bot) return;

	let prefix = globalPrefix;
	//Handle message in guild
	if (message.guild) {

		prefix = await prefixes.get(message.guild.id);
		if (!prefix) {
			prefix = globalPrefix;
		}
		
	}

	if (!message.content.startsWith(prefix)) return;

		args = message.content.slice(prefix.length).trim().split(/\s+/);

	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	if(command.args && !args.length){
		return message.channel.send({content: `You didn't provide any arguments, ${message.author}!`})
	}

	await command.execute(message, args).catch((error) => {
		console.error(error);
		message.reply({content: '`error`'});
	})

});



client.login(process.env.BOTTOKEN);