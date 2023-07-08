const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: "recursion",
    description: "Wait! Is that recursion?",
    execute: async (message, args) => {
        var time = 10;

		const botMessage = new EmbedBuilder()
			.setColor("#E23636")
			.setTitle('Warning Reactor Meltdown')
			.setDescription(`Destroying Discord Server in : ${time}`);


		var msg = await message.channel.send({embeds: [botMessage]});

		var countDown = function () {
			time = time - 1;
			if (time >= 3) {

				const newBotMessage = new EmbedBuilder()
					.setTitle('Warning Reactor Meltdown')
					.setColor("#E23636")
					.setDescription(`Destroying Discord Server in : ${time}`);

				msg.edit({embeds: [newBotMessage]});
				setTimeout(countDown, time > 3 ? 1000 : 2500);
			} else {
				const newBotMessage = new EmbedBuilder()
					.setTitle('Reactor Reboot')
					.setColor("#4A90E2")
					.setDescription(`Reactor has been succesfully repaired!`);

				msg.edit({embeds: [newBotMessage]});
				return;
			}
		}

		setTimeout(countDown, 1000);
    } 
}