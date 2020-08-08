const resendTokenController = async (
  payload,
  User,
  mailerMiddleware,
  tokenMiddleware
) => {
  try {
    const user = await User.findOne({ email: payload.email })

    if (!user) return { msg: 'We were unable to find a user with that email' }
    if (user.isVerified) {
      return { msg: 'This account has already been verified. Please log in.' }
    }

    const token = await tokenMiddleware(user._id)

    token.save((err) => {
      if (err) return { msg: err.message }
      return {
        msg: 'A new confirmation token was sent to your email4. ',
      }
    })

    mailerMiddleware({
      to: user.email,
      subject: 'Hello, please verify your email',
      text: `
        Hey ${user.username}, here is a new link to verify your account
        http://localhost/confirmation/${token.token}
        `,
    })
  } catch (error) {
    return { msg: error.msg }
  }
}

export default resendTokenController
