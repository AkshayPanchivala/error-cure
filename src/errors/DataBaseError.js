const AppError = require('./AppError');

class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', query = '') {
    super(message, 500);
    this.query = query;
  }
}

module.exports = DatabaseError;
