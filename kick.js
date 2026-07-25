const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('The member to kick').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for the kick').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(target.id);

    if (!member) {
      return interaction.reply({ content: '❌ That user is not in this server.', ephemeral: true });
    }
    if (!member.kickable) {
      return interaction.reply({ content: '❌ I cannot kick this member (role hierarchy or missing permissions).', ephemeral: true });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor('#E67E22')
      .setTitle('👢 Member Kicked')
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
