const express = require('express')
const router = express.Router()
const config = require('../../../data/serverConfig.json')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const btoa = require('btoa')
const { catchAsync } = require('./utils')

const CLIENT_ID = config.clientId
const CLIENT_SECRET = config.clientSecret
const redirect = encodeURIComponent(`http://${config.address}:3001/api/discord/callback`)
const redirectDash = encodeURIComponent(`http://${config.address}:3001/api/discord/callback/dash`)

router.get('/login', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds%20email&response_type=code&redirect_url=${redirect}`)
})

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided')
  const code = req.query.code
  const body = {
    'client_id': config.clientId,
    'client_secret': config.clientSecret,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': `http://${config.address}:3001/api/discord/callback`
  }

  const params = new URLSearchParams()
  params.append('client_id', config.clientId)
  params.append('client_secret', config.clientSecret)
  params.append('grant_type', 'authorization_code');
  params.append('code', code)
  params.append('redirect_uri', `http://${config.address}:3001/api/discord/callback`)

  const site = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })

  const response = await site.json()
  const accessToken = response['access_token']
  const refreshToken = response['refresh_token']

  const site2 = await fetch('https://discord.com/api/v9/users/@me', {
    method: 'GET',
    headers: {'Authorization': `Bearer ${accessToken}`}
  });

  const response1 = await site2.json()
  const username = response1.id

  res.cookie('access', accessToken)
  res.cookie('refresh', refreshToken)

  res.redirect(`http://${config.address}:3001/`)
}))

router.get('/refresh', catchAsync(async (req, res) => {
  const cookie = req.cookies.refresh
  if (!cookie || cookie === undefined) {
    return res.redirect(`http://${config.address}:3001/api/discord/login`)
  }

  const params = new URLSearchParams()
  params.append('client_id', config.clientId)
  params.append('client_secret', config.clientSecret)
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', req.cookies.refresh)

  const site = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })

  const response = await site.json()

  res.clearCookie('access')
  res.clearCookie('refresh')

  const accessToken = response['access_token']
  const refreshToken = response['refresh_token']

  res.cookie('access', accessToken)
  res.cookie('refresh', refreshToken)

  res.redirect(`http://${config.address}:3001/api/discord/info`)
}))

router.get('/info', catchAsync(async (req, res) => {
  const site2 = await fetch('https://discord.com/api/v9/users/@me', {
    method: 'GET',
    headers: {'Authorization': `Bearer ${req.cookies.access}`}
  });

  const response1 = await site2.json()
  const username = response1.username

  res.send(username)
}))

router.get('dashboard', catchAsync(async (req, res) => {
  const cookie = req.cookies.access
  if (!cookie || cookie === undefined) {
    return res.redirect(`http://${config.address}:3001/api/discord/login/dash`)
  }

  const site2 = await fetch('https://discord.com/api/v9/users/@me', {
    method: 'GET',
    headers: {'Authorization': `Bearer ${accessToken}`}
  });

  const response1 = await site2.json()
  const pfp = `https://cdn.discord.com/avatars/${response1.id}/${response1.avatar}.png`
  res.send(pfp)
}))

router.get('/login/dash', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds%20email&response_type=code&redirect_url=${redirectDash}`)
})

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided')
  const code = req.query.code
  const body = {
    'client_id': config.clientId,
    'client_secret': config.clientSecret,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': `http://${config.address}:3001/api/discord/callback/dash`
  }

  const params = new URLSearchParams()
  params.append('client_id', config.clientId)
  params.append('client_secret', config.clientSecret)
  params.append('grant_type', 'authorization_code');
  params.append('code', code)
  params.append('redirect_uri', `http://${config.address}:3001/api/discord/callback/dash`)

  const site = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })

  const response = await site.json()
  const accessToken = response['access_token']
  const refreshToken = response['refresh_token']

  const site2 = await fetch('https://discord.com/api/v9/users/@me', {
    method: 'GET',
    headers: {'Authorization': `Bearer ${accessToken}`}
  });

  const response1 = await site2.json()
  const username = response1.id

  res.cookie('access', accessToken)
  res.cookie('refresh', refreshToken)

  res.redirect(`http://${config.address}:3001/dashboard`)
}))

module.exports = router;