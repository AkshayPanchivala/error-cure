const AuthError = require('../src/errors/AuthError');

test('should create an AuthError instance', () => {
  const error = new AuthError('Authentication failed', 401);
  expect(error.message).toBe('Authentication failed');
  expect(error.statusCode).toBe(401);
  expect(error.status).toBe('fail');
  expect(error.isOperational).toBe(true);
});