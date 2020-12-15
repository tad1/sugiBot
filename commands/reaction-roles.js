const Discord = require('discord.js');


module.exports = {
    name: 'reaction-roles',
    description: 'Administration use only! \n Use this command for give roles for your slaves',
    arguments: '`[-m message_id]` `<emoji role_id>` `<emoji role_id>...`',
    execute: async (message, args) => {
        if (message.member.hasPermission("ADMINISTRATOR")) {
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
                    const rolesEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('React to Get Roles');

                    emojies = [];
                    roles = [];

                    for (let i = 1; i < args.length; i += 2) {
                        rolesEmbed.addField(`${args[i - 1]} to get ${message.guild.roles.cache.get(args[i]).name}`, '================');
                        emojies.push(args[i - 1]);
                        roles.push(args[i]);
                    }

                    msg = await message.channel.send(rolesEmbed);
                    message_id = await msg.id;
                    message.delete();
                    message = msg;
                }

                emojies = [];
                roles = [];

                for (let i = 1; i < args.length; i += 2) {
                    emojies.push(args[i - 1]);
                    roles.push(args[i]);
                }

                //React to embed message
                for (let i = 0; i < emojies.length; i++) {

                    await message.react(emojies[i]);
                }

                message.client.on('messageReactionAdd', async (reaction, user) => {

                    if (reaction.message.partial) await reaction.message.fetch();
                    if (reaction.partial) await reaction.fetch();

                    if (user.bot) return;
                    if (!reaction.message.guild) return;

                    if (reaction.message.id === message.id) {
                        for (let i = 0; i < roles.length; i++) {
                            if (reaction.emoji.name === emojies[i]) {
                                await reaction.message.guild.members.cache.get(user.id).roles.add(roles[i]);
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
                message.channel.send("Info about `!reaction-roles` command")
            }
        } else {
            message.reply("You don't have permission to use this command");
        }


    }
}