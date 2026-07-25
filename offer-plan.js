const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('offer-plan')
    .setDescription('See our current offers'),

  async execute(interaction) {
    await interaction.reply({
      content: '<#1528436648818511974>'
    });
  }
};
