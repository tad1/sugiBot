module.exports = {
  
  name : 'kick',
    description : 'Kick  user.',
    execute(message, args) {
    
                if (!message.member.hasPermission('KICK_MEMBERS'))
                      return message.reply("You do not have permissions to use that command");
                if (args.length === 0)
                  return message.reply('Please provide an ID');
                const member = message.guild.members.cache.get(args[0]);
                if (member) {
                  member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked`))
                    .catch((err) => message.channel.send("I can't kick this user"));
                } else {
                  message.channel.send('Nie znaleziono uzytkownika');
                }
            
          
    },
  };