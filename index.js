const axios = require('axios');
const http = require('http');
const cron = require('node-cron');
const moment = require('moment-timezone');
require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT || 7860;
const timezone = process.env.Timezone // Default to Asia/Ho_Chi_Minh if not set

// Array of URLs for 24-hour access
const urls = [
  'https://www.google.com',
  // Add more URLs for continuous 24-hour access
];

// Array of URLs for scheduled access
const websites = [
  'https://www.google.com',
  // Add more URLs for scheduled access
];

// Function to visit websites
const visitWebsites = async () => {
  for (const url of websites) {
    try {
      const response = await axios.get(url);
      console.log(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')} Successfully visited: ${url} - Status code: ${response.status}`);
    } catch (error) {
      console.error(`Error visiting ${url}: ${error.message}`);
    }
  }
};

// Check and set timer
const checkAndSetTimer = () => {
  const currentMoment = moment().tz(timezone);
  if (currentMoment.hours() >= 0 && currentMoment.hours() < 6) {
    console.log(`Stopping access from 00:00 to 06:00 --- ${currentMoment.format('YYYY-MM-DD HH:mm:ss')}`);
    clearInterval(visitIntervalId);
    const nextVisitTime = currentMoment.clone().hours(6).minutes(0).seconds(0);
    const nextVisitInterval = nextVisitTime.diff(currentMoment);
    setTimeout(startVisits, nextVisitInterval);
  } else {
    startVisits();
  }
};

let visitIntervalId;
const visitIntervalTime = 3 * 60 * 1000; // Time interval for visiting websites (3 minutes)

const startVisits = () => {
  clearInterval(visitIntervalId);
  visitIntervalId = setInterval(visitWebsites, visitIntervalTime); // Perform access every 3 minutes
};

const runScript = () => {
  // Check every 3 minutes
  setInterval(checkAndSetTimer, visitIntervalTime);
};

// Continuous 24-hour access
const scrapeAndLog = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')} Successfully visited: ${url} - Status code: ${response.status}`);
  } catch (error) {
    console.error(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')}: Error visiting web: ${url}: ${error.message}`);
  }
};

// Access every 2 minutes
cron.schedule('*/2 * * * *', () => {
  console.log('Performing website access...');
  urls.forEach(scrapeAndLog);
});

// Create HTTP service
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Start the script
checkAndSetTimer();
runScript();