import addUserController from '@/controllers/addUserController'

const addUserHandler = async (
  payload,
  openDbConnection,
  userModel,
  tokenMiddleware,
  mailerMiddleware
) => {
  try {
    await openDbConnection()
    return addUserController(
      payload,
      userModel,
      tokenMiddleware,
      mailerMiddleware
    )
  } catch (err) {
    throw new Error(err)
  }
}

export default addUserHandler
