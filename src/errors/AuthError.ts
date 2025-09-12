import AppError from './AppError';

class AuthError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export default AuthError;
