const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('plans')
    .setDescription('Show the server store plans / ranks'),

  async execute(interaction, client) {
    const { plans, storeUrl, embedColor, botName, logoPath } = client.config;
    const logo = new AttachmentBuilder(path.join(__dirname, logoPath || './assets/logo.png'), { name: 'logo.png' });

    const embed = new EmbedBuilder()
      .setColor(embedColor || '#2ECC71')
      .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
      .setTitle('💎 Server Store Plans')
      .setThumbnail('attachment://logo.png')
      .setDescription(storeUrl ? `Purchase at: ${storeUrl}` : 'Contact staff to purchase a plan.')
      .setFooter({ text: 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
      .setTimestamp();

    if (Array.isArray(plans) && plans.length) {
      for (const plan of plans) {
        embed.addFields({
          name: `${plan.name} — ${plan.price}`,
          value: plan.perks?.length ? plan.perks.map(p => `• ${p}`).join('\n') : 'No perks listed'
        });
      }
    } else {
      embed.addFields({ name: 'No plans configured', value: 'Add plans to `config.json` under the `plans` array.' });
    }

    await interaction.reply({ embeds: [embed], files: [logo] });
  }
};
