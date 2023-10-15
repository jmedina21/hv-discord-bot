require("dotenv").config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'random-hv',
        description: 'Gives a random H&V!',
    },
    {
        name: 'hv',
        description: 'Gives a specific H&V!',
        options: [
            {
                name: 'id',
                description: 'The ID of the H&V you want to get',
                type: ApplicationCommandOptionType.Integer,
                required: true
            }
        ]
    },
    {
        name: 'hv-trivia',
        description: 'Starts H&V trivia!',
        options: [
            {
                name: 'duration',
                description: 'How long the trivia will last',
                type: ApplicationCommandOptionType.Integer,
                required: true,
                choices: [
                    {
                        name: '5 seconds',
                        value: 5
                    },
                    {
                        name: '10 seconds',
                        value: 10
                    },
                    {
                        name: '15 seconds',
                        value: 15
                    }
                ]
            }
        ]
    }
];

const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Registering commands')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log('Successfully registered application commands')
    } catch (error) {
        console.error(error)    
    }
})();