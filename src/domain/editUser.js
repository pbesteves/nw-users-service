const editUser = (payload, arePasswordEqual = false) => {
  if (payload.email) {
    return Object.freeze({
      email: payload.email,
      isVerified: false,
    })
  }

  if (payload.password) {
    if (arePasswordEqual)
      throw new Error("New and old passwords can't be the same")

    return Object.freeze({
      hash: payload.password,
      isVerified: false,
    })
  }
}

export default editUser
