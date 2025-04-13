// Test script to check page access and server status
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';

// Pages to test
const TEST_PAGES = [
  '/',               // Main wizard page
  '/test',           // Context test page
  '/app-test',       // App test page
  '/frontend',       // Frontend selection page
  '/api/test'        // API test endpoint
];

async function testPages() {
  console.log('Testing page access at', BASE_URL);
  console.log('----------------------------');

  for (const page of TEST_PAGES) {
    try {
      const url = `${BASE_URL}${page}`;
      console.log(`Testing ${url}...`);
      const response = await fetch(url);
      const isApi = page.startsWith('/api');
      
      console.log(`Status: ${response.status} ${response.statusText}`);
      console.log(`Content-Type: ${response.headers.get('content-type')}`);
      
      if (isApi) {
        // For API endpoints, show the JSON response
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));
      } else {
        // For HTML pages, just show if we got HTML and its size
        const text = await response.text();
        console.log(`Content length: ${text.length} bytes`);
        console.log(`Contains <!DOCTYPE html>: ${text.includes('<!DOCTYPE html>')}`);
        console.log(`Contains <div id="root">: ${text.includes('<div id="root">')}`);
      }
    } catch (error) {
      console.error(`Error accessing ${page}:`, error.message);
    }
    
    console.log('----------------------------');
  }
}

// Run the tests
testPages().then(() => {
  console.log('Page testing completed!');
}).catch(error => {
  console.error('Error in test execution:', error);
});