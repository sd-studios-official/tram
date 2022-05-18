module.exports = {
  name: 'ping',
  description: 'Get Trams latency.',
  // aliases: ['getHelp'],
  category: 'general',
  slash: true,
  global: false,
  ownerOnly: false,

  // options: [
  //     {
  //         name: 'commandid',
  //         description: 'The ID of the command to be deleted.',
  //         require: true,
  //         type: 'string'
  //     }
  // ],

  run: async (commandData) => {
    await commandData.interaction.followUp({ content: `🏓 Current Latency\n\nBot Latency: ${Date.now() - commandData.message.createdTimestamp}ms\nAPI Latency: ${Math.round(commandData.client.ws.ping)}ms`, ephemeral: true })
  }
}
