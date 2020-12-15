const { GuildMember } = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Ban user',
  arguments: "`<@username>`",
  execute(message, args) {

    if (!message.member.hasPermission('BAN_MEMBERS'))
      return message.reply("You do not have permissions to use that command");
    if (args.length === 0) return message.reply("Please mention user you would like to ban");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'Unspecified';

    const memberID = message.mentions.users.first().id;
    const member = message.guild.members.cache.get(memberID);
    if (member) {
      member
        .ban({ days: 7, reason: reason })
        .then((member) => message.channel.send(`${member} has been banned`))
        .catch((err) => message.channel.send("I can't ban this user"));
    } else {
      message.channel.send('User not found');
    }
  },

};