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
    res.status(201).json({
      success: true,
      token: "43124dwe",
    });
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
    res.status(200).json({
      success: true,
      token: "194adf404",
    });

  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset password Route");
};
