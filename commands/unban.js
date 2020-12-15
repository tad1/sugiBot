const Discord = require('discord.js');
const client = require("../init.js");  
module.exports = {
    name: "unban",
    description: "unbans a member from the server",
    

    execute (message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the permissions.')

        const member = message.mentions.members.first();

        if(!args[0]) return message.channel.send('Please specify a user');

        const user = message.guild.members.cache.get(args[0]);
        
        

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        message.guild.members.unban(`${user}`, `${reason}`)

        const banembed = new Discord.MessageEmbed()
        .setTitle('Member Unbanned')
        .addField('User Unbanned', user)
        .addField('Unbanned by', message.author)
        .addField('Reason', reason)
        .setFooter('Time Unbanned', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}