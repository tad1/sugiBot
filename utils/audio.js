const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioPlayer, createAudioResource, generateDependencyReport, AudioPlayerStatus, VoiceConnection } = require('@discordjs/voice');

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
	});
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

function leave(connection, player, stream){
    if(connection)
        connection.destroy();
    if(player)
        player.stop();
    if(stream)
        stream.destroy();

}

module.exports = {
    connectToChannel: connectToChannel,
    leave: leave
}