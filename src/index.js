require("dotenv").config();
const axios = require('axios')
const { Client, IntentsBitField } = require('discord.js')
const trivia = require('./modules/hv-trivia')
const getHV = require('./modules/get-hv')

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

    trivia(interaction)

    if (!interaction.isChatInputCommand()) return

    if(!interaction.isButton()) {
        getHV(interaction)
    }

    

})

client.login(process.env.BOT_TOKEN)

