const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

// @route   POST  api/users
// @desc    Register a user
// @access  Public

router.post(
  '/signup',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with a minimum of 6 characters '
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { username, email, password } = req.body

    try {
      // see if user exists
      let user = await User.findOne({
        email,
      })
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'user already exists',
            },
          ],
        })
      }
      user = new User({
        username,
        email,
        password,
      })
      // encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      // return jwt token
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err
          res.json({
            token,
          })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send('server error')
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    try {
      // see if user exists

      let user = await User.findOne({
        email,
      })
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        })
      }

      //  verify password

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        })
      }

      // return jwt token

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err
          res.json({
            token,
          })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send('server error')
    }
  }
)

module.exports = router
