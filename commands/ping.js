module.exports = {
    name: "ping",
    description: "Check your latency time",
    aliases: ['🏓'],
    execute: (message, args) => {
        return message.channel.send({content: `Pong! 🏓 \nLatency is ${Date.now() - message.createdTimestamp}ms. \nAPI Latency is ${Math.round(message.client.ws.ping)}ms`});
    } 
}