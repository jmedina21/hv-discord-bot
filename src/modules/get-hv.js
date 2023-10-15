require('dotenv').config()
const axios = require('axios')
const { EmbedBuilder } = require('discord.js')

async function getHV (interaction){

    if(interaction.commandName === 'random-hv') {
        const random = Math.floor(Math.random() * 3749)
        try {
            const res = await axios.get(`${process.env.HV_URL}${random}`)
            const embed = new EmbedBuilder()
                .setTitle(`Hero & Villains # ${random}`)
                .setImage(res.data.image)
                .setColor('#95E2AF')
            await interaction.reply({embeds: [embed]})
        } catch (error) {
            console.error(error)
        }
    }

    if(interaction.commandName === 'hv') {
        const id = interaction.options.getInteger('id')
        if (id < 0 || id > 3749) return interaction.reply('Invalid ID, there are only 3750 H&Vs!')
        try {
            const res = await axios.get(`${process.env.HV_URL}${id}`)
            const embed = new EmbedBuilder()
                .setTitle(`Hero & Villains # ${id}`)
                .setImage(res.data.image)
                .setColor('#95E2AF')
            await interaction.reply({embeds: [embed]})
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = getHV;