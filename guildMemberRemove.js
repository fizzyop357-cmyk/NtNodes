const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member, client) {
    const { leaveChannelId, embedColor, botName, logoPath } = client.config;

    if (!leaveChannelId || leaveChannelId === 'PUT_LEAVE_CHANNEL_ID_HERE') return;

    const channel = member.guild.channels.cache.get(leaveChannelId);
    if (!channel) return;

    const logo = new AttachmentBuilder(path.join(__dirname, logoPath || './assets/logo.png'), { name: 'logo.png' });

    const embed = new EmbedBuilder()
      .setColor('#E74C3C')
      .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
      .setTitle('A member has left 👋')
      .setDescription(`**${member.user.tag}** just left **${member.guild.name}**. We hope to see them again!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields({ name: 'Member Count', value: `${member.guild.memberCount}`, inline: true })
      .setFooter({ text: `NtNodes | Premium • ID: ${member.id}`, iconURL: 'attachment://logo.png' })
      .setTimestamp();

    channel.send({ embeds: [embed], files: [logo] }).catch(console.error);
  }
};
