const globalErrorHandler = require('../src/middleware/globalErrorHandler');
const AppError = require('../src/errors/AppError');

describe('globalErrorHandler', () => {
  let mockReq, mockRes, mockNext;
  let consoleErrorSpy;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    // Clear process.env.NODE_ENV before each test to ensure isolation
    delete process.env.NODE_ENV;
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original process.env.NODE_ENV if needed, or ensure it's clean
    delete process.env.NODE_ENV;
    consoleErrorSpy.mockRestore();
  });

  test('should send detailed error in development environment', () => {
    process.env.NODE_ENV = 'development';
    const err = new AppError('Test Error', 400);
    globalErrorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'fail',
      error: err,
      message: 'Test Error',
      stack: expect.any(String),
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(err);
  });

  test('should send operational error in production environment', () => {
    process.env.NODE_ENV = 'production';
    const err = new AppError('Operational Error', 401);
    globalErrorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Operational Error',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(err);
  });

  test('should send generic error for programming errors in production', () => {
    process.env.NODE_ENV = 'production';
    const err = new Error('Programming Error');
    globalErrorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'An unexpected error occurred!',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('ERROR 💥', err);
  });
});