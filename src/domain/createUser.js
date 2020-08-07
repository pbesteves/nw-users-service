const createUser = ({ username, email, password, isVerified = false }) => {
  if (username.legnth === 0) throw new Error("Username can't be empty")
  if (email.length === 0) throw new Error("Email can't be empty")
  if (password.length === 0) throw new Error("Password can't be empty")

  return Object.freeze({
    email,
    isVerified,
    password,
    username,
  })
}

export default createUser
