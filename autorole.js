const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autorole')
    .setDescription('Set the role automatically given to new members')
    .addRoleOption(opt => opt.setName('role').setDescription('Role to auto-assign on join').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction, client) {
    const role = interaction.options.getRole('role');

    if (role.managed || role.id === interaction.guild.id) {
      return interaction.reply({ content: '❌ That role cannot be used as an auto role.', ephemeral: true });
    }

    // Persist to config.json so it survives restarts
    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    config.autoRoleId = role.id;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    client.config.autoRoleId = role.id;

    const embed = new EmbedBuilder()
      .setColor(client.config.embedColor || '#2ECC71')
      .setTitle('✅ Auto Role Updated')
      .setDescription(`New members will automatically receive ${role}.`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
