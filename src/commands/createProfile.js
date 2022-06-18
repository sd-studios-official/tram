const { MessageActionRow, MessageButton, MessageEmbed, MessageCollector, Modal, TextInputComponent } = require('discord.js')

module.exports = {
  name: 'udpr-create',
  description: 'Create your UPDR (User Profiles Done Right) profile!',
  category: 'udpr',
  slash: true,
  global: false,
  ownerOnly: false,

  options: [
    {
      name: 'privacy-consent',
      description: 'https://docs.tram.summerdev.tk/updr/privacy-policy - Please read!',
      required: true,
      type: 'boolean'
    },
    {
      name: 'pronouns',
      description: 'What are your preferred pronouns?',
      required: true,
      type: 'string'
    },
    {
      name: 'nickname',
      description: 'What is your preferred nickname? (Not Required)',
      required: false,
      type: 'string'
    },
    {
      name: 'info',
      description: 'Anything you want to tell the world?',
      required: false,
      type: 'string'
    }
  ],

  run: async (commandData) => {

  }
}
