const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('premium-mc-plans')
    .setDescription('Show the premium Minecraft server hosting plans'),

  async execute(interaction, client) {
    const { embedColor } = client.config;

    const description = [
      '<a:emoji_31:1499059226805403648>:<:dirt:1499058360920707255> ** Premium Dirt Plan**',
      '',
      '<:47404cpu:1512927773721628743> CPU: 100%',
      '<:28195ram:1512927740830023722>  RAM: 2GB',
      '<:58771ssd:1512927805271179294> Storage: 10GB SSD',
      '<a:emoji_31:1499059226805403648> <:RNcash:1512928166380048495>  Price ',
      '```₹200 /month```',
      '',
      '<a:Arrow_White:1525688983944958025> <:dela:1499059102142304537> **Premium Stone Plan**',
      '',
      '<:47404cpu:1512927773721628743> CPU: 200%',
      '<:28195ram:1512927740830023722> RAM: 4GB',
      '<:58771ssd:1512927805271179294>  Storage: 20GB SSD',
      '<a:emoji_31:1499059226805403648> <:RNcash:1512928166380048495>  Price ',
      '```₹400 /month```',
      '',
      '<a:emoji_31:1499059226805403648> <:iron:1499058567985102858> **Premium Iron Plan**',
      '',
      '<:47404cpu:1512927773721628743> CPU: 300%',
      '<:28195ram:1512927740830023722> RAM: 8GB',
      '<:58771ssd:1512927805271179294>  Storage: 30GB SSD',
      '<a:emoji_31:1499059226805403648> <:RNcash:1512928166380048495>  Price ',
      '```₹800 /month```',
      '',
      '<a:emoji_31:1499059226805403648>  <:redstone:1499059156366131270> **Premium Redstone Plan**',
      '',
      '<:47404cpu:1512927773721628743> CPU: 400%',
      '<:28195ram:1512927740830023722> RAM: 16GB',
      '<:58771ssd:1512927805271179294>  Storage: 40GB SSD',
      '<a:emoji_31:1499059226805403648> <:RNcash:1512928166380048495>  Price ',
      '```₹1500 /month```',
      '',
      '<a:emoji_31:1499059226805403648>  <:gold:1499058428058927134>  **Premium Gold Plan**',
      '',
      '<:47404cpu:1512927773721628743> CPU: 450%',
      '<:28195ram:1512927740830023722> RAM: 32GB',
      '<:58771ssd:1512927805271179294>  Storage: 40GB SSD',
      '<a:emoji_31:1499059226805403648>  <:RNcash:1512928166380048495>  Price ',
      ' ```₹3000 /month```',
      '',
      '### Specifications',
      '',
      '**<:47404cpu:1512927773721628743>   - RYZEN 9 9950X',
      '<:28195ram:1512927740830023722>   - 256GB DDR5 6400MT/s',
      '<:58771ssd:1512927805271179294>  - 4 × 1 TB NVMe SSD Drive**',
      '',
      '**<:role_hosting:1498557138971267135> Locations**',
      '** 🇮🇳  India,mumbai**',
      '',
      '<a:thehell_check:1528451924062376038>   **100% 𝐔𝐩𝐭𝐢𝐦𝐞 𝐆𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞**',
      '<:ddosprot:1512927872116068513> **𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 𝐃𝐃𝐨𝐒 𝐏𝐫𝐨𝐭𝐞𝐜𝐭𝐢𝐨𝐧**',
      '<:Hosting_Galactus:1498557233670393949> **𝐍𝐨 𝐃𝐚𝐭𝐚 𝐋𝐨𝐬𝐬 𝐆𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞**',
      '',
      '𝐓𝐨 𝐛𝐮𝐲 𝐚 𝐬𝐞𝐫𝐯𝐞𝐫 𝐜𝐫𝐞𝐚𝐭𝐞 𝐭𝐢𝐜ket <#1528410339916517400>'
    ].join('\n');

    const embed = new EmbedBuilder()
      .setColor(embedColor || '#2ECC71')
      .setTitle('Premium Server Plans!  <:hosting:1498557565804609667>')
      .setDescription(description);

    await interaction.reply({
      content: '||@everyone@here ||',
      embeds: [embed]
    });
  }
};
