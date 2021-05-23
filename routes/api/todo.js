const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Todo = require('../../models/Todo')
const auth = require('../../middlewares/auth')

const { check, validationResult } = require('express-validator')

// @route   POST api/todos
// @desc    create a todo
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }
    try {
      console.log(req.userId.id)
      const user = await User.findById(req.userId.id).select('-password')
      console.log(user)
      const newTodo = new Todo({
        text: req.body.text,
        description: req.body.description,
        completed: false,
        user: req.userId.id,
      })
      const todo = await newTodo.save()
      res.json(todo)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
)

router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find().where({ user: req.userId.id }).sort({
      date: -1,
    })
    res.send({ todos })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (todo.user.toString() !== req.userId.id) {
      return res.status(401).json({
        msg: 'You are not authorized',
      })
    }
    todo.completed = !todo.completed
    await todo.save()
    res.json(todo)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({
        msg: 'Todo not found',
      })
    }
    if (todo.user.toString() !== req.userId.id) {
      return res.status(401).json({
        msg: 'You are not authorized',
      })
    }
    todo.remove()
    res.json({
      msg: 'removed todo',
    })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Todo not found',
      })
    }
    res.status(500).send('server error')
  }
})

module.exports = router
