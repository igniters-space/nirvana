const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HappyJarSchema = new Schema({
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

module.exports = HappyJar = mongoose.model('happyjar', HappyJarSchema)
