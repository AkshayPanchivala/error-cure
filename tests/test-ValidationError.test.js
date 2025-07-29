const ValidationError = require('../src/errors/ValidationError');

test('should create a ValidationError instance', () => {
  const error = new ValidationError('Validation failed', 400, { field: 'value' });
  expect(error.message).toBe('Validation failed');
  expect(error.statusCode).toBe(400);
  expect(error.status).toBe('fail');
  expect(error.isOperational).toBe(true);
  expect(error.details).toEqual({ field: 'value' });
});