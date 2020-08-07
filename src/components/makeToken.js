import crypto from 'crypto'

const makeToken = (userId) => {
  return Object.freeze({
    _userId: userId,
    token: crypto.randomBytes(16).toString('hex'),
  })
}

export default makeToken
