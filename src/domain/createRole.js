/**
 * @param  {boolean} isAdmin
 * @param  {{ role: string }} newRole
 * @return {object} role
 */
const createRole = (isAdmin, newRole) => {
  if (!isAdmin)
    throw new Error("You don't have enough permissions to make this action")

  if (!newRole.role) throw new Error("Role can't be empty")

  return Object.freeze({ ...newRole })
}

export default createRole
