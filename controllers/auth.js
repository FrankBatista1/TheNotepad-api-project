const User = require("../models/User");
const ErrorResponse = require('../errorResponse')

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   error: error.message,
    // })
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password} = req.body;

  if(!email || !password){
    // res.status(400).json({success: false, error: "Please provide email and password"}) 
    return next(new ErrorResponse('Please provide an email and password', 400))
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if(!user){
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
      return next(new ErrorResponse('Invalid credentials', 401))
    }
    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

exports.forgotpassword = async (req, res, next) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return next(new ErrorResponse('Email could not be sent', 404))
    }
    const resetToken = user.getResetPasswordToken();

    await user.save()

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
    <h1>Password reset requested<h1>
    <p>To reset your password go to this link<p>
    <a href=${resetUrl} clicktracking=off>`
  } catch (error) {
    
  }
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset password Route");
};

const sendToken = (user, statusCode, res) => {
   const token = user.getSignedToken();
   res.status(statusCode).json({success: true, token})
}
