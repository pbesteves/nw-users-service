const confirmationController = async (payload, User, Token) => {
  const token = await Token.findOne({ token: payload.token });
  try {
    const user = await User.findOne({
      _id: token._userId,
      email: payload.email,
    });

    if (!user)
      return {
        msg: "We were unable to find a user for this token.",
      };

    if (user.isVerified) {
      return {
        type: "already-verified",
        msg: "This user has already been verified.",
      };
    }

    user.isVerified = true;

    return user.save((err) => {
      if (err) return { msg: err.message };
      return { msg: "The account has been verified. Please log in." };
    });
  } catch (error) {
    return { msg: error.message };
  }
};

export default confirmationController;
