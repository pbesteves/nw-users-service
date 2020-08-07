import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  isVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
  username: { type: String, unique: true, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
