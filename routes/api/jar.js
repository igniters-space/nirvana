const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const auth = require('../../middlewares/auth')
const HJ = require('../../models/HappyJar')
const SJ = require('../../models/SadJar')

const { check, validationResult } = require('express-validator')

// @route   POST api/todos
// @desc    create a todo
// @access  Private

router.post(
  '/happy',
  [
    auth,
    [
      check('title', 'Text is required').not().isEmpty(),
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
      const newhj = new HJ({
        title: req.body.title,
        description: req.body.description,
        user: req.userId.id,
      })
      const hj = await newhj.save()
      res.json(hj)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
)

router.post(
  '/sad',
  [
    auth,
    [
      check('title', 'Text is required').not().isEmpty(),
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
      const newhj = new SJ({
        title: req.body.title,
        description: req.body.description,
        user: req.userId.id,
      })
      const hj = await newhj.save()
      res.json(hj)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
)

router.get('/happy/getone', auth, async (req, res) => {
  const hjs = await HJ.find().where({ user: req.userId.id })
  const rand = Math.floor(Math.random() * (hjs.length - 1 - 0 + 1)) + 0
  const ids = hjs.map((item) => item.id)
  res.send(hjs.filter((item) => item.id === ids[rand]))
})

router.get('/sad/getone', auth, async (req, res) => {
  const sjs = await SJ.find().where({ user: req.userId.id })
  const rand = Math.floor(Math.random() * (sjs.length - 1 - 0 + 1)) + 0
  const ids = sjs.map((item) => item.id)
  res.send(sjs.filter((item) => item.id === ids[rand]))
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

module.exports = router
