const Keyv = require('keyv');
const TicTacToe = require('discord-tictactoe');
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

globalPrefix = '!';

const tictactoe = new TicTacToe({
    language: 'pl',
    command: globalPrefix + 'tictactoe'
  }, client);

module.exports = {
    globalPrefix: globalPrefix,
    prefixes: new Keyv(),
    client: client,
    tictactoe: tictactoe
}