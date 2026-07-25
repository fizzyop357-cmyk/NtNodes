const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bot-hosting')
    .setDescription('Show bot hosting plans'),

  async execute(interaction) {
    const content = [
      '## Bot Host | Python/Node.js ( USA )',
      '### <:automod:1504816036736798741> Basic Bot',
      '**<:cpu:1504798450842341396> CPU : 200%**',
      '**<:RAM:1504798451794182287> RAM : 2GB **',
      '**<:Disk:1504798453971030177> Disk : 10GB NVMe**',
      '### <:Money:1504798455539961956> Price : 199 INR /-',
      '',
      '### <:automod:1504816036736798741> Advance Bot',
      '**<:cpu:1504798450842341396> CPU : 400%**',
      '**<:RAM:1504798451794182287> RAM : 4GB **',
      '**<:Disk:1504798453971030177> Disk : 30GB NVMe**',
      '### <:Money:1504798455539961956> Price : 399 INR /-',
      '',
      '### <:automod:1504816036736798741> Premium Bot',
      '**<:cpu:1504798450842341396> CPU : 600%**',
      '**<:RAM:1504798451794182287> RAM : 6GB **',
      '**<:Disk:1504798453971030177> Disk : 50GB NVMe**',
      '### <:Money:1504798455539961956> Price : 599 INR -'
    ].join('\n');

    await interaction.reply({ content });
  }
};
