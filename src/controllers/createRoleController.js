import createRole from '@/domain/createRole'
/**
 * @param  {{id: string, role: string}} payload
 *  The 'role' property is the label of the new role.
 *
 *  The 'id' property is the ID of the role
 *  associated with the user that is creating the new role
 * @param  {object} User
 * The User parameter refers to the MongoDB User model
 * @param  {object} Role
 * The Role parameter refers to the MongoDB Role model
 */
const createRoleController = async (payload, User, Role) => {
  try {
    const fetchRole = await Role.findById(payload.id)
    const isAdmin = fetchRole.role === 'Admin'

    let role = await Role.findOne({ role: payload.role })

    if (role) return { msg: 'Role already exists.' }

    const newRole = createRole(isAdmin, { role: payload.role })

    role = new Role({ ...newRole })

    const newRoleResult = await role.save()

    if (newRoleResult === role)
      return Object.freeze({ msg: 'New role created.' })
  } catch (error) {
    return { msg: error.message }
  }
}

export default createRoleController
