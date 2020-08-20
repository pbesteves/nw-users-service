import deleteUserController from '@/controllers/deleteUserController'

const deleteUserHandler = async (
  payload,
  openDbConnection,
  userModel,
  mailerMiddleware
) => {
  try {
    await openDbConnection()
    return deleteUserController(payload, userModel, mailerMiddleware)
  } catch (error) {
    throw new Error(error)
  }
}

export default deleteUserHandler
