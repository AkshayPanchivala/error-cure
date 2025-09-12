import ValidationError from '../src/errors/ValidationError';

test('should create a ValidationError instance', () => {
  const error = new ValidationError('Validation failed', 'field', { field: 'value' });
  expect(error.message).toBe('Validation failed');
  expect(error.statusCode).toBe(400);
  expect(error.status).toBe('fail');
  expect(error.isOperational).toBe(true);
  expect(error.details).toEqual({ field: 'value' });
});