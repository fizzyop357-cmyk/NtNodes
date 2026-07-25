const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ChannelType,
  AttachmentBuilder
} = require('discord.js');
const path = require('path');

async function handleTicketButton(interaction, client) {
  const { ticketCategoryId, ticketLogChannelId, embedColor, botName, logoPath } = client.config;
  const guild = interaction.guild;
  const member = interaction.member;

  // Prevent duplicate open tickets for the same user
  const existing = guild.channels.cache.find(
    c => c.topic === `ticket-owner:${member.id}` && c.type === ChannelType.GuildText
  );
  if (existing) {
    return interaction.reply({ content: `You already have an open ticket: ${existing}`, ephemeral: true });
  }

  await interaction.deferReply({ ephemeral: true });

  const overwrites = [
    { id: guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
    {
      id: member.id,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.AttachFiles
      ]
    },
    {
      id: client.user.id,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels]
    }
  ];

  const channel = await guild.channels.create({
    name: `ticket-${member.user.username}`.toLowerCase().slice(0, 90),
    type: ChannelType.GuildText,
    parent: ticketCategoryId && ticketCategoryId !== 'PUT_TICKET_CATEGORY_ID_HERE' ? ticketCategoryId : undefined,
    topic: `ticket-owner:${member.id}`,
    permissionOverwrites: overwrites
  });

  const logo = new AttachmentBuilder(path.join(__dirname, logoPath || './assets/logo.png'), { name: 'logo.png' });

  const embed = new EmbedBuilder()
    .setColor(embedColor || '#2ECC71')
    .setAuthor({ name: botName || 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
    .setTitle('🎫 Support Ticket')
    .setDescription(`Hey ${member}, thanks for reaching out!\nDescribe your issue and a staff member will be with you shortly.`)
    .setFooter({ text: 'NtNodes | Premium', iconURL: 'attachment://logo.png' })
    .setTimestamp();

  const closeRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('close_ticket').setLabel('Close Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒')
  );

  await channel.send({ content: `${member}`, embeds: [embed], components: [closeRow], files: [logo] });
  await interaction.editReply({ content: `Ticket created: ${channel}` });

  if (ticketLogChannelId && ticketLogChannelId !== 'PUT_TICKET_LOG_CHANNEL_ID_HERE') {
    const logChannel = guild.channels.cache.get(ticketLogChannelId);
    if (logChannel) {
      logChannel.send({ content: `📩 Ticket opened by **${member.user.tag}** — ${channel}` }).catch(() => {});
    }
  }
}

async function handleTicketCloseButton(interaction, client) {
  const { ticketLogChannelId } = client.config;
  const channel = interaction.channel;

  await interaction.reply({ content: 'Closing this ticket in 5 seconds...' });

  if (ticketLogChannelId && ticketLogChannelId !== 'PUT_TICKET_LOG_CHANNEL_ID_HERE') {
    const logChannel = interaction.guild.channels.cache.get(ticketLogChannelId);
    if (logChannel) {
      logChannel.send({ content: `🔒 Ticket **${channel.name}** closed by **${interaction.user.tag}**` }).catch(() => {});
    }
  }

  setTimeout(() => {
    channel.delete().catch(() => {});
  }, 5000);
}

module.exports = { handleTicketButton, handleTicketCloseButton };
