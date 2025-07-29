# Error-Cure: Advanced Error Handling for Node.js & Express

[![NPM Version](https://img.shields.io/npm/v/error-cure.svg)](https://www.npmjs.com/package/error-cure)
[![NPM Downloads](https://img.shields.io/npm/dm/error-cure.svg)](https://www.npmjs.com/package/error-cure)
[![License](https://img.shields.io/npm/l/error-cure.svg)](https://github.com/AkshayPanchivala/error-cure/blob/main/LICENSE.txt)

## 🚀 Project Description & Value Proposition

`Error-Cure` is a robust and comprehensive Node.js package designed to streamline and standardize error handling in your Express.js applications. Say goodbye to inconsistent error responses, unhandled exceptions, and difficult-to-debug issues. `Error-Cure` provides a suite of custom error classes, a powerful global error-handling middleware, and utilities for logging and managing unhandled promise rejections, ensuring your applications are resilient, maintainable, and user-friendly.

With `Error-Cure`, you can:
- **Centralize Error Management:** Handle all application errors in one place, ensuring consistent responses.
- **Improve Debuggability:** Differentiate between operational errors (e.g., invalid input) and programming errors (e.g., bugs).
- **Enhance User Experience:** Provide clear, meaningful error messages to your API consumers without exposing sensitive details.
- **Increase Application Stability:** Gracefully manage unhandled promise rejections and uncaught exceptions, preventing application crashes.
- **Accelerate Development:** Reduce boilerplate code for error handling, allowing you to focus on core business logic.

## ✨ Features

-   **Custom Error Classes:**
    -   `AppError`: Base class for all operational errors, allowing custom messages, status codes, and details.
    -   `ValidationError`: Specifically for input validation failures (HTTP 400).
    -   `AuthError`: For authentication and authorization issues (HTTP 401).
    -   `NotFoundError`: For resources not found (HTTP 404).
    -   `DatabaseError`: For database-related operation failures (HTTP 500).
-   **Global Express Error Handling Middleware:** Catches all errors in your Express application and sends appropriate, environment-aware responses.
-   **Error Logging Utility (`logError`):** A simple utility to log errors to a file, aiding in debugging and monitoring.
-   **Unhandled Rejection Management:** Automatically handles `unhandledRejection` and `uncaughtException` events, logging them and gracefully shutting down the process.

## 📦 Installation

Install `Error-Cure` in your project using either npm or yarn:

**Using npm:**
```bash
npm install error-cure
```

**Using yarn:**
```bash
yarn add error-cure
```

## 📂 Directory Structure Overview

```
error-cure/
├── src/
│   ├── index.js             # Main entry point (exports all modules)
│   ├── errors/
│   │   ├── AppError.js      # Base custom error class
│   │   ├── AuthError.js     # Authentication specific error
│   │   ├── DataBaseError.js # Database specific error
│   │   ├── NotFoundError.js # Resource not found error
│   │   └── ValidationError.js # Validation specific error
│   ├── middleware/
│   │   └── globalErrorHandler.js # Express global error handling middleware
│   └── utils/
│       ├── handleRejections.js # Utility for unhandled promise rejections
│       └── logError.js      # Utility for logging errors
└── ...
```

## 💡 Usage Examples

### 1. Custom Error Classes

Import the error classes you need:

```javascript
const {
  AppError,
  ValidationError,
  AuthError,
  NotFoundError,
  DatabaseError,
} = require('error-cure');
```

#### `AppError` (Base Operational Error)

Use `AppError` for general operational errors with custom messages and status codes.

```javascript
// Example: Custom error with a specific status code and details
throw new AppError('Invalid API key provided', 403, {
  errorCode: 'API_KEY_INVALID',
  suggestedAction: 'Check your API key and try again.',
});

// Example: Generic server error
throw new AppError('Something went wrong on our server.', 500);
```

#### `ValidationError`

Use `ValidationError` for input validation failures. It includes a `field` property for more specific error reporting.

```javascript
// Example: Missing required field
throw new ValidationError('Name is required', 'name');

// Example: Invalid email format with additional details
throw new ValidationError('Invalid email format', 'email', {
  reason: 'Email must contain @ and .',
  receivedValue: 'invalid-email',
});
```

#### `AuthError`

Use `AuthError` for authentication or authorization issues. Defaults to a 401 status code.

```javascript
// Example: User not logged in
throw new AuthError('You are not logged in! Please log in to get access.');

// Example: Invalid credentials
throw new AuthError('Incorrect email or password.');
```

#### `NotFoundError`

Use `NotFoundError` when a requested resource cannot be found.

```javascript
// Example: User not found
throw new NotFoundError('User'); // Message will be "User not found"

// Example: Product with specific ID not found
throw new NotFoundError('Product with ID 123'); // Message will be "Product with ID 123 not found"
```

#### `DatabaseError`

Use `DatabaseError` for issues related to database operations.

```javascript
// Example: Database connection failed
throw new DatabaseError('Failed to connect to the database.', 'CONNECT_DB');

// Example: Invalid SQL query
throw new DatabaseError('Invalid SQL query.', 'SELECT * FROM users WHERE id = "abc"');
```

### 2. Global Express Error Handling Middleware

Integrate `globalErrorHandler` into your Express application. It should be the **last** middleware added.

```javascript
const express = require('express');
const { AppError } = require('error-cure');
const globalErrorHandler = require('error-cure/src/middleware/globalErrorHandler'); // Adjust path if needed

const app = express();

// Example route that throws an AppError
app.get('/api/v1/users/:id', (req, res, next) => {
  if (req.params.id === 'invalid') {
    return next(new AppError('User ID is invalid.', 400));
  }
  res.status(200).json({
    status: 'success',
    data: { user: { id: req.params.id, name: 'John Doe' } },
  });
});

// Example route that throws a generic error (caught by global handler)
app.get('/api/v1/products', (req, res, next) => {
  // Simulate a programming error
  const data = undefined.property; // This will throw a TypeError
  res.json(data);
});

// Handle all unhandled routes (404)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER - MUST BE LAST MIDDLEWARE
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Error Logging Utility (`logError`)

The `logError` utility writes error details to a file named `error.log` in the `logs` directory at your project root. It's automatically used by `globalErrorHandler` and `handleUnhandledRejections`. You can also use it directly.

```javascript
const { logError } = require('error-cure/src/utils/logError'); // Adjust path if needed

try {
  // Some risky operation
  throw new Error('This is a custom error to be logged.');
} catch (err) {
  logError(err);
  // You might also send a response or perform other actions
}
```

### 4. Unhandled Rejection and Uncaught Exception Handling

It's crucial to handle unhandled promise rejections and uncaught exceptions to prevent your Node.js process from crashing. `Error-Cure` provides a utility for this. Call `handleUnhandledRejections()` once, typically at the very beginning of your `server.js` or `app.js` file.

```javascript
const handleUnhandledRejections = require('error-cure/src/utils/handleRejections'); // Adjust path if needed

// Call this function at the very top of your main application file
handleUnhandledRejections();

// Your application code follows...
const app = require('./app'); // Assuming your Express app is in app.js
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Example of an unhandled promise rejection
process.nextTick(() => {
  Promise.reject(new Error('Something went very wrong! (Unhandled Rejection)'));
});

// Example of an uncaught exception
process.nextTick(() => {
  throw new Error('This is an uncaught exception!');
});
```

## ⚙️ Best Practices: Production vs. Development

The `globalErrorHandler` automatically adapts its response based on the `NODE_ENV` environment variable:

-   **Development (`NODE_ENV=development`):** Provides detailed error information, including stack traces, to aid in debugging.
-   **Production (`NODE_ENV=production`):** Sends minimal, user-friendly error messages to prevent leaking sensitive internal details. Programming errors will result in a generic "An unexpected error occurred!" message.

**Always set `NODE_ENV` appropriately in your deployment environment.**

## 🤝 Contributing

We welcome contributions to `Error-Cure`! To contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Clone your forked repository:**
    ```bash
    git clone https://github.com/AkshayPanchivala/error-cure.git
    cd error-cure
    ```
3.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
    or
    ```bash
    git checkout -b bugfix/issue-description
    ```
4.  **Make your changes.**
5.  **Write tests** for your changes (if applicable) and ensure all existing tests pass.
6.  **Run linting and formatting checks.**
7.  **Commit your changes** with a clear and concise commit message.
8.  **Push your branch** to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
9.  **Open a Pull Request** to the `main` branch of the original `error-cure` repository.

Please ensure your code adheres to the existing style and conventions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.github.com/AkshayPanchivala/error-cure/blob/main/LICENSE.txt) file for details.

## 🔑 Keywords 

`error-handling`, `express-middleware`, `node.js`, `error-management`, `custom-errors`, `api-errors`, `unhandled-rejection`, `uncaught-exception`, `logging`, `middleware`, `express`, `api`, `backend`, `javascript`, `nodejs`, `error-logger`, `production-ready`, `developer-tools`