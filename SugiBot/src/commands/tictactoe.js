module.exports = {
    
        name : 'tic-tac-toe',
        description : 'Tic-tac-toe game ',
        execute(message, args){
            const TicTacToe = require('discord-tictactoe'); 
            new TicTacToe({
            language: 'en',
            command: '$ttt'
            }, client);
        },
};