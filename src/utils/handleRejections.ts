import logError from './logError';

const handleUnhandledRejections = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logError(new Error(`Unhandled Rejection at: ${promise}, reason: ${reason}`));
    process.exit(1); 
  });

  process.on('uncaughtException', (err) => {
    logError(new Error(`Uncaught Exception: ${err.message}`));
    process.exit(1); // Exit process after logging the uncaught exception
  });
};

export default handleUnhandledRejections;
