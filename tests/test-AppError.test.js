const AppError = require('../src/errors/AppError');

test('should create an AppError instance', () => {
  const error = new AppError('Test error', 400);
  expect(error.message).toBe('Test error');
  expect(error.statusCode).toBe(400);
  expect(error.status).toBe('fail');
});