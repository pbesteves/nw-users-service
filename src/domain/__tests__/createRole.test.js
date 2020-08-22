import createRole from '../createRole'

describe('Create Role', () => {
  it('should throw an error if user role is not Admin', () => {
    const isAdmin = false
    const newRole = { role: 'Admin' }

    expect(() => createRole(isAdmin, newRole)).toThrowError()
  })

  it('should throw an error if role is not specified', () => {
    const isAdmin = true
    const newRole = {}

    expect(() => createRole(isAdmin, newRole)).toThrowError()
  })

  it('should return an object with the new role', () => {
    const isAdmin = true
    const newRole = { role: 'Admin' }

    expect(createRole(isAdmin, newRole)).toHaveProperty('role', 'Admin')
  })
})
