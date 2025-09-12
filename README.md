# 🚀 Error-Cure: The Ultimate Error Handling Solution for Node.js & Express

[![NPM Version](https://img.shields.io/npm/v/error-cure.svg)](https://www.npmjs.com/package/error-cure)
[![NPM Downloads](https://img.shields.io/npm/dm/error-cure.svg)](https://www.npmjs.com/package/error-cure)
[![License](https://img.shields.io/npm/l/error-cure.svg)](https://github.com/AkshayPanchivala/error-cure/blob/main/LICENSE.txt)
[![Build Status](https://github.com/AkshayPanchivala/error-cure/workflows/test_on_pr_merge/badge.svg)](https://github.com/AkshayPanchivala/error-cure/actions)
[![Coverage Status](https://coveralls.io/repos/github/AkshayPanchivala/error-cure/badge.svg?branch=main)](https://coveralls.io/github/AkshayPanchivala/error-cure?branch=main)

**Tired of messy error handling, inconsistent API responses, and fragile Node.js applications? `Error-Cure` is your one-stop solution for building robust, production-ready, and developer-friendly APIs with Express.**

`Error-Cure` provides a comprehensive suite of tools to streamline your error handling workflow, from custom error classes to a powerful global middleware. It's designed to be lightweight, easy to use, and highly configurable, allowing you to focus on what matters most: building great applications.

## 🤔 Why Error-Cure?

| Feature                  | Benefit                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| **Centralized Handling** | Manage all errors in one place, ensuring consistent and predictable API responses.                  |
| **Improved Debugging**   | Differentiate between operational errors (user-facing) and programming errors (internal bugs).      |
| **Enhanced User Experience** | Provide clear, meaningful error messages to your users without exposing sensitive stack traces. |
| **Increased Stability**  | Gracefully handle unhandled promise rejections and uncaught exceptions to prevent crashes.          |
| **Accelerated Development** | Reduce boilerplate code and focus on your core application logic.                                   |
| **TypeScript & JS Support** | Seamlessly integrate with both TypeScript and JavaScript projects (CommonJS & ESM).               |

## ✨ Features

-   **🔪 Custom Error Classes:** A set of pre-built, extensible error classes for common scenarios:
    -   `AppError`: The base class for all operational errors.
    -   `ValidationError`: For input validation failures (400).
    -   `AuthError`: For authentication/authorization issues (401).
    -   `NotFoundError`: For missing resources (404).
    -   `DatabaseError`: For database-related failures (500).
-   **🛡️ Global Error Middleware:** A powerful Express middleware that catches all errors and sends beautiful, environment-aware responses.
-   **📝 Error Logging:** A simple yet effective utility to log errors to a file for easy debugging and monitoring.
-   **🚨 Unhandled Rejection/Exception Handling:** Automatically catches and logs unhandled promise rejections and uncaught exceptions.
-   **✅ TypeScript Ready:** Written entirely in TypeScript with type definitions included.
-   **📦 Dual Module Support:** Supports both CommonJS (`require`) and ES Modules (`import`).

## 📦 Installation

```bash
# Using npm
npm install error-cure

# Using yarn
yarn add error-cure
```

## 📂 Project Structure

```
error-cure/
├── dist/
│   ├── cjs/                # CommonJS output
│   └── esm/                # ES Module output
├── src/
│   ├── index.ts            # Main entry point
│   ├── errors/
│   │   ├── AppError.ts
│   │   ├── AuthError.ts
│   │   ├── DataBaseError.ts
│   │   ├── NotFoundError.ts
│   │   └── ValidationError.ts
│   ├── middleware/
│   │   └── globalErrorHandler.ts
│   └── utils/
│       ├── handleRejections.ts
│       └── logError.ts
├── tests/
└── ...
```

## 💡 Usage

`Error-Cure` is designed to be intuitive and easy to integrate. Here’s how you can use it in your projects:

### ES Modules (`import`/`export`)

```typescript
// app.ts
import express from 'express';
import { AppError, globalErrorHandler, handleUnhandledRejections } from 'error-cure';

// Handle unhandled rejections and exceptions
handleUnhandledRejections();

const app = express();

app.get('/users/:id', (req, res, next) => {
  if (req.params.id === '0') {
    return next(new AppError('Invalid user ID.', 400));
  }
  res.json({ id: req.params.id, name: 'John Doe' });
});

// Handle 404 errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
```

### CommonJS (`require`/`module.exports`)

```javascript
// server.js
const express = require('express');
const { AppError, globalErrorHandler, handleUnhandledRejections } = require('error-cure');

// Handle unhandled rejections and exceptions
handleUnhandledRejections();

const app = express();

app.get('/users/:id', (req, res, next) => {
  if (req.params.id === '0') {
    return next(new AppError('Invalid user ID.', 400));
  }
  res.json({ id: req.params.id, name: 'John Doe' });
});

// Handle 404 errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
```

## ⚙️ Configuration

The `globalErrorHandler` automatically adapts its response based on the `NODE_ENV` environment variable:

-   **`development`:** Provides detailed error information, including stack traces.
-   **`production`:** Sends minimal, user-friendly error messages.

**Always set `NODE_ENV=production` in your production environment.**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes and add tests.
4.  Ensure all tests pass (`npm test`).
5.  Commit your changes (`git commit -m 'feat: Add some feature'`).
6.  Push to the branch (`git push origin feature/your-feature`).
7.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.txt](LICENSE.txt) file for details.

## 🔑 Keywords

`error-handling`, `express`, `node.js`, `middleware`, `error-management`, `custom-errors`, `api-errors`, `unhandled-rejection`, `uncaught-exception`, `logging`, `typescript`, `javascript`, `commonjs`, `esm`, `express-middleware`, `nodejs`, `error-logger`, `production-ready`, `developer-tools`, `api`, `backend`, `rest-api`, `error-response`, `json-errors`