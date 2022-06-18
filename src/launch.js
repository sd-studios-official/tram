const { ShardingManager } = require('discord.js')
// const { token } = require('../data/config.json');
require('dotenv').config()
const { sharding } = require('./customModules/logger')

const manager = new ShardingManager('./src/app.js', { token: process.env.TRAM_TOKEN })

manager.on('shardCreate', shard => {
  sharding(`Shard ${shard.id} Online`)
})

manager.spawn()
