const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  },
  channelCode: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('vc', schema)
