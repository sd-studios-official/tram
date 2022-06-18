const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  consent: {
    type: Boolean,
    required: true
  },
  nickname: {
    type: String,
    required: false
  },
  pronouns: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('updr', schema)
