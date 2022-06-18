const { Client, Intents } = require('discord.js')
const { Handler } = require('discord-slash-command-handler')
const express = require('express')
const path = require('path')
const logger = require('./customModules/logger')
const mongoose = require('mongoose')
const { catchAsync } = require('./server/oauth/utils')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
require('dotenv').config()
const cookieParser = require('cookie-parser')

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
  // ws: { properties: { $browser: "Discord iOS" } }
})

const app = express()
const vcURI = process.env.MONGO_URI_VC

client.once('ready', () => {
  logger.bot(`${client.user.tag} Successfully Connected to Discord`)

  const handler = new Handler(client, {
    commandFolder: '/commands',
    commandType: 'file' || 'folder',
    eventFolder: '/events',
    mongoURI: process.env.MONGO_URI_COOLDOWN,
    slashGuilds: [
      '964238274581393418',
      '977187479109107732',
      '955445111527964722'
    ],
    allSlash: true,
    owners: [process.env.TRAM_OWNER],
    handleSlash: true,
    handleNormal: true,
    prefix: process.env.TRAM_PREFIX,
    timeout: true,
    permissionReply:
      'Error - You do not have the correct permission level. Contact the server owner or admin if this is a mistake.',
    timeoutMessage: 'Error - You are on a cooldown.',
    errorReply: 'Error - An unknown error occurred.',
    notOwnerReply: 'Error - You do not have owner privileges.'
  })

  mongoose.connect(vcURI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
    keepAlive: true
  })
    .then(() => {
      logger.mongo('VC Database Connected')
    }).catch((err) => {
      console.log(err)
    })
})

// client.user.setActivity('the voice channels', { type: "WATCHING" })
// client.vcdb = connection;

client.login(process.env.TRAM_TOKEN).then(r => logger.bot(r))

app.use(cookieParser())
app.use(express.static('public'))
app.use('/api/discord', require('./server/oauth/discord.js'))
app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message
      })
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message
      })
  }
})

// app.get('/', (req, res) => {
//   res.status(200).sendFile(__dirname + '/server/oauth/index.html')
// })

app.get('/dashboard/app.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/server/dashboard/app.js'))
})

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/server/dashboard/index.html')
})

app.get('/dashboard', catchAsync(async (req, res) => {
  const cookie = req.cookies.access
  if (!cookie || cookie === undefined) {
    return res.redirect(`http://${process.env.TRAM_ADDRESS}/api/discord/login/dash`)
  }

  const site2 = await fetch('https://discord.com/api/v9/users/@me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookie}` }
  })

  const response1 = await site2.json()
  const pfp = `https://cdn.discordapp.com/avatars/${response1.id}/${response1.avatar}.png`
  res.send(pfp)
}))

app.listen(process.env.TRAM_PORT, () => {
  logger.oauth('Running On Port 8080')
})
