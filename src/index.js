const AppError = require('./errors/AppError');
const ValidationError = require('./errors/ValidationError');
const AuthError = require('./errors/AuthError');
const DatabaseError = require('./errors/DataBaseError');
const NotFoundError = require('./errors/NotFoundError');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const handleUnhandledRejections=require("./utils/handleRejections");
const logError=require("./utils/logError")

module.exports = {
  AppError,
  ValidationError,
  AuthError,
  DatabaseError,
  NotFoundError,
  globalErrorHandler,
  handleUnhandledRejections,
  logError
};
