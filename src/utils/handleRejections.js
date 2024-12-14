const logError = require('./logError');

// Define a function to handle unhandled rejections
const handleUnhandledRejections = () => {
  process.on('unhandledRejection', (reason) => {
    logError(`Unhandled Rejection: ${reason}`);
  });

  process.on('uncaughtException', (err) => {
    logError(`Uncaught Exception: ${err.message}`);
    process.exit(1); // Exit process after logging
  });
};

// Export the function for external use
module.exports = {
  handleUnhandledRejections,
};