import editUser from '@/domain/editUser'

const editUserController = async (
  payload,
  User,
  encryptMiddleware,
  tokenMiddleware,
  mailerMiddleware,
  checkPasswordsMiddleware
) => {
  try {
    if (payload.email) {
      const userData = editUser(payload)

      const user = await User.findByIdAndUpdate(payload.id, userData)

      user.save((err) => {
        if (err) return { msg: err.message }
        return { msg: 'Email updated. ' }
      })

      const token = tokenMiddleware(user._id)

      token.save((err) => {
        if (err) return { msg: err.message }
        return {
          msg: 'Please verify your email by following the link sent to you. ',
        }
      })

      mailerMiddleware({
        to: payload.email,
        subject: 'Hello, please verify your email',
        text: `
          Please verify your email address by clicking in the link below:
          http://localhost/confirmation/${token.token}
      `,
      })
    }

    if (payload.password) {
      const hash = await encryptMiddleware(payload.password)
      let user = await User.findById(payload.id)

      const updatedUser = editUser(
        { password: hash },
        await checkPasswordsMiddleware(payload.password, user.hash)
      )
      const token = tokenMiddleware(user._id)

      token.save((err) => {
        if (err) return { msg: err.message }
        return {
          msg: 'An email has been sent to reset your password. ',
        }
      })

      await User.updateOne(
        { _id: payload.id },
        { ...updatedUser, passwordResetToken: token.token }
      )

      mailerMiddleware({
        to: user.email,
        subject: 'Hello, please confirm your password reset',
        text: `
            Please confirm that you want to reset your password by accessing the
            following page.
            http://localhost/confirmation/${token.token}
        `,
      })
    }
  } catch (error) {
    return { msg: error.message }
  }
}

export default editUserController
