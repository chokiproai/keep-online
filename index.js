const puppeteer = require('puppeteer');
const axios = require('axios');
const http = require('http');
const cron = require('node-cron');
const moment = require('moment-timezone');
require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT || 7860;
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

// Function to get dynamic headers and cookies using Puppeteer
const getDynamicHeaders = async (url) => {
  const browser = await puppeteer.launch({ headless: true }); // Launch Puppeteer in headless mode
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract headers
  const headers = {
    'User-Agent': await page.evaluate(() => navigator.userAgent),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
  };

  // Extract cookies
  const cookies = await page.cookies();
  const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

  headers['Cookie'] = cookieString;

  await browser.close();
  return headers;
};

// Function to visit websites with dynamic headers
const visitWebsites = async () => {
  for (const url of websites) {
    try {
      // Get dynamic headers
      const headers = await getDynamicHeaders(url);

      // Make the HTTP request using axios
      const response = await axios.get(url, {
        headers: headers,
        withCredentials: true,
      });
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
cron.schedule('*/2 * * * *', async () => {
  console.log('Performing website access...');
  for (const url of urls) {
    try {
      const headers = await getDynamicHeaders(url);
      const response = await axios.get(url, { headers, withCredentials: true });
      console.log(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')} Successfully visited: ${url} - Status code: ${response.status}`);
    } catch (error) {
      console.error(`${moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')}: Error visiting web: ${url}: ${error.message}`);
    }
  }
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
