const ytdl = require('ytdl-core');

module.exports = {
    name: 'justice',
    description: 'Play random Justice song.',
    aliases: ['random-justice', 'j'],
    async execute(message, args) {

        console.log(`[${message.author.tag}] requested justice`);

        if (!message.guild) {
            message.channel.send("You're not in a voice channel.");
            return;
        }

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();


            let songs = [
                ['https://youtube.com/watch?v=YT59g6xekFE', 'Safe and Sound'],
                ['https://youtube.com/watch?v=3f4DOfSEHCk', 'D.A.N.C.E (Extended)'],
                ['https://youtube.com/watch?v=YfVQroDHe6k', 'B.E.A.T (Extended)'],
                ['https://youtube.com/watch?v=R97pP4z-5Ak', 'Love S.O.S (WWW)'],
                ['https://youtube.com/watch?v=pf7uueiK8ec', 'Genesis'],
                ['https://youtube.com/watch?v=86QWdIDubKc', 'Let There Be Light'],
                ['https://youtube.com/watch?v=ykYN0ZSwdns', 'Newjack'],
                ['https://youtube.com/watch?v=RKsL90gkbNY', 'Civilization'],
                ['https://youtube.com/watch?v=EIw81rwPJlI', 'Helix (Extended)'],
                ['https://youtube.com/watch?v=bz68yrZW3vU', 'DVNO'],
                ['https://youtube.com/watch?v=mae2-JoQ6Tc', 'Heavy metal x DVNO (WWW)'],
                ['https://youtube.com/watch?v=HWUFLCFubQY', 'New Lands'],
                ['https://youtube.com/watch?v=G8PrUqVZVL0', "On'n'On"],
                ['https://youtube.com/watch?v=5NmJPzJNt0o', 'Stress'],
                ['https://youtube.com/watch?v=xHcPUTfPuk0', 'Waters of Nazareth'],
                ['https://youtube.com/watch?v=_0D7sqO5XC0', 'Alakazam !'],
                ['https://youtube.com/watch?v=U-MN18xPEyw', 'Fire'],
                ['https://youtube.com/watch?v=HJHt4i6hS0c', 'Chorus (WWW)'],
                ['https://youtube.com/watch?v=eRh26T-bFrc', 'Randy (WWW)'],
                ['https://youtube.com/watch?v=kEf2KzdxIsQ', 'Audio, Video, Disco. (Live)'],
                ['https://youtube.com/watch?v=x07oJlC2tSo', 'Planisphère'],
                ['https://youtube.com/watch?v=8mIr-C8QE9Y', 'LoveStoned (Justice Remix)'],
                ['https://youtube.com/watch?v=Q5aiEegBvSA', 'Let Love Rule (Justice Remix)'],
                ['https://youtube.com/watch?v=4rAsPAGaI34', 'Me Against The Music (Justice Remix)'],
                ['https://youtube.com/watch?v=Z9o9nHvOjmY', 'Get On Your Boots (Justice Remix)'],
                ['https://youtube.com/watch?v=eH0qlIkMg_o', 'Human After All (Justice Remix)'],
                ['https://youtube.com/watch?v=6QL_bUCuhvo', 'Electric Feel (Justice Remix)'],
                ['https://youtube.com/watch?v=pmlIQoyOFzA', 'Canon (Primo)']
            ];

            var oneTime = 0;

            function loop() {

                let randomSong = Math.floor(Math.random() * Math.floor(songs.length));

                if (args[0]) {
                    let devCode = args[0];
                    if (devCode.startsWith('dev:') && oneTime == 0) {
                        randomSong = devCode.substring(4);
                    } else if (oneTime==0) {
                        message.channel.send("This command does not take arguments.");
                    }
                }

                oneTime = 1;

                connection.play(ytdl(songs[randomSong][0],{
                    filter: "audioonly",
                    quality: "highestaudio",
                }), {
                    bitrate: "120000"
                })

                    .on('start', () => {
                        console.log('playing ' + songs[randomSong][1] + ' on ' + message.guild.name);
                        message.channel.send("Playing **" + songs[randomSong][1] + "** in 🔊`" + message.member.voice.channel.name + "`.")
                    })

                    .on('finish', () => {
                        if (connection.channel.members.first() != connection.channel.members.last()) {
                            loop();
                        } else {
                            connection.disconnect();
                        }
                    })

                    .on('error', console.error);

            }

            loop();

        } else {
            message.channel.send("You're not in a voice channel.");
        }

    },
};