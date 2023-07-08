const {PermissionFlagsBits} = require("discord.js")
const {dwt} = require("../config/config")

module.exports = {
  
  name : 'kick',
    description : 'Kick  user.',
    arguments: "`<@username>`",
    async execute(message, args) {
                if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
                      return message.reply({content: "You do not have permissions to use that command"});
                if (!message.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers))
                      return message.reply({content: "I can't. I don't have permission to kick this user\n"+ dwt()});
                if (args.length === 0)
                  return message.reply({content: 'Please mention user you want to kick'});
                const memberID = message.mentions.users.first().id;
                const member = message.guild.members.cache.get(memberID);
                if (member) {
                  member
                    .kick()
                    .then((member) => message.channel.send({content: `${member} was kicked`}))
                    .catch((err) => {console.log(err); message.channel.send({content: "I can't kick this user"})});
                } else {
                  message.channel.send({content: 'User not found'});
                }
            
          
    },
  };