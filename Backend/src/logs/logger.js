const fs = require('fs');
const path = require('path');

// Function to log a message to a text file
function log(message) {
  const logFilePath = path.join(__dirname, 'log.txt');
  const timestamp = new Date().toLocaleString();

  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to the log file:', err);
    }
    // else 
    // {
    //   console.log('Log entry added:', logEntry);
    // }
  });
}

module.exports = log;