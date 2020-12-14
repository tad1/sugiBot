const Discord = require('discord.js');

module.exports = {
    name: "recursion",
    description: "Wait! Is that recursion?",
    execute: async (message, args) => {
        var time = 10;

		const botMessage = new Discord.MessageEmbed()
			.setColor("#E23636")
			.setTitle('Warning Reactor Meltdown')
			.setDescription(`Destroying Discord Server in : ${time}`);


		var msg = await message.channel.send(botMessage);

		var countDown = function () {
			time = time - 1;
			if (time >= 5) {

				const newBotMessage = new Discord.MessageEmbed()
					.setTitle('Warning Reactor Meltdown')
					.setColor("#E23636")
					.setDescription(`Destroying Discord Server in : ${time}`);

				msg.edit(newBotMessage);
				setTimeout(countDown, 1000);
			} else {
				const newBotMessage = new Discord.MessageEmbed()
					.setTitle('Reactor Reboot')
					.setColor("#4A90E2")
					.setDescription(`Reactor has been succesfully repaired!`);

				msg.edit(newBotMessage);
				return;
			}
		}

		setTimeout(countDown, 1000);
    } 
}