const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
	name: 'fortnite-shop',
    description: "Show today's daily item shop in Fornite.",
    aliases: ['fortnite-store', 'fs'],
	async execute(message, args) {

        console.log(`[${message.author.tag}] requested fortnite-shop`);

		const fetchItems = async () => {
            const data = await fetch('https://fortnite-api.com/v2/shop/br');
            const items = await data.json();
            return items;
        }
        const items = await fetchItems();

        function shopCategory(categoryName, color) {
            if (items.data[categoryName] != null) {
                const entries = items.data[categoryName].entries;
                let bundleName = [];
                let bundlePrice = [];
                let itemType = [];

                for (let i = 0; i != entries.length; i++) {
                    if (entries[i].bundle != null) {
                        bundleName[i] = entries[i].bundle.name;
                    } else {
                        bundleName[i] = entries[i].items[0].name;
                    }
                    bundlePrice[i] = entries[i].finalPrice;

                    if (entries[i].items.length > 1) {
                        let typeTemp = [];
                        for (let j = 0; j != entries[i].items.length; j++) {
                            typeTemp[j] = entries[i].items[j].type.displayValue;
                        }
                        itemType[i] = typeTemp.join(', ');
                    } else {
                        itemType[i] = entries[i].items[0].type.displayValue;
                    }
                }

                const embed = new Discord.MessageEmbed()
                    .setTitle(items.data[categoryName].name)
                    .setColor(color)
                    .setThumbnail(entries[0].items[0].images.smallIcon);

                for (let i = 0; i != entries.length; i++) {
                    embed.addField(bundleName[i] + "\n`" + bundlePrice[i] + "`", itemType[i], true);
                }
                message.channel.send(embed);
            }

        }

        shopCategory("featured", "#f3af19");
        shopCategory("specialFeatured", "#9d4dbb");
        shopCategory("specialDaily", "#4c51f7");
        shopCategory("daily", "#319236");

        
	},
};