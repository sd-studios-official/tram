const quickdb = require('quick.db')
const db = quickdb
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'vc-request',
  description: 'Request to vc with someone!',
  // aliases: ['getHelp'],
  category: 'vc',
  slash: true,
  global: false,
  ownerOnly: false,

  options: [
    {
      name: 'reason',
      description: "The reason for the VC. It's also just the name. Go wild.",
      required: true,
      type: 'string'
    },
    {
      name: 'user1',
      description: 'The first user you want to invite. This person is required.',
      required: true,
      type: 'user'
    },
    {
      name: 'user2',
      description: 'The second user you want to invite. This person is not required.',
      require: false,
      type: 'user'
    },
    {
      name: 'user3',
      description: 'The third user you want to invite. This person is not required.',
      require: false,
      type: 'user'
    }
  ],

  run: async (commandData) => {
    const guild = commandData.client.guilds.cache.get(commandData.guild.id)
    const member = guild.members.cache.get(commandData.args[1])

    const user = commandData.client.users.cache.find(u => u.id === commandData.args[1])

    await commandData.interaction.followUp({ content: `${member} - ${user}` })
  }
}
