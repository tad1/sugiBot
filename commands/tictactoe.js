const Discord = require('discord.js');
const {globalPrefix, prefixes, client} = require("../config/config");
let prefix = globalPrefix;



module.exports = {
  
    name : 'tictactoe',
      description : 'Tic-tac-toe game',
      aliases: ['ttt'],
      async execute(message, args) {
        prefix = await prefixes.get(message.guild.id) || globalPrefix;
        
      },
    };