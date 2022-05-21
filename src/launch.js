const { ShardingManager } = require('discord.js');
const { token } = require('../data/config.json')

const manager = new ShardingManager('./src/app.js', { token: token });

manager.on('shardCreate', shard => {
  console.log(`[Tram] [Sharding] ~ Shard ${shard.id} Online`)
})

manager.spawn()