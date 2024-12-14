// handleRejections.js (utils)

const logError = (message) => {
  // Optionally, replace this with a logger library like Winston
  console.error(message);
};

const handleUnhandledRejections = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    // Optionally, terminate the process (useful in production)
    process.exit(1); 
  });

  process.on('uncaughtException', (err) => {
    logError(`Uncaught Exception: ${err.message}`);
    process.exit(1); // Exit process after logging the uncaught exception
  });
};

module.exports = handleUnhandledRejections;
