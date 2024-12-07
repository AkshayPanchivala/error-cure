const fs = require('fs');
const path = require('path');

const logError = (error) => {
  const logPath = path.join(__dirname, '../../error.log');
  const logMessage = `[${new Date().toISOString()}] ${error.stack || error.message}\n`;

  fs.appendFile(logPath, logMessage, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });

  console.error(error);
};

module.exports = logError;
