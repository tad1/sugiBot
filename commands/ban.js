const { GuildMember, PermissionFlagsBits } = require("discord.js");
const {dwt} = require("../config/config")

module.exports = {
  name: 'ban',
  description: 'Ban user',
  arguments: "`<@username>`",
  execute(message, args) {

    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply({content: "You do not have permissions to use that command"});
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply({content: "I can't. I don't have permission to ban this user\n"+dwt()});
                
    if (args.length === 0) return message.reply({content: "Please mention user you would like to ban"});

    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'Unspecified';

    const memberID = message.mentions.users.first().id;
    const member = message.guild.members.cache.get(memberID);
    if (member) {
      member
        .ban({ days: 7, reason: reason })
        .then((member) => message.channel.send({content: `${member} has been banned`}))
        .catch((err) => {console.log(err); message.channel.send({content: "I can't ban this user"})});
    } else {
      message.channel.send({content: 'User not found'});
    }
  },

};