const { EventListener } = require('yuuko');
const logger = require('fancy-log')

module.exports = new EventListener('ready', (ctx) => {
    logger.info(`Tram: Connected into the Discord API`)
})