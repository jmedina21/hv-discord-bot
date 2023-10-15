require("dotenv").config();
const axios = require('axios')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')

async function trivia (interaction){

    if(interaction.isButton()) {
        console.log(interaction)
        interaction.reply('You clicked a button!')
    }

    if(interaction.commandName === 'hv-trivia') {
        const random = Math.floor(Math.random() * 3749)
        try {
            const res = await axios.get(`${process.env.HV_URL}${random}`)
            const embed = new EmbedBuilder()
                .setTitle('H&V Trivia')
                .setDescription('Is it a hero or a villain?')
                .setImage(`https://arweave.net/${res.data.stage_hashes[2]}?ext=png`)
                .setColor('#95E2AF')

            const heroButton = new ButtonBuilder()
                .setCustomId('hero')
                .setLabel('Hero')
                .setStyle('Success')

            const villainButton = new ButtonBuilder()
                .setCustomId('villain')
                .setLabel('Villain')
                .setStyle('Danger')

            const row = new ActionRowBuilder()
                .addComponents(heroButton, villainButton)
            
            await interaction.reply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = trivia;