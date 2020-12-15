console.log("Initalizing!");

require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const {globalPrefix, prefixes, client} = require("./config/config");



//For voice channels
var connection;


//Bot commands import
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Sort commands list
client.commands = new Discord.Collection([...client.commands.entries()].sort());


prefixes.on('error', err => console.error('Keyv connection error:', err));

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		status: "online",  // You can show online, idle... Do not disturb is dnd
		activity: {
			name: "s-help",  // The message shown
			type: "LISTENING" // PLAYING, WATCHING, LISTENING, STREAMING,
		}
	});
})


client.on('message', async message => {
	if (message.author.bot) return;

	//Handle message in guild
	if (message.guild) {
		let prefix;

		prefix = await prefixes.get(message.guild.id);
		if (!prefix) {
			prefix = globalPrefix;
		}
		if (!message.content.startsWith(prefix)) return;

		args = message.content.slice(prefix.length).trim().split(/\s+/);
	} else {
		//Handle DMs
	}

	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	if(command.args && !args.length){
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
	}

	try{
		command.execute(message, args);
	} catch(error){
		console.error(error);
		message.reply(`'error'`);
	}

});



client.login(process.env.BOTTOKEN);