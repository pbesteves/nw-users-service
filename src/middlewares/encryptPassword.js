import encrypt from '@/components/encrypt'

const encryptPassword = (req, res, next) => {
  req.encryptComponent = encrypt
  next()
}

export default encryptPassword
