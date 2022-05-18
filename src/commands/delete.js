module.exports = {
  name: 'delete',
  description: 'Owner Only : Delete a slash command.',
  // aliases: ['getHelp'],
  category: 'general',
  slash: true,
  global: false,
  ownerOnly: true,

  options: [
    {
      name: 'commandid',
      description: 'The ID of the command to be deleted.',
      require: true,
      type: 'string'
    }
  ],

  run: async (commandData) => {
    // await commandData.interaction.followUp({ content: 'Help Menu' })
    // console.log(commandData.interaction.commandId)
    // await commandData.client.application.commands.set([commandData.args[0]], "964238274581393418")

    commandData.client.application.commands.fetch(commandData.args[0])
      .then((command) => {
        command.delete()
      })

    await commandData.interaction.followUp({ content: 'Command Deleted.', ephemeral: true })
  }
}
