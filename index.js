require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration
  ],
  partials: [Partials.Channel, Partials.Message]
});

// Load config (server IDs, channel IDs, etc.)
client.config = require('./config.json');

// ---- Auto-discover commands and events ----
// Everything lives in this one folder. We tell commands and events apart
// by their shape: commands export {data, execute}, events export {name, execute}.
client.commands = new Collection();
const eventHandlers = [];

const SKIP_FILES = new Set(['index.js', 'deploy-commands.js']);
const allFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.js') && !SKIP_FILES.has(f));

for (const file of allFiles) {
  const mod = require(path.join(__dirname, file));
  if (!mod) continue;

  if (mod.data && typeof mod.execute === 'function') {
    // Slash command
    client.commands.set(mod.data.name, mod);
  } else if (mod.name && typeof mod.execute === 'function') {
    // Event
    eventHandlers.push(mod);
  }
  // Anything else (helper files like ticketHandler.js / embedHandler.js)
  // is just a plain module required directly by the files that need it.
}

for (const event of eventHandlers) {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.DISCORD_TOKEN);
