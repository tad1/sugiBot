const { Util } = require("discord.js");
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play music in voice chat, given a YouTube URL.',
    aliases: ['p', 'join'],
    async execute(message, args) {

        console.log(`[${message.author.tag}] requested play`);

        if (!message.guild) {
            message.channel.send("You're not in a voice channel.");
            return;
        }

        if (args[0]) {

            if (args[0].startsWith('<')) {
                args[0] = args[0].replace('<','');
                args[0] = args[0].replace('>','');
            }
            
            if (args[0].startsWith('http')) {

                if (message.member.voice.channel) {
                    const connection = await message.member.voice.channel.join();

                    async function playSong() {
                        var getinfo = await ytdl.getBasicInfo(args[0]);
                        var title = Util.escapeMarkdown(getinfo.videoDetails.title);
                        var thumbUrl = getinfo.videoDetails.thumbnail;
                        console.log(title);

                        connection.play(ytdl(args[0]), {
                            filter: "audioonly",
                            quality: "highestaudio",
                        })
                            .on('start', () => {
                                console.log('playing ' + title + ' on ' + message.guild.name);
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setAuthor('Playing:')
                                    .setTitle("**" + title + "** in 🔊`" + message.member.voice.channel.name + "`.")
                                    .setThumbnail(thumbUrl.thumbnails[thumbUrl.thumbnails.length - 1].url);
                                message.channel.send(embed);
                            })

                            .on('finish', () => {
                                connection.disconnect();
                            })

                            .on('error', () => {
                                message.channel.send("`error`");
                                console.error;
                            });
                    }

                    playSong();

                } else {
                    message.channel.send("You're not in a voice channel.");
                }

            } else {
                message.channel.send("You must provide a YouTube or YouTube Music URL as an argument to that command.");
            }

        } else {
            message.channel.send("The argument must be a YouTube or YouTube Music URL.");
        }
    },
};