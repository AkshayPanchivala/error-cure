const logError = require('./logError');

process.on('unhandledRejection', (reason) => {
  logError(`Unhandled Rejection: ${reason}`);
});

process.on('uncaughtException', (err) => {
  logError(`Uncaught Exception: ${err.message}`);
  process.exit(1); // Exit process after logging
});
