const fetch = require("node-fetch");
const {EmbedBuilder} = require('discord.js');

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
        const embedFieldsLimit = 25;

        function shopCategory(categoryName, color) {
            if (items.data[categoryName] != null) {
                const entries = items.data[categoryName].entries;
                
                //divide entries into chunks
                let chunks = []
                for (let i = 0 ; i  < entries.length; i+= embedFieldsLimit){
                    chunks.push(entries.slice(i, i + embedFieldsLimit))
                }
                let embeds = []

                chunks.forEach(chunk => {
                    
                    let bundleName = [];
                    let bundlePrice = [];
                    let itemType = [];
                    
                    for (let i = 0; i != chunk.length; i++) {
                        if (chunk[i].bundle != null) {
                            bundleName[i] = chunk[i].bundle.name;
                        } else {
                            bundleName[i] = chunk[i].items[0].name;
                        }
                        bundlePrice[i] = chunk[i].finalPrice;
                        
                        if (chunk[i].items.length > 1) {
                            let typeTemp = [];
                            for (let j = 0; j != chunk[i].items.length; j++) {
                                typeTemp[j] = chunk[i].items[j].type.displayValue;
                            }
                            itemType[i] = typeTemp.join(', ');
                        } else {
                            itemType[i] = chunk[i].items[0].type.displayValue;
                        }
                    }
                    
                    const embed = new EmbedBuilder()
                    .setTitle(items.data[categoryName].name)
                    .setColor(color)
                    .setThumbnail(chunk[0].items[0].images.smallIcon);
                    
                    let fields = []
                    for (let i = 0; i != chunk.length; i++) {
                        fields.push({name: bundleName[i] + "\n`" + bundlePrice[i] + "`", value: itemType[i], inline: true})
                    }
                    
                    embed.addFields(fields);
                    embeds.push(embed)
                });
                    message.channel.send({embeds: embeds});
            }

        }

        shopCategory("featured", "#f3af19");
        shopCategory("specialFeatured", "#9d4dbb");
        shopCategory("specialDaily", "#4c51f7");
        shopCategory("daily", "#319236");

        
	},
};