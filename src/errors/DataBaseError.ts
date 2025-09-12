import AppError from './AppError';

class DatabaseError extends AppError {
  query: string;

  constructor(message: string = 'Database operation failed', query: string = '') {
    super(message, 500);
    this.query = query;
  }
}

export default DatabaseError;
