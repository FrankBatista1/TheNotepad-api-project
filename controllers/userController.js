const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse("Couldn't get the user", 404));
  }
}
exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const newUser = await User.findByIdAndUpdate(req.body, {new: true});
  try {
    return res.status(202).json(newUser);
  } catch (error) {
    return next(new ErrorResponse("Couldn't update the user", 404));
  }

}
exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  try{
    return res.status(200).json({message: 'Succesfully deleted'});
  }catch(error){
    return next(new ErrorResponse("Couldn't delete the user", 400));
  }
}
const sendToken = (user, statusCode, res) => {
  const name = user.name
  const events = user.events
  res.status(statusCode).json({ sucess: true, name, events});
};
