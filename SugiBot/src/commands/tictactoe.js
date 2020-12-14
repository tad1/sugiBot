module.exports = {
    
        name : 'tictactoe',
        description : 'Tic-tac-toe game ',
        execute(message, args){
            const Discord = require('discord.js');
            const client = new Discord.Client();
            const TicTacToe = require('discord-tictactoe'); 
            new TicTacToe({
            language: 'en',
            command: '$ttt'
            }, client);
        },
};