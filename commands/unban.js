const Discord = require('discord.js');
const {client} = require("../config/config.js");  
module.exports = {
    name: "unban",
    description: "Unban a member from the server",
    arguments: "`<userID>` `[reason = Unspecified]`",

    async execute (message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the permissions.')

        

        if(!args[0]) return message.channel.send('Please specify an user id');

        const userID = args[0];
        const user = await message.client.users.fetch(userID);
        const member = message.mentions.members.first();
        

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        message.guild.members.unban(`${userID}`, `${reason}`)

        const banembed = new Discord.MessageEmbed()
        .setTitle('Member Unbanned')
        .addField('User Unbanned', user.username)
        .addField('Unbanned by', message.author)
        .addField('Reason', reason)
        .setFooter('Time Unbanned', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}