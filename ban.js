const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('The member to ban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for the ban').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(target.id);

    if (member && !member.bannable) {
      return interaction.reply({ content: '❌ I cannot ban this member (role hierarchy or missing permissions).', ephemeral: true });
    }

    await interaction.guild.members.ban(target.id, { reason });

    const embed = new EmbedBuilder()
      .setColor('#E74C3C')
      .setTitle('🔨 Member Banned')
      .addFields(
        { name: 'User', value: `${target.tag} (${target.id})` },
        { name: 'Moderator', value: `${interaction.user.tag}` },
        { name: 'Reason', value: reason }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    const { modLogChannelId } = client.config;
    if (modLogChannelId && modLogChannelId !== 'PUT_MOD_LOG_CHANNEL_ID_HERE') {
      const logChannel = interaction.guild.channels.cache.get(modLogChannelId);
      if (logChannel) logChannel.send({ embeds: [embed] }).catch(() => {});
    }
  }
};
