const { Client, Intents } = require('discord.js')
const { token, mongoUri, prefix } = require('../data/config.json')
const { Handler } = require('discord-slash-command-handler')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] })

client.once('ready', () => {
  console.log(`${client.user.tag} has connected to the Discord API successfully.`)

  const handler = new Handler(client, {
    commandFolder: '/commands',
    commandType: 'file' || 'folder',
    eventFolder: '/events',
    // mongoURI: mongoUri,
    slashGuilds: ['964238274581393418', '977187479109107732', '955445111527964722'],
    allSlash: true,
    owners: ['942554411199266826', '701561771529470074'],
    handleSlash: true,
    handleNormal: true,
    prefix,
    timeout: true,
    permissionReply: 'Error - You do not have the correct permission level. Contact the server owner or admin if this is a mistake.',
    timeoutMessage: 'Error - You are on a cooldown.',
    errorReply: 'Error - An unknown error occurred.',
    notOwnerReply: 'Error - You do not have owner privileges.'
  })

  // client.application.commands.fetch('975382679874834482')
  //     .then((command) => {
  //         command.delete()
  //     })
})

client.login(token)
