const AppError = require('./errors/AppError');
const ValidationError = require('./errors/ValidationError');
const AuthError = require('./errors/AuthError');
const DatabaseError = require('./errors/DatabaseError');
const NotFoundError = require('./errors/NotFoundError');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const handleUnhandledRejections=require("./utils/handleRejections")

module.exports = {
  AppError,
  ValidationError,
  AuthError,
  DatabaseError,
  NotFoundError,
  globalErrorHandler,
  handleUnhandledRejections
};
