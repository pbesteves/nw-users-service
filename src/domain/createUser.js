const createUser = ({
  username,
  email,
  hash,
  isVerified = false,
  role = 'Member',
}) => {
  if (!username) throw new Error("Username can't be empty")
  if (!email) throw new Error("Email can't be empty")

  return Object.freeze({
    email,
    isVerified,
    hash,
    username,
    role,
  })
}

export default createUser
