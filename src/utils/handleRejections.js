const logError = require('./logError');

const handleUnhandledRejections = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    process.exit(1); 
  });

  process.on('uncaughtException', (err) => {
    logError(`Uncaught Exception: ${err.message}`);
    process.exit(1); // Exit process after logging the uncaught exception
  });
};

module.exports = handleUnhandledRejections;
