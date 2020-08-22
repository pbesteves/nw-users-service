import createRoleController from '@/controllers/createRoleController'
/**.
 * @param  {{ role: string, roleId: string }} payload
 *  The 'role' property is the label of the new role.
 *
 *  The 'roleId' property is the ID of the role
 *  associated with the user that is creating the role
 * @param  { function } openDbConnection
 * @param  { object } userModel
 * @param  { object } roleModel
 */
const createRoleHandler = async (
  payload,
  openDbConnection,
  userModel,
  roleModel
) => {
  try {
    await openDbConnection()
    return createRoleController(payload, userModel, roleModel)
  } catch (error) {
    throw new Error(error)
  }
}

export default createRoleHandler
