require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const commands = [];
const SKIP_FILES = new Set(['index.js', 'deploy-commands.js']);
const allFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.js') && !SKIP_FILES.has(f));

for (const file of allFiles) {
  const mod = require(path.join(__dirname, file));
  if (mod?.data && typeof mod.execute === 'function') {
    commands.push(mod.data.toJSON());
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Registering ${commands.length} slash commands...`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error(error);
  }
})();
