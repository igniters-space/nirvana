const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Todo = mongoose.model('todo', TodoSchema)
