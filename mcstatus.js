const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { status } = require('minecraft-server-util');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mcstatus')
    .setDescription('Show live status of the Minecraft server'),

  async execute(interaction, client) {
    const { minecraftServerIp, minecraftServerPort, embedColor, botName, logoPath } = client.config;
    await interaction.deferReply();

    const logo = new AttachmentBuilder(path.join(__dirname, logoPath || './assets/logo.png'), { name: 'logo.png' });

    try {
      const result = await status(minecraftServerIp, minecraftServerPort, { timeout: 5000, enableSRV: true });

      const motd = result.motd?.clean || 'No MOTD set';
      const players = `${result.players.online} / ${result.players.max}`;
      const sampleNames = result.players.sample?.length
        ? result.players.sample.map(p => p.name).slice(0, 10).join(', ')
        : 'No players online';

      const embed = new EmbedBuilder()
        .setColor(embedColor || '#2ECC71')
        .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
        .setTitle('🟢 Server Online')
        .setThumbnail('attachment://logo.png')
        .addFields(
          { name: 'Address', value: `\`${minecraftServerIp}:${minecraftServerPort}\`` },
          { name: 'MOTD', value: motd },
          { name: 'Players', value: players, inline: true },
          { name: 'Version', value: result.version.name || 'Unknown', inline: true },
          { name: 'Online Now', value: sampleNames }
        )
        .setFooter({ text: 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed], files: [logo] });
    } catch (err) {
      const embed = new EmbedBuilder()
        .setColor('#E74C3C')
        .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
        .setTitle('🔴 Server Offline')
        .setDescription(`Could not reach \`${minecraftServerIp}:${minecraftServerPort}\`.\nThe server may be down or the address/port in \`config.json\` is incorrect.`)
        .setTimestamp();

      await interaction.editReply({ embeds: [embed], files: [logo] });
    }
  }
};
