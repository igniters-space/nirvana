const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SadJarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

module.exports = SadJar = mongoose.model('sadjar', SadJarSchema)
