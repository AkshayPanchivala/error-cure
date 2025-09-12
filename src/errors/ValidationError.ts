import AppError from './AppError';

class ValidationError extends AppError {
  field: string;

  constructor(message: string, field: string, details: any = null) {
    super(message, 400, details);
    this.field = field;
  }
}

export default ValidationError;
