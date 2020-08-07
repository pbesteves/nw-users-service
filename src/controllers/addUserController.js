import createUser from "@/domain/createUser";

const addUserController = async (
  payload,
  User,
  tokenMiddleware,
  mailerMiddleware
) => {
  const userData = createUser(payload);

  try {
    let user = await User.findOne({ email: userData.email });
    if (user) {
      return { msg: "This email is already associated with an account." };
    }

    user = new User({ ...userData });

    user.save((err) => {
      if (err) return { msg: err.message };
      return { msg: "Account created. " };
    });

    const token = tokenMiddleware(user._id);

    token.save((err) => {
      if (err) return { msg: err.message };
      return {
        msg: "Please verify your email by following the link sent to you. ",
      };
    });

    mailerMiddleware(
      user.email,
      "Hello, please verify your email",
      `
                Please verify your email address by clicking in the link below:
                http://localhost/confirmation/${token.token}
            `
    );
  } catch (error) {
    return { msg: error.message };
  }
};

export default addUserController;
