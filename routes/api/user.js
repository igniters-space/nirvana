const express = require('express')
const auth = require('../../middlewares/auth')
const router = express.Router()
const User = require('../../models/User')

router.get('/authuser', auth, async (req, res) => {
  const userId = req.userId.id
  console.log(userId)
  try {
    const user = await User.findById(userId).select('-password')
    res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router
