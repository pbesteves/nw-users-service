import bcrypt from 'bcrypt'

const encrypt = async (password) => {
  const saltRounds = 10
  try {
    const salt = await bcrypt.genSalt(saltRounds)

    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error(error)
  }
}

export default encrypt
