const { Command } = require('yuuko');
module.exports = new Command('owo', (msg, args, ctx) => {
    msg.channel.createMessage('OwO');
});