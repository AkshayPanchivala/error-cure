
# Error-Catcher-Strong

**Error-Catcher-Strong** is a comprehensive error-catcher-strong library for Node.js and Express applications. It provides custom error classes, middleware for centralized error handling, and utilities for logging errors and managing unhandled exceptions.

## Features

- Custom error classes like `AppError`, `ValidationError`, `AuthError`, etc.
- Global error handler middleware for Express.js.
- Utilities for logging errors to files and handling unhandled exceptions.
- Lightweight, easy to integrate, and extendable.

## Installation

To install the package, use npm:

```bash
npm install error-catcher-strong
```

## Usage

### 1. **Custom Error Classes**

The package includes several custom error classes that extend a base `AppError` class. These errors can be used to classify different types of errors in your application.

#### Example: `AppError`

The `AppError` class is the base class for all errors in the package. It takes a message, status code, and optional details.

```javascript
const { AppError } = require('error-catcher-strong');

const error = new AppError('Something went wrong', 500);
console.log(error.message); // "Something went wrong"
console.log(error.statusCode); // 500
console.log(error.status); // "error"
```

#### Example: `ValidationError`

The `ValidationError` class extends `AppError` and adds a `field` property for tracking validation-specific errors.

```javascript
const { ValidationError } = require('error-catcher-strong');

const error = new ValidationError('Invalid input', 'email', { expected: 'email format' });
console.log(error.message); // "Invalid input"
console.log(error.field); // "email"
console.log(error.details); // { expected: 'email format' }
```

#### Example: `AuthError`

The `AuthError` class extends `AppError` and is used for authentication-related errors.

```javascript
const { AuthError } = require('error-catcher-strong');

const error = new AuthError('Authentication failed');
console.log(error.message); // "Authentication failed"
console.log(error.statusCode); // 401
```

#### Example: `DatabaseError`

The `DatabaseError` class is used for database-related errors and accepts an optional `query` string.

```javascript
const { DatabaseError } = require('error-catcher-strong');

const error = new DatabaseError('Database connection failed', 'SELECT * FROM users');
console.log(error.message); // "Database connection failed"
console.log(error.query); // "SELECT * FROM users"
```

### 2. **Global Error Handler Middleware**

This middleware is designed for use with Express.js. It catches all errors and sends a formatted response.

#### Example: Express Integration

In your `app.js` or `server.js`, import the middleware and use it in your Express app:

```javascript
const express = require('express');
const { globalErrorHandler } = require('error-catcher-strong');

const app = express();

// Example route that throws an error
app.get('/', (req, res, next) => {
  const error = new Error('Something went wrong!');
  error.statusCode = 500;
  next(error);
});

// Global error handling middleware
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

The middleware will format and return the error response, based on whether it's operational or not.

### 3. **Error Logging Utility**

The logging utility writes errors to a log file. You can use it to log critical errors.

#### Example: Logging Errors

```javascript
const { logError } = require('error-catcher-strong');

try {
  throw new Error('Something bad happened');
} catch (err) {
  logError(err);
}
```

This will append the error to a `error.log` file in the project root directory.

### 4. **Handle Unhandled Rejections & Exceptions**

The package also includes utilities to handle unhandled promise rejections and uncaught exceptions globally.

#### Example: Handling Unhandled Rejections

In your `index.js` or `app.js`, add the following:

```javascript
const { handleUnhandledRejections } = require('Error-Catcher-Strong');

// Automatically handles unhandled promise rejections
handleUnhandledRejections();
```

This will ensure that unhandled promise rejections are logged and processed.

---

## Testing

To ensure that the package is working as expected, use the following command to run the tests:

```bash
npm test
```

### Running Tests with Jest

If you have **Jest** configured, run the following command to test the package:

```bash
npx jest
```

Make sure to write tests for each error class and utility to ensure everything functions correctly.

---

## Contributing

Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

---

## License

This package is licensed under the [MIT License](LICENSE).

---
