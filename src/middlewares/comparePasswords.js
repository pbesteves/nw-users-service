import checkPasswords from '@/components/checkPasswords'

const comparePasswords = (req, res, next) => {
  req.checkPasswordsComponent = checkPasswords
  next()
}

export default comparePasswords
