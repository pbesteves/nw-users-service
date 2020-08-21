import bcrypt from 'bcrypt'

const checkPasswords = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    throw new Error(error)
  }
}

export default checkPasswords
