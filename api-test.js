// API Test Script
const fetch = require('node-fetch');

async function testApi() {
  console.log('Testing API endpoints...');
  
  // Test the test endpoint
  try {
    console.log('\n1. Testing /api/test endpoint:');
    const testResponse = await fetch('http://localhost:5000/api/test');
    const testData = await testResponse.json();
    console.log('Response status:', testResponse.status);
    console.log('Response data:', testData);
  } catch (error) {
    console.error('Error testing /api/test:', error.message);
  }
  
  // Test getting tech stacks
  try {
    console.log('\n2. Testing /api/tech-stacks endpoint:');
    const techStacksResponse = await fetch('http://localhost:5000/api/tech-stacks');
    const techStacksData = await techStacksResponse.json();
    console.log('Response status:', techStacksResponse.status);
    console.log('Number of tech stacks:', Array.isArray(techStacksData) ? techStacksData.length : 'Not an array');
    if (Array.isArray(techStacksData) && techStacksData.length > 0) {
      console.log('First tech stack:', techStacksData[0]);
    }
  } catch (error) {
    console.error('Error testing /api/tech-stacks:', error.message);
  }
  
  // Test generating commands
  try {
    console.log('\n3. Testing /api/generate-commands endpoint:');
    const commandsResponse = await fetch('http://localhost:5000/api/generate-commands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        frontend: 'react',
        backend: 'express',
        database: 'mongodb'
      })
    });
    const commandsData = await commandsResponse.json();
    console.log('Response status:', commandsResponse.status);
    console.log('Commands generated:', commandsData);
  } catch (error) {
    console.error('Error testing /api/generate-commands:', error.message);
  }
}

// Execute tests
testApi().then(() => {
  console.log('\nAPI Testing completed!');
}).catch(error => {
  console.error('Error during API testing:', error);
});