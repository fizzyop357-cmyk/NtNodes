const { handleTicketButton, handleTicketCloseButton } = require('./ticketHandler');
const { handleEmbedModal } = require('./embedHandler');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      // --- Slash commands ---
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        await command.execute(interaction, client);
        return;
      }

      // --- Buttons ---
      if (interaction.isButton()) {
        if (interaction.customId === 'open_ticket') {
          return handleTicketButton(interaction, client);
        }
        if (interaction.customId === 'close_ticket') {
          return handleTicketCloseButton(interaction, client);
        }
      }

      // --- Modals ---
      if (interaction.isModalSubmit()) {
        if (interaction.customId === 'embed_builder_modal') {
          return handleEmbedModal(interaction, client);
        }
      }
    } catch (err) {
      console.error('Interaction error:', err);
      const payload = { content: '⚠️ Something went wrong running that.', ephemeral: true };
      if (interaction.deferred || interaction.replied) {
        interaction.followUp(payload).catch(() => {});
      } else {
        interaction.reply(payload).catch(() => {});
      }
    }
  }
};
