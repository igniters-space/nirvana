const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // get the token from the header
  const authorization = req.header('Authorization')

  // check if no token
  if (!authorization) {
    return res.status(401).json({
<<<<<<< HEAD
      msg: 'no token authorization denied',
=======
      err: 'no token authorization denied',
>>>>>>> 162b1d6c3341e7fe5e644c0b0d83df7d9b8f3ea3
    })
  }
  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({
<<<<<<< HEAD
      msg: 'no token authorization denied',
=======
      err: 'no token authorization denied',
>>>>>>> 162b1d6c3341e7fe5e644c0b0d83df7d9b8f3ea3
    })
  }
  // verify the token
  try {
<<<<<<< HEAD
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
>>>>>>> 162b1d6c3341e7fe5e644c0b0d83df7d9b8f3ea3
    req.userId = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({
<<<<<<< HEAD
      msg: 'invalid token',
=======
      err: 'invalid token',
>>>>>>> 162b1d6c3341e7fe5e644c0b0d83df7d9b8f3ea3
    })
  }
}
