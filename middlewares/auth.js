const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // get the token from the header
  const authorization = req.header('Authorization')

  // check if no token
  if (!authorization) {
    return res.status(401).json({
      err: 'no token authorization denied',
    })
  }
  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      err: 'no token authorization denied',
    })
  }
  // verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({
      err: 'invalid token',
    })
  }
}
