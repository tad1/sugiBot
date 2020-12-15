const TicTacToe = require('discord-tictactoe');
const Discord = require('discord.js');
const { prefix } = require('../config.json');
const client = require("../init.js"); 

new TicTacToe({
  language: 'en',
  command: prefix + 'tictactoe'
}, client);
module.exports = {
  
    name : 'tictactoe',
      description : 'Tic-tac-toe game',
      execute(message, args) {
        
         
      },
    };