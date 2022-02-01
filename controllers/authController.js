const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  //checking for existent email
  const { email , name, password} = req.body
  if (!name || !email || !password) {
    return next(new ErrorResponse("Please provide an name, email and password", 400));
  }
  const testEmail = await User.findOne({email});
  if (testEmail) {
    return next(new ErrorResponse("Please provide a valid email", 400))
  }
  //creating the new User and hashing the password
  const user = await new User({name, email, password});
  try {
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // res.status(400).json({success: false, error: "Please provide email and password"})
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.signup = async (req, res, next) => {
  //checking for existent email
  const { email, name, password } = req.body;
  if (!name || !email || !password) {
    return next(
      new ErrorResponse("Please provide an name, email and password", 400)
    );
  }
  const testEmail = await User.findOne({ email });
  if (testEmail) {
    return next(new ErrorResponse("Please provide a valid email", 400));
  }
  //creating the new User and hashing the password
  const user = await new User({ name, email, password });
  try {
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    const resetUrl = `${clientUrl}/passwordreset/${resetToken}`;

    const message = `
  <h1>Password reset</h1>
  <h2>Become your own personal trainer</h2>
  <p>Please go to this link to restore your password</p>
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  `;

    try {
      sendEmail({
        to: user.email,
        subject: "Reset password request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
    await user.save();
  } catch (error) {
    next(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid link", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password succesfully updated",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset password Route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
