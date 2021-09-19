// const ErrorResponse = require('../errorResponse');

// const errorHandler = (err, res, req, next) => {
//   let error = { ...err };

//   error.message = err.message

//   if(err.code === 11000){
//     const message = `Duplicate field value entered`;
//     error = new ErrorResponse(message, 400);
//   }
//   if(err.name === "ValidationError"){
//     const message = Object.values(err.errors).map(val => val.message)
//     error = new ErrorResponse(message, 400)
//   }
//   res.status(error.statusCode || )
// }