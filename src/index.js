require("dotenv").config();
const axios = require('axios')
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if(interaction.commandName === 'random-hv') {
        const random = Math.floor(Math.random() * 3749)
        try {
            const res = await axios.get(`${process.env.HV_URL}${random}`)
            await interaction.reply(res.data.image)
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
})

client.login(process.env.BOT_TOKEN)

