const quickdb = require('quick.db')
const db = quickdb
const { MessageEmbed } = require('discord.js')
const vcModel = require('../models/vc')

module.exports = {
  name: 'vc-close',
  description: 'Close your active VC channel.',
  // aliases: ['getHelp'],
  category: 'vc',
  slash: true,
  global: true,
  ownerOnly: false,

  options: [
    {
      name: 'channel-code',
      description: "The channel code you were sent.",
      required: true,
      type: 'string'
    }
  ],

  run: async (commandData) => {
    const guild = commandData.client.guilds.cache.get(commandData.guild.id)
    let result = {}

    try {
      result = await vcModel.findOne({
        channelCode: commandData.args[0]
      })
    } catch (e) {
        const embed1 = new MessageEmbed()
          .setTitle('Error')
          .setDescription('You do not appear to have an active vc. Please join [the support server](https://discord.gg/YXxET9b94S) and open a ticket if you do have an active vc linked to your user.\n\nYour user id is in the footer for support purposes.')
          .setColor('RED')
          .setFooter({ text: `Powered By Tram | UserID: ${commandData.user.id} | Error Code: gCSwx2` })

        return await commandData.interaction.followUp({ embeds: [embed1], ephemeral: true })
    }

    if (result === null) {
      const embed1 = new MessageEmbed()
        .setTitle('Error')
        .setDescription('You do not appear to have an active vc. Please join [the support server](https://discord.gg/YXxET9b94S) and open a ticket if you do have an active vc linked to your user.\n\nYour user id is in the footer for support purposes.')
        .setColor('RED')
        .setFooter({ text: `Powered By Tram | UserID: ${commandData.user.id} | Error Code: gCSwx2` })

      return await commandData.interaction.followUp({ embeds: [embed1], ephemeral: true })
    }

    // if (result.userId !== commandData.user.id || !commandData.user.permissions.has('ADMINISTRATOR'))

    // if (!db.get(commandData.user.id)) {
    //   const embed1 = new MessageEmbed()
    //     .setTitle('Error')
    //     .setDescription('You do not appear to have an active vc. Please join [the support server](https://discord.gg/YXxET9b94S) and open a ticket if you do have an active vc linked to your user.\n\nYour user id is in the footer for support purposes.')
    //     .setColor('RED')
    //     .setFooter({ text: `Powered By Tram | UserID: ${commandData.user.id} | Error Code: gCSwx2` })
    //
    //   return await commandData.interaction.followUp({ embeds: [embed1], ephemeral: true })
    // }

    const channelId = result.channelId
    let fetchedChannel = ''

    try {
      fetchedChannel = guild.channels.cache.get(channelId)
    } catch {
      const embed1 = new MessageEmbed()
        .setTitle('Error')
        .setDescription('Something went horribly wrong. Please make sure you are in the server that your VC channel is in.\n\n Please join [the support server](https://discord.gg/YXxET9b94S) and open a ticket if you are in the server.')
        .setColor('RED')
        .setFooter({ text: 'Powered By Tram | Error Code: mZteUh' })

      return await commandData.interaction.followUp({ embeds: [embed1], ephemeral: true })
    }

    if (!fetchedChannel) {
      const embed1 = new MessageEmbed()
        .setTitle('Error')
        .setDescription('Please make sure you are in the server that your VC channel is in.\n\n Please join [the support server](https://discord.gg/YXxET9b94S) and open a ticket if you are in the server.')
        .setColor('RED')
        .setFooter({ text: 'Powered By Tram | Error Code: mZteUh' })

      return await commandData.interaction.followUp({ embeds: [embed1], ephemeral: true })
    }

    if (!guild.me.permissions.has('MANAGE_CHANNELS')) {
      const embed1 = new MessageEmbed()
        .setTitle('Error')
        .setDescription('Tram does not have permission `MANAGE_CHANNELS`. Please give this permission for Tram to function.\n\nPlease refer to [the docs](docs.tram.summerdev.tk)')
        .setColor('RED')
        .setFooter({ text: `Powered By Tram | UserID: ${commandData.user.id} | Error Code: aDu7Pq` })

      return await commandData.interaction.followUp({ embeds: [embed2], ephemeral: true })
    }

    if (!guild.me.permissions.has('MANAGE_GUILD')) {
      const embed1 = new MessageEmbed()
        .setTitle('Error')
        .setDescription('Tram does not have permission `MANAGE_GUILD`. Please give this permission for Tram to function.\n\nPlease refer to [the docs](docs.tram.summerdev.tk)')
        .setColor('RED')
        .setFooter({ text: `Powered By Tram | UserID: ${commandData.user.id} | Error Code: ncRZ9V` })

      return await commandData.interaction.followUp({ embeds: [embed2], ephemeral: true })
    }

    await fetchedChannel.delete()
    await vcModel.deleteOne({
      channelCode: commandData.args[0]
    })

    const embed2 = new MessageEmbed()
      .setTitle('Success!')
      .setDescription("Channel successfully closed.")
      .setColor('GREEN')
      .setFooter({ text: 'Powered By Tram' })

    return await commandData.interaction.followUp({ embeds: [embed2], ephemeral: true })
  }
}
