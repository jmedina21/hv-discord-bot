require("dotenv").config();
const axios = require('axios')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')

let currentTrivia = {
    answer: '',
    participants: {}
};

async function trivia(interaction) {
    if (interaction.commandName === 'hv-trivia') {
        currentTrivia.answer = '';
        currentTrivia.participants = {};

        const random = Math.floor(Math.random() * 3749);
        try {
            const res = await axios.get(`${process.env.HV_URL}${random}`);
            currentTrivia.answer = res.data.attributes.at(-1).value;

            const embed = new EmbedBuilder()
                .setTitle('H&V Trivia')
                .setDescription('Is it a hero or a villain?')
                .setImage(`https://arweave.net/${res.data.stage_hashes[2]}?ext=png`)
                .setColor('#95E2AF');
            
            const heroButton = new ButtonBuilder()
                .setCustomId('hero')
                .setLabel('Hero 😇')
                .setStyle('Success');

            const villainButton = new ButtonBuilder()
                .setCustomId('villain')
                .setLabel('Villain 😈')
                .setStyle('Danger');

            const row = new ActionRowBuilder()
                .addComponents(heroButton, villainButton);
            
            await interaction.reply({ embeds: [embed], components: [row] });

            setTimeout(() => determineWinners(interaction), interaction.options.getInteger('duration') * 1000);
        } catch (error) {
            console.error(error);
        }
    } else if (interaction.isButton()) {
        currentTrivia.participants[interaction.user.id] = interaction.customId;
        interaction.reply(`Your answer is recorded!`, { ephemeral: true });
    }
}

function determineWinners(interaction) {
    const winners = [];
    for (const userId in currentTrivia.participants) {
        if (currentTrivia.participants[userId] === currentTrivia.answer.toLowerCase()) {
            winners.push(userId);
        }
    }

    if (winners.length > 0) {
        interaction.followUp(`Winners: ${winners.map(id => `<@${id}>`).join(', ')}!`);
    } else {
        interaction.followUp(`No one guessed correctly!`);
    }
}

module.exports = trivia;