import mailer from '@/components/mailer'

const dispatchMail = (req, res, next) => {
  req.emailComponent = mailer
  next()
}

export default dispatchMail
