const Keyv = require('keyv');
const TicTacToe = require('../discord-tictactoe');
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

globalPrefix = 's-';

const tictactoe = new TicTacToe({
    language: 'en'
  }, client);

tictactoe.setCommandName([globalPrefix + 'tictactoe', globalPrefix + 'ttt']);

module.exports = {
    globalPrefix: globalPrefix,
    prefixes: new Keyv(),
    client: client,
    tictactoe: tictactoe
}