const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`${client.config.botName || client.user.tag} is online as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: 'the Minecraft server | NtNodes', type: ActivityType.Watching }],
      status: 'online'
    });
  }
};
