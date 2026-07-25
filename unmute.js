const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove a timeout (mute) from a member')
    .addUserOption(opt => opt.setName('user').setDescription('The member to unmute').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(target.id);

    if (!member) {
      return interaction.reply({ content: '❌ That user is not in this server.', ephemeral: true });
    }

    await member.timeout(null);

    const embed = new EmbedBuilder()
      .setColor('#2ECC71')
      .setTitle('🔊 Member Unmuted')
      .addFields(
        { name: 'User', value: `${target.tag} (${target.id})` },
        { name: 'Moderator', value: `${interaction.user.tag}` }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
