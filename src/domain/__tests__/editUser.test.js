import editUser from '@/domain/editUser'

describe('Edit user', () => {
  it('should throw an error if new and old password are the same', () => {
    const currentPassword = '1234'

    const password = {
      password: '1234',
    }

    const errorMessage = "New and old passwords can't be the same"

    expect(() => editUser(password, currentPassword)).toThrowError(errorMessage)
  })

  it('should return an object with the new password and isVerified with false value', () => {
    const password = {
      password: '12345',
    }

    const result = {
      hash: '12345',
      isVerified: false,
    }

    expect(editUser(password, false)).toStrictEqual(result)
  })

  it('should return an object with the new email and isVerified with false value', () => {
    const email = {
      email: 'test@test.com',
    }

    const result = {
      email: 'test@test.com',
      isVerified: false,
    }

    expect(editUser(email)).toStrictEqual(result)
  })
})
