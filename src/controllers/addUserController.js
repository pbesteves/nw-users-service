import createUser from '@/domain/createUser'

const addUserController = async (
  payload,
  User,
  encryptMiddleware,
  tokenMiddleware,
  mailerMiddleware
) => {
  const hash = await encryptMiddleware(payload.password)
  const userData = createUser({ hash, ...payload })

  try {
    let user = await User.findOne({ email: userData.email })
    if (user) {
      return { msg: 'This email is already associated with an account.' }
    }

    user = new User({ ...userData })

    user.save((err) => {
      if (err) return { msg: err.message }
      return { msg: 'Account created. ' }
    })

    const token = tokenMiddleware(user._id)

    token.save((err) => {
      if (err) return { msg: err.message }
      return {
        msg: 'Please verify your email by following the link sent to you. ',
      }
    })

    mailerMiddleware({
      to: user.email,
      subject: 'Hello, please verify your email',
      text: `
          Please verify your email address by clicking in the link below:
          http://localhost/confirmation/${token.token}
      `,
    })
  } catch (error) {
    return { msg: error.message }
  }
}

export default addUserController
