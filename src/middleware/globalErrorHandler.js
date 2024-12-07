const logError = require('../utils/logError');

const globalErrorHandler = (err, req, res, next) => {
  logError(err);

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred!',
    });
  }
};

module.exports = globalErrorHandler;
