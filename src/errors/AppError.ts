class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    details: any;

    constructor(message: string, statusCode: number, details: any = null) {
      super(message);
      this.statusCode = statusCode || 500;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; // Marks the error as operational
      this.details = details;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  