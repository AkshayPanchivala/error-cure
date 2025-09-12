import * as fs from 'fs';
import * as path from 'path';

const logError = (error: Error) => {
  const logDir = path.join(__dirname, '../../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const logPath = path.join(logDir, 'error.log');
  const logMessage = `[${new Date().toISOString()}] ${error.stack || error.message}\n`;

  fs.appendFile(logPath, logMessage, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
  console.error(error);

};

export default logError;
