const { EmbedBuilder } = require('discord.js');

async function handleEmbedModal(interaction, client) {
  const title = interaction.fields.getTextInputValue('embed_title');
  const description = interaction.fields.getTextInputValue('embed_description');
  const colorInput = interaction.fields.getTextInputValue('embed_color') || client.config.embedColor;
  const imageUrl = interaction.fields.getTextInputValue('embed_image');
  const footer = interaction.fields.getTextInputValue('embed_footer');

  let color = colorInput?.trim() || '#2ECC71';
  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) color = '#2ECC71';

  const embed = new EmbedBuilder()
    .setTitle(title || null)
    .setDescription(description || null)
    .setColor(color);

  if (imageUrl && /^https?:\/\//.test(imageUrl)) embed.setImage(imageUrl);
  if (footer) embed.setFooter({ text: footer });

  const targetChannel = interaction.channel;
  await targetChannel.send({ embeds: [embed] });
  await interaction.reply({ content: '✅ Embed sent!', ephemeral: true });
}

module.exports = { handleEmbedModal };
