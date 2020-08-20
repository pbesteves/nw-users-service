const deleteUserController = async (payload, User, mailerMiddleware) => {
  try {
    const user = await User.findOneAndDelete(payload.id)
    mailerMiddleware({
      to: user.email,
      subject: 'We are sad to see you go',
      text: `
            We'd like to thank you for your time with us and hope to see you
            in the future.
        `,
    })
  } catch (error) {
    return { msg: error.message }
  }
}

export default deleteUserController
