const NotFoundError = require('../src/errors/NotFoundError');

test('should create a NotFoundError instance', () => {
  const error = new NotFoundError('Resource');
  expect(error.message).toBe('Resource not found');
  expect(error.statusCode).toBe(404);
  expect(error.status).toBe('fail');
  expect(error.isOperational).toBe(true);
});