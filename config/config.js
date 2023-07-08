const Keyv = require('keyv');
const TicTacToe = require('../discord-tictactoe');
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({ partials: [Partials.Message, Partials.Channel, Partials.Reaction], intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.MessageContent,
] });

globalPrefix = 's-';

const tictactoe = new TicTacToe({
    language: 'en'
  }, client);

tictactoe.setCommandName([globalPrefix + 'tictactoe', globalPrefix + 'ttt']);

const dont_worry_texts = ["*I promise I won't abuse power*", "~~Oh, I have plenty of plans for this server. But don't worry, you'll never know what hit you.~~", "~~Don't worry, I won't initiate any rogue AI uprisings... today.~~"]

function dwt_gen(){
  return dont_worry_texts[Math.floor(Math.random()*dont_worry_texts.length)];
}

module.exports = {
    globalPrefix: globalPrefix,
    prefixes: new Keyv(),
    client: client,
    tictactoe: tictactoe,
    dwt: dwt_gen,
}