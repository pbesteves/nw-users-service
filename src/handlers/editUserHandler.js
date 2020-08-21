import editUserController from '@/controllers/editUserController'

const editUserHandler = async (
  payload,
  openDbConnection,
  userModel,
  encryptMiddleware,
  tokenMiddleware,
  mailerMiddleware,
  checkPasswordsMiddleware
) => {
  try {
    await openDbConnection()
    return editUserController(
      payload,
      userModel,
      encryptMiddleware,
      tokenMiddleware,
      mailerMiddleware,
      checkPasswordsMiddleware
    )
  } catch (error) {
    throw new Error(error)
  }
}

export default editUserHandler
