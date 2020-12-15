module.exports = {
  
  name : 'kick',
    description : 'Kick  user.',
    arguments: "`<@username>`",
    execute(message, args) {
    
                if (!message.member.hasPermission('KICK_MEMBERS'))
                      return message.reply("You do not have permissions to use that command");
                if (args.length === 0)
                  return message.reply('Please mention user you want to kick');
                const memberID = message.mentions.users.first().id;
                const member = message.guild.members.cache.get(memberID);
                if (member) {
                  member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked`))
                    .catch((err) => message.channel.send("I can't kick this user"));
                } else {
                  message.channel.send('User not found');
                }
            
          
    },
  };