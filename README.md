# Error-Cure

**Error-Cure** is a robust library for handling errors in Node.js and Express applications. It simplifies error management by providing custom error classes, middleware for centralized error handling, and utilities for logging errors and managing unhandled exceptions.

---

## Features

- **Custom Error Classes**: Includes `AppError`, `ValidationError`, `AuthError`, and more to cover diverse use cases.
- **Global Error Handler Middleware**: Simplifies error handling in Express.js applications.
- **Error Logging Utilities**: Write errors to log files for better debugging and analysis.
- **Unhandled Exception Management**: Tools to handle unhandled promise rejections and uncaught exceptions.
- **Lightweight & Extendable**: Easy to integrate and customize for your application.

---

## Installation

To get started, install the package using npm or yarn:

```bash
npm install error-cure
```

or

```bash
yarn add error-cure
```

---

## Usage

### 1. Custom Error Classes

Error-Cure includes several custom error classes that extend a base `AppError` class. These can classify and handle different types of errors efficiently.

#### Example: AppError

The `AppError` class is the base for all errors in the package. It accepts a message, status code, and optional details.

```javascript
const { AppError } = require('error-cure');

const error = new AppError('Something went wrong', 500);
console.log(error.message); // "Something went wrong"
console.log(error.statusCode); // 500
console.log(error.status); // "error"
```

#### Example: ValidationError

The `ValidationError` class tracks validation-specific errors.

```javascript
const { ValidationError } = require('error-cure');

const error = new ValidationError('Invalid input', 'email', { expected: 'email format' });
console.log(error.message); // "Invalid input"
console.log(error.field); // "email"
console.log(error.details); // { expected: 'email format' }
```

#### Example: AuthError

The `AuthError` class handles authentication-related errors.

```javascript
const { AuthError } = require('error-cure');

const error = new AuthError('Authentication failed');
console.log(error.message); // "Authentication failed"
console.log(error.statusCode); // 401
```

#### Example: DatabaseError

The `DatabaseError` class handles database-related errors and accepts an optional query string.

```javascript
const { DatabaseError } = require('error-cure');

const error = new DatabaseError('Database connection failed', 'SELECT * FROM users');
console.log(error.message); // "Database connection failed"
console.log(error.query); // "SELECT * FROM users"
```

---

### 2. Global Error Handler Middleware

The global error handler middleware is designed for Express.js applications. It formats errors and sends appropriate responses.

#### Example: Express Integration

In your `app.js` or `server.js` file:

```javascript
const express = require('express');
const { globalErrorHandler } = require('error-cure');

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

The middleware formats and returns the error response based on whether it’s operational or not.

---

### 3. Error Logging Utility

The logging utility writes errors to a log file for debugging.

#### Example: Logging Errors

```javascript
const { logError } = require('error-cure');

try {
  throw new Error('Something bad happened');
} catch (err) {
  logError(err);
}
```

This will append the error to an `error.log` file in the project root directory.

---

### 4. Handle Unhandled Rejections & Exceptions

Error-Cure provides utilities to handle unhandled promise rejections and uncaught exceptions globally.

#### Example: Handling Unhandled Rejections

In your `index.js` or `app.js` file:

```javascript
const { handleUnhandledRejections } = require('error-cure');

// Automatically handle unhandled promise rejections
handleUnhandledRejections();
```

This ensures that unhandled promise rejections are logged and processed correctly.

---

## Testing

To ensure the package works as expected, run tests using the following command:

```bash
npm test
```

#### Running Tests with Jest

If you have Jest configured, run:

```bash
npx jest
```

Write tests for each error class and utility to maintain robustness.

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Clone your fork.
3. Create a new branch for your feature or bug fix.
4. Commit your changes and push the branch.
5. Submit a pull request.

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

Error-Cure is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Keywords

Node.js, Express, error handling, middleware, error classes, global error handling, logging, unhandled exceptions, validation errors, authentication errors.

---

## Links

- [GitHub Repository](https://github.com/AkshayPanchivala/error-cure)

---

Simplify and strengthen error handling in your Node.js and Express applications with **Error-Cure**. Get started today!

