import addUserController from '@/controllers/addUserController'

const addUserHandler = async (
  payload,
  openDbConnection,
  userModel,
  encryptMiddleware,
  tokenMiddleware,
  mailerMiddleware
) => {
  try {
    await openDbConnection()
    return addUserController(
      payload,
      userModel,
      encryptMiddleware,
      tokenMiddleware,
      mailerMiddleware
    )
  } catch (err) {
    throw new Error(err)
  }
}

export default addUserHandler
