const axios = require('axios');
const http = require('http');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');
require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT;
const timezone = process.env.Timezone

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

// Initialize axios with cookie support
const cookieJar = new CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

// Function to visit websites with dynamic headers and cookies
const visitWebsites = async () => {
  for (const url of websites) {
    try {
      const response = await client.get(url);
      const headers = response.headers;
      const cookies = cookieJar.getCookiesSync(url);
      console.log(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')} Successfully visited: ${url} - Status code: ${response.status}`);
      console.log(`Headers:`, headers);
      console.log(`Cookies:`, cookies);
    } catch (error) {
      console.error(`Error visiting ${url}: ${error.message}`);
    }
  }
};

// Function to scrape and log with dynamic headers and cookies
const scrapeAndLog = async (url) => {
  try {
    const response = await client.get(url);
    const headers = response.headers;
    const cookies = cookieJar.getCookiesSync(url);
    console.log(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')} Successfully visited: ${url} - Status code: ${response.status}`);
    console.log(`Headers:`, headers);
    console.log(`Cookies:`, cookies);
  } catch (error) {
    console.error(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')}: Error visiting web: ${url}: ${error.message}`);
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
cron.schedule('*/2 * * * *', () => {
  console.log('Performing website access...');
  urls.forEach(scrapeAndLog);
});

// Create HTTP service
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Keep Online! - github.com/chokiproai/keep-online\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found! - github.com/chokiproai/keep-online\n');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Start the script
checkAndSetTimer();
runScript();
