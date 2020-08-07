import confirmationController from '@/controllers/confirmationController'

const confirmationHandler = async (
  payload,
  openDbConnection,
  userModel,
  tokenModel
) => {
  try {
    await openDbConnection()
    return confirmationController(payload, userModel, tokenModel)
  } catch (err) {
    throw new Error(err)
  }
}

export default confirmationHandler
