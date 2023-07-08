module.exports = {
    name: "hello",
    description: "Greeting",
    aliases: ['hi'],
    execute: async (message, args) => {
        const datetime = new Date;
        return message.channel.send({content: `Good ${datetime.getHours() < 12 ? 'morning' : 'afternoon'} ${message.author.username}`});
    } 
}