const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Timeout (mute) a member for a set duration')
    .addUserOption(opt => opt.setName('user').setDescription('The member to mute').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('minutes').setDescription('Duration in minutes (max 40320 = 28 days)').setRequired(true).setMinValue(1).setMaxValue(40320)
    )
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for the mute').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(target.id);

    if (!member) {
      return interaction.reply({ content: '❌ That user is not in this server.', ephemeral: true });
    }
    if (!member.moderatable) {
      return interaction.reply({ content: '❌ I cannot mute this member (role hierarchy or missing permissions).', ephemeral: true });
    }

    await member.timeout(minutes * 60 * 1000, reason);

    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setTitle('🔇 Member Muted')
      .addFields(
        { name: 'User', value: `${target.tag} (${target.id})` },
        { name: 'Duration', value: `${minutes} minute(s)` },
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
