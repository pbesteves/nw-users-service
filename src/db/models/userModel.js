import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  isVerified: { type: Boolean, default: false },
  _roleId: { type: mongoose.ObjectId, required: true, ref: 'Role' },
  passwordResetToken: {
    type: String,
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200,
    },
  },
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)

export default User
