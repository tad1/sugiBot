module.exports = {
  
  name : 'kick',
    description : 'Kick  user.',
    execute(message, args) {
    
                if (!message.member.hasPermission('KICK_MEMBERS'))
                  return message.reply('Nie mozesz usuwac uzytkownikow, szkoda :(');
                if (args.length === 0)
                  return message.reply('Wprowadz ID uzytkownika ktorego chcesz usunac');
                const member = message.guild.members.cache.get(args[0]);
                if (member) {
                  member
                    .kick()
                    .then((member) => message.channel.send(`${member} zostal usuniety.`))
                    .catch((err) => message.channel.send('Nie moge usunac uzytkownika :('));
                } else {
                  message.channel.send('Nie znaleziono uzytkownika');
                }
            
          
    },
  };