const { ShardingManager } = require('discord.js');
const { token } = require('../data/config.json');
const { sharding } = require('./customModules/logger')

const manager = new ShardingManager('./src/app.js', { token: token });

manager.on('shardCreate', shard => {
  sharding(`Shard ${shard.id} Online`)
})

manager.spawn()