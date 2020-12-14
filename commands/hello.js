module.exports = {
    name: "hello",
    description: "Greeting",
    aliases: ['hi'],
    execute: (message, args) => {
        const datetime = new Date;
        return message.channel.send(`Good ${datetime.getHours() < 12 ? 'morning' : 'afternoon'} ${message.author.username}`);
    } 
}