const { escapeMarkdown } = require("discord.js");
const {EmbedBuilder} = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioPlayer, createAudioResource, generateDependencyReport, AudioPlayerStatus, VoiceConnection } = require('@discordjs/voice');
const {connectToChannel, leave} = require('../utils/audio')



module.exports = {
    name: 'play',
    description: 'Play music in voice chat, given a YouTube URL.',
    aliases: ['p', 'join'],
    arguments: '`<youtube_url>`',
    async execute(message, args) {

        console.log(`[${message.author.tag}] requested play`);

        if (!message.guild) {
            message.channel.send({content: "You're not in a voice channel."});
            return;
        }

        if (args[0]) {

            if (args[0].startsWith('<')) {
                args[0] = args[0].replace('<','');
                args[0] = args[0].replace('>','');
            }
            
            if (args[0].startsWith('http')) {

                if (message.member.voice.channel) {
                    const channel = message.member?.voice.channel;
                    
                    const connection = await connectToChannel(channel);
                    const player = createAudioPlayer();


                    async function playSong() {
                        var getinfo = await ytdl.getBasicInfo(args[0]);
                        var title = escapeMarkdown(getinfo.videoDetails.title);
                        var thumbUrl = getinfo.videoDetails.thumbnails;
                        console.log(title);

                        const stream = ytdl(args[0], {
                            filter: "audioonly",
                            quality: "highestaudio",
                        })
                        const resource = createAudioResource(stream)
                        player.play(resource);
                        
                        player.on('playing', () => {
                            console.log('playing ' + title + ' on ' + message.guild.name);
                            const embed = new EmbedBuilder()
                                .setColor('#ff0000')
                                .setAuthor({name:'Playing:'})
                                .setTitle("**" + title + "** in 🔊`" + message.member.voice.channel.name + "`.")
                                .setThumbnail(thumbUrl[thumbUrl.length - 1].url);
                            message.channel.send({embeds: [embed]});
                        })
                        
                        player.on(AudioPlayerStatus.Paused, () => {
                            leave(connection, player, stream);
                        })
                        player.on(AudioPlayerStatus.Idle,() => {
                            leave(connection, player, stream);
                                
                        })
                        player.on('finish', () => {
                            leave(connection, player, stream);
                        })

                        player.on('error', () => {
                            message.channel.send({content: "`error`"});
                            console.error;
                        });
                    }

                    playSong();
                    (await connection).subscribe(player);


                } else {
                    message.channel.send("You're not in a voice channel.");
                }

            } else {
                message.channel.send({content: "You must provide a YouTube or YouTube Music URL as an argument to that command."});
            }

        } else {
            message.channel.send({content: "The argument must be a YouTube or YouTube Music URL."});
        }
    },
};