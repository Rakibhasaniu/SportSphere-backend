import { ErrorRequestHandler } from 'express'


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = 'something went Wrong'
  let errorMessage = err.message
  let statusCode = 500
  let error = err
  let stack = error?.stack

//   if (err instanceof ZodError) {
//     statusCode = 400
//     message = 'Validation Error'
//     errorMessage = ZodErrorMessageGenerator(err)
//   } else if (err.name === 'ValidationError') {
//     statusCode = 400
//     message = 'Validation Error'
//     errorMessage = MongooseErrorMessageGenerator(err)
//   } else if (err?.name === 'CastError') {
//     statusCode = 400
//     message = 'Invalid ID!'
//     errorMessage = CastErrorMessageGenerator(err)
//   } else if (err?.code === 11000) {
//     statusCode = 400
//     message = 'Duplicate Entry!'
//     errorMessage = DuplicateErrorMessageGenerator(err)
//   } else if (err instanceof AppError) {
//     statusCode = err.statusCode
//     message = 'BAD REQUEST!'
//     errorMessage = err.message
//   } else if (err instanceof AuthError) {
//     statusCode = err.statusCode
//     message = err.message
//     errorMessage =
//       'You do not have the necessary permissions to access this resource.'
//     error = null
//     stack = null
//   } else if (err instanceof Error) {
//     message = 'Something Went Wrong!'
//     errorMessage = err.message
//   }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: error,
    stack: stack,
  })
}

export default globalErrorHandler
