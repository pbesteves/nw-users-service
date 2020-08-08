import resendTokenController from '@/controllers/resendTokenController'

const resendTokenHandler = async (
  payload,
  openDbConnection,
  userModel,
  tokenMiddleware,
  mailerMiddleware
) => {
  try {
    await openDbConnection()
    return resendTokenController(
      payload,
      userModel,
      tokenMiddleware,
      mailerMiddleware
    )
  } catch (error) {
    throw new Error(error)
  }
}

export default resendTokenHandler
