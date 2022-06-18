const { MessageEmbed } = require('discord.js')
const packageJSON = require('../../package.json')

module.exports = {
  name: 'info',
  description: 'Info about Tram.',
  // aliases: ['getHelp'],
  category: 'general',
  slash: true,
  global: true,
  ownerOnly: false,

  run: async (commandData) => {
    const totalSeconds = (commandData.client.uptime / 1000)

    const embed = new MessageEmbed()
      .setTitle('Tram Info')
      .setDescription('Tram - The bot that does voice channels right.')
      .setAuthor({ name: 'SummerDev Studios' })
      .addFields(
        { name: 'General Info', value: `**Uptime (Hours):** ${Math.floor(totalSeconds / 3600)}\n**Platform:** ${process.platform}\n**DiscordJS Version:** ${packageJSON.dependencies['discord.js']}` },
        { name: 'Credits', value: '**Main Developers:** summer.#4040 & GateLogicLive#0001\n**Core Libraries:** [Discord.JS](https://discord.js.org) & [discord-slash-command-handler](https://npmjs.com/discord-slash-command-handler)\n**And you!** Thank you for using Tram. It means the world to us.' }
      )
      .setColor('RANDOM')

    commandData.interaction.followUp({ embeds: [embed], ephemeral: true })
  }
}
