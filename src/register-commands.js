require("dotenv").config();
const {REST, Routes} = require('discord.js');

const commands = [
    {
        name: 'random-hv',
        description: 'Gives a random H&V!',
    },
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