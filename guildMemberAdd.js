const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    const { welcomeChannelId, autoRoleId, embedColor, botName, logoPath } = client.config;

    // --- Welcome message ---
    if (welcomeChannelId && welcomeChannelId !== 'PUT_WELCOME_CHANNEL_ID_HERE') {
      const channel = member.guild.channels.cache.get(welcomeChannelId);
      if (channel) {
        const logo = new AttachmentBuilder(path.join(__dirname, logoPath || './assets/logo.png'), { name: 'logo.png' });

        const embed = new EmbedBuilder()
          .setColor(embedColor || '#2ECC71')
          .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
          .setTitle('Welcome to the server! 🎉')
          .setDescription(`Hey ${member}, welcome to **${member.guild.name}**!\nWe hope you enjoy your stay — check out the rules and get playing.`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .addFields({ name: 'Member Count', value: `${member.guild.memberCount}`, inline: true })
          .setFooter({ text: `NtNodes | Premium • ID: ${member.id}`, iconURL: 'attachment://logo.png' })
          .setTimestamp();

        channel.send({ embeds: [embed], files: [logo] }).catch(console.error);
      }
    }

    // --- Auto role ---
    if (autoRoleId && autoRoleId !== 'PUT_AUTO_ROLE_ID_HERE') {
      const role = member.guild.roles.cache.get(autoRoleId);
      if (role) {
        member.roles.add(role).catch(err =>
          console.error(`Could not assign auto role: ${err.message}`)
        );
      }
    }
  }
};
