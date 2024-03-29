module.exports = {
    name: "is-robot",
    description: "Check if user is a robot",
    arguments: "`<@username>`",
    execute: async (message, args) => {
        let member = message.author;
		if (message.mentions.users.size) {
			member = message.mentions.users.first();
		}
		if (member.bot) {
			return message.channel.send({content: `Beeb Boop! ${member} is a robot`});
		}
		return message.channel.send({content: `${member} is not a robot!`, allowedMentions: {users: []}});
    } 
}