// Simple server test script
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Server response status code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Server is running and responding.');
    if (data.length < 1000) {
      console.log('Response data preview:', data.substring(0, 200));
    } else {
      console.log('Response received (data too large to display)');
    }
  });
});

req.on('error', (error) => {
  console.error('Server test failed with error:', error.message);
});

req.end();

console.log('Testing server connection at http://localhost:5000/');