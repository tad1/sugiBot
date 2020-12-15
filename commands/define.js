const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: "define",
    description: "I will define any word you want!",
    aliases: ['def'],
    arguments: '`[lang = en]` `<word>`',
    execute: async (message, args) => {
        language = 'en';
        word = 'define';
        if(args.length){
            
            if(args.length >= 2){
                language = args[0];
                word = args[1];
            } else {
                word = args[0];
            }

            url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`;
            data = await fetch(url);
            json = await data.json();

            if(data.status != 200) return message.channel.send(json.title);

            word = json[0];

            const embedMessage = new Discord.MessageEmbed()
            .setTitle(word.word);

            let pronunciation = ""

            for(element of word.phonetics){
                pronunciation += (element.text + "  ");
            }

            embedMessage.setDescription(pronunciation);

            for(meaning of word.meanings){
                let definitions = '';
                for(definition of meaning.definitions){
                    definitions += '   ' + definition.definition + '\n';
                }
                embedMessage.addField(meaning.partOfSpeech, definitions);
            }

            return message.channel.send(embedMessage);
            

            
        }
    } 
}