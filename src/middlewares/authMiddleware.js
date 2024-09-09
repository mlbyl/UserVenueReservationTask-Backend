const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
  const authenticationHeader = req.headers.authorization;
  if (   !authenticationHeader.startsWith('Bearer ')) {
    return next(new ErrorResponse('Authorization token must be in Bearer format', 401));
  }
  const token = authenticationHeader && authenticationHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send({ message: 'Token not provided' })
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid or expired token' })
    }
    else {
      req.user = user
      next()
    }
  })
}
module.exports = authMiddleware