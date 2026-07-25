const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder
} = require('discord.js');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Post the ticket panel in this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction, client) {
    const { embedColor, botName, logoPath } = client.config;
    const logo = new AttachmentBuilder(path.join(__dirname, logoPath || './assets/logo.png'), { name: 'logo.png' });

    const embed = new EmbedBuilder()
      .setColor(embedColor || '#2ECC71')
      .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
      .setTitle('🎫 Need Help?')
      .setDescription('Click the button below to open a private support ticket with our staff team — for server issues, plan questions, or reports.')
      .setThumbnail('attachment://logo.png')
      .setFooter({ text: 'NtNodes | Premium', iconURL: 'attachment://logo.png' });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('open_ticket').setLabel('Open Ticket').setStyle(ButtonStyle.Success).setEmoji('🎫')
    );

    await interaction.channel.send({ embeds: [embed], components: [row], files: [logo] });
    await interaction.reply({ content: '✅ Ticket panel posted.', ephemeral: true });
  }
};
