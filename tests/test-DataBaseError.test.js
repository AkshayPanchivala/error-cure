const DataBaseError = require('../src/errors/DataBaseError');

test('should create a DataBaseError instance', () => {
  const error = new DataBaseError('Database connection failed', 500);
  expect(error.message).toBe('Database connection failed');
  expect(error.statusCode).toBe(500);
  expect(error.status).toBe('error');
  expect(error.isOperational).toBe(true);
});