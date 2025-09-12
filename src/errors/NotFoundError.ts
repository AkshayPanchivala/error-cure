import AppError from './AppError';

class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export default NotFoundError;
