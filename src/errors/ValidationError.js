const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message, field, details = null) {
    super(message, 400, details);
    this.field = field;
  }
}

module.exports = ValidationError;
