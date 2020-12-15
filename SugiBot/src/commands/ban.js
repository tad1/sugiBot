const { GuildMember } = require("discord.js");

module.exports = {
    name : 'ban',
    description : 'ban user',
    execute(message, args) {
        
        if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
        const member =  message.guild.members.cache.get(args[0]);      
      if (member) {
        member
          .ban( {days: 7, reason : 'Bo tak'})
          .then((member) => message.channel.send(`${member} zostal zbanowany.`))
          .catch((err) => message.channel.send('Nie moge zbanowac uzytkownika :('));
      } else {
        message.channel.send('Nie znaleziono uzytkownika');
      }
    },

};