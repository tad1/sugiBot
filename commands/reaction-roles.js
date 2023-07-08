const {EmbedBuilder, PermissionFlagsBits} = require('discord.js');
const {getId}= require('../utils/id')

module.exports = {
    name: 'reaction-roles',
    description: 'Administration use only! \n Use this command for give roles for your slaves',
    arguments: '`[-m message_id]` `<emoji role_id>` `<emoji role_id>...`',
    execute: async (message, args) => {
        if (message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            if (args.length) {

                guild_id = message.guild.id;
                channel_id = message.channel.id;

                if (args[0] === '-m') {
                    message_id = args[1];
                    args.splice(0, 2);
                } else {
                    message_id = null;
                }

                if (message_id) {

                    msg = await message.channel.messages.fetch(message_id);
                    message.delete();
                    message = msg;

                } else {
                    //Create rection listener
                    const rolesEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('React to Get Roles');

                    emojies = [];
                    roles = [];

                    for (let i = 1; i < args.length; i += 2) {
                        let roleId = getId(args[i]);
                        const role = message.guild.roles.cache.get(roleId)

                        rolesEmbed.addFields({name:`${args[i - 1]} to get ${role.name}`, value:'================'});
                        emojies.push(args[i - 1]);
                        roles.push(args[i]);
                    }

                    msg = await message.channel.send({embeds: [rolesEmbed]});
                    message_id = await msg.id;
                    message.delete();
                    message = msg;
                }

                emojies = [];
                roles = [];

                for (let i = 1; i < args.length; i += 2) {
                    emojies.push(args[i - 1]);
                    roles.push(getId(args[i]));
                }

                //React to embed message
                for (let i = 0; i < emojies.length; i++) {

                    await message.react(emojies[i]);
                }

                message.client.on('messageReactionAdd', async (reaction, user) => {

                    console.log("test")
                    if (reaction.message.partial) await reaction.message.fetch();
                    if (reaction.partial) await reaction.fetch();

                    if (user.bot) return;
                    if (!reaction.message.guild) return;

                    if (reaction.message.id === message.id) {
                        for (let i = 0; i < roles.length; i++) {
                            if (reaction.emoji.name === emojies[i]) {
                                const target = reaction.message.guild.members.cache.get(user.id); 
                                if(reaction.message.guild.roles.partial)
                                    await reaction.message.guild.roles.fetch()
                                const role = reaction.message.guild.roles.cache.get(roles[i])
                                target.roles.add(role);
                            }
                        }
                    }

                });

                message.client.on('messageReactionRemove', async (reaction, user) => {

                    if (reaction.message.partial) await reaction.message.fetch();
                    if (reaction.partial) await reaction.fetch();

                    if (user.bot) return;
                    if (!reaction.message.guild) return;

                    if (reaction.message.id === message.id) {
                        for (let i = 0; i < roles.length; i++) {
                            if (reaction.emoji.name === emojies[i]) {
                                await reaction.message.guild.members.cache.get(user.id).roles.remove(roles[i]);
                            }
                        }
                    }

                });




            } else {
                //Command Info
                message.channel.send({content: "Info about `!reaction-roles` command"})
            }
        } else {
            message.reply({content: "You don't have permission to use this command"});
        }


    }
}