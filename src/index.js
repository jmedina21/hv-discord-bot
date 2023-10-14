require("dotenv").config();
const axios = require('axios')
const { Client, IntentsBitField } = require('discord.js')

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
})

client.login(process.env.BOT_TOKEN)

