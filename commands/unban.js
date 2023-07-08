const {PermissionFlagsBits, EmbedBuilder} = require('discord.js');
const {client} = require("../config/config.js");  
module.exports = {
    name: "unban",
    description: "Unban a member from the server",
    arguments: "`<userID>` `[reason = Unspecified]`",

    async execute (message, args) {

        if(!message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.channel.send({content: 'You can\'t use that!'})
        if(!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) 
            return message.channel.send({content: 'I don\'t have the permissions.'})

        

        if(!args[0]) return message.channel.send({content: 'Please specify an user id'});

        const userID = args[0];
        const user = await message.client.users.fetch(userID);
        const member = message.mentions.members.first();
        

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        message.guild.members.unban(`${userID}`, `${reason}`)

        const banembed = new EmbedBuilder()
        .setTitle('Member Unbanned')
        .addFields({name:'User Unbanned', value: user.username})
        .addFields({name: 'Unbanned by', value: `${message.author}`})
        .addFields({name: 'Reason', value: reason})
        .setFooter({text: 'Time Unbanned', iconURL:client.user.displayAvatarURL()})
        .setTimestamp()

        message.channel.send({embeds: [banembed]});


    }
}