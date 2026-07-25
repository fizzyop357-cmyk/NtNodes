const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('budget-mc-plans')
    .setDescription('Show the budget Minecraft server hosting plans'),

  async execute(interaction, client) {
    const { embedColor } = client.config;

    const description = [
      '<a:Minecraft:1528437309702148236> **Dirt Plan**',
      '» CPU: 100% (1 Core)',
      '» RAM: 2 GB DDR5',
      '» Storage: 20 GB NVMe',
      '» Price: `₹50 /month`',
      '',
      '<:dela:1499059102142304537> **Stone Plan**',
      '» CPU: 200% (2 Cores)',
      '» RAM: 4 GB DDR4',
      '» Storage: 40 GB NVMe',
      '» Price: `₹100 /month`',
      '',
      '<:kalua:1499058963961090049> **Coal Plan**',
      '» CPU: 300% (3 Cores)',
      '» RAM: 6 GB DDR4',
      '» Storage: 60 GB NVMe',
      '» Price: `₹150 /month`',
      '',
      '<:iron:1499058567985102858> **Iron Plan**',
      '» CPU: 400% (4 Cores)',
      '» RAM: 8 GB DDR4',
      '» Storage: 80 GB NVMe',
      '» Price: `₹200 /month`',
      '',
      '<:gold:1499058428058927134> **Gold Plan**',
      '» CPU: 500% (5 Cores)',
      '» RAM: 10 GB DDR4',
      '» Storage: 100 GB NVMe',
      '» Price: `₹250 /month`',
      '',
      '<:4354emeraldblock:1512923842677440513> **Emerald Plan**',
      '» CPU: 600% (6 Cores)',
      '» RAM: 14 GB DDR4',
      '» Storage: 140 GB NVMe',
      '» Price: `₹350 /month`',
      '',
      '<:8206enderman:1512924202188144843> **Ender Plan**',
      '» CPU: 700% (7 Cores)',
      '» RAM: 16 GB DDR4',
      '» Storage: 160 GB NVMe',
      '» Price: `₹400 /month`',
      '',
      '<:diamond:1499058272416698470> **Diamond Plan**',
      '» CPU: 800% (8 Cores)',
      '» RAM: 24 GB DDR4',
      '» Storage: 200 GB NVMe',
      '» Price: `₹600 /month`',
      '',
      '<:Ameer:1499059036778397736> **Netherite Plan**',
      '» CPU: 1000% (10 Cores)',
      '» RAM: 32 GB DDR4',
      '» Storage: 250 GB NVMe',
      '» Price: `₹800 /month`',
      '',
      '---',
      '',
      '<:jhora:1499059495937245274> **Node Specifications**',
      '<:Hosting_Galactus:1498557233670393949> **Processor:** AMD Epyc 7763 (Reliable & Cost-effective)',
      '<:amd:1528437553693462789> **Storage:** Ultra-Fast NVMe SSD',
      '<:ddos:1528451925685702708> **Protection:** Advanced DDoS Protection',
      '<:disc:1499059427620163594> **Uptime:** 99.95% Uptime Guarantee'
    ].join('\n');

    const embed = new EmbedBuilder()
      .setColor(embedColor || '#2ECC71')
      .setTitle('<:arrow_right:1528437556780208281> Nt-Node Budget Server Plans!')
      .setDescription(description);

    await interaction.reply({
      content: '🎟️ **To buy a server create a ticket!**\n||@everyone||',
      embeds: [embed]
    });
  }
};
