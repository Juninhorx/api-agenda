import jwt from 'jsonwebtoken'

export const verifyToken = (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return false
    } else {
      return true
    }
  })
}