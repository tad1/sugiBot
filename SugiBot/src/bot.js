require('dotenv').config();

const { Client } = require('discord.js');
const PREFIX = "$";
const client = new Client({
    partials: ["MESSAGE", 'REACTION']
});





client.on("ready", () =>{
    console.log(`${client.user.username} zalogowal sie`)
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === 'kick') {
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
    } else if (CMD_NAME === 'ban') {
        if (!message.member.hasPermission('BAN_MEMBERS'))
          return message.reply("Nie mozesz banowac uzytkownikow");
        if (args.length === 0) return message.reply("Wprowadz ID uzytkownika ktorego chcesz zbanowac ");
        try {
          const user = await message.guild.members.ban(args[0]);
          message.channel.send('Gratuluje uzykownik zbanowany');
        } catch (err) {
          console.log(err);
          message.channel.send('Wystapil blad, lub nie mam uprawnien do zbanowania albo nie znaleziono uzytkownika');
        }
      } else if (CMD_NAME === 'announce') {
        console.log(args);
        const msg = args.join(' ');
        console.log(msg);
        webhookClient.send(msg);
      }
    }
  });
  
  const TicTacToe = require('discord-tictactoe'); 
new TicTacToe({
  language: 'en',
  command: '!ttt'
}, client);
 



client.login(process.env.DISCORDJS_BOT_TOKEN);