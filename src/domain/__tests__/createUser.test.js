import createUser from '../createUser'

describe('Create user object', () => {
  it('should create a new user object', () => {
    const user = {
      email: 'test@test.com',
      isVerified: false,
      hash: '$2y$10$PypuMtWBajv6ay/wmEZlGOughm9QKmZKyT/HY.2DbSt7SekVv8TcG',
      username: 'testname',
      roleId: 'somerandomhash123123',
    }

    const result = {
      email: 'test@test.com',
      isVerified: false,
      hash: '$2y$10$PypuMtWBajv6ay/wmEZlGOughm9QKmZKyT/HY.2DbSt7SekVv8TcG',
      username: 'testname',
      _roleId: 'somerandomhash123123',
    }

    expect(createUser(user)).toStrictEqual(result)
  })

  it('should create a new user object with isVerified property set to false by default', () => {
    const user = {
      email: 'test@test.com',
      isVerified: false,
      hash: '$2y$10$PypuMtWBajv6ay/wmEZlGOughm9QKmZKyT/HY.2DbSt7SekVv8TcG',
      username: 'testname',
    }

    expect(createUser(user)).toHaveProperty('isVerified', false)
  })

  it('should throw an error if username is not specified', () => {
    const user = {
      email: 'test@test.com',
      isVerified: false,
      hash: '$2y$10$PypuMtWBajv6ay/wmEZlGOughm9QKmZKyT/HY.2DbSt7SekVv8TcG',
      role: 'Admin',
    }

    const errorMessage = "Username can't be empty"

    expect(() => createUser(user)).toThrowError(errorMessage)
  })

  it('should throw an error if email is not specified', () => {
    const user = {
      username: 'testname',
      isVerified: false,
      hash: '$2y$10$PypuMtWBajv6ay/wmEZlGOughm9QKmZKyT/HY.2DbSt7SekVv8TcG',
      role: 'Admin',
    }

    const errorMessage = "Email can't be empty"

    expect(() => createUser(user)).toThrowError(errorMessage)
  })
})
