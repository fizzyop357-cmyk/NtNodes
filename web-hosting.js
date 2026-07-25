const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('web-hosting')
    .setDescription('Show website hosting plans'),

  async execute(interaction) {
    const content = [
      '## Website Hosting ( IN, SG, USA )',
      '### <:website:1528561261636227172> Basic Website',
      '**<:cpu:1528437660220133448> CPU : 200%**',
      '**<:RAM:1504798451794182287> RAM : 2GB **',
      '**<:Disk:1528561263507144854> Disk : 20GB NVMe**',
      '### <:Money:1528561264387821619> Price : 149 INR /-',
      '',
      '### <:website:1528561261636227172> Advance Website',
      '**<:cpu:1528437660220133448> CPU : 400%**',
      '**<:RAM:1504798451794182287> RAM : 4GB **',
      '**<:Disk:1528561263507144854> Disk : 40GB NVMe**',
      '### <:Money:1528561264387821619> Price : 299 INR /-',
      '',
      '### <:website:1528561261636227172> Premium Website ',
      '**<:cpu:1528437660220133448> CPU : 600%**',
      '**<:RAM:1504798451794182287> RAM : 6GB **',
      '**<:Disk:1528561263507144854> Disk : 60GB NVMe**',
      '### <:Money:1528561264387821619> Price : 449 INR'
    ].join('\n');

    await interaction.reply({ content });
  }
};
