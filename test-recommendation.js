import { storage } from './server/storage.js';

async function testRecommendationEngine() {
  try {
    console.log('Testing the recommendation engine...');
    
    // Test frontend recommendations
    const frontendRecommendations = await storage.getRecommendedFrontend("web");
    console.log('Frontend recommendations for web apps:', frontendRecommendations.map(tech => tech.name));
    
    // Test backend recommendations with frontend context
    const backendRecommendations = await storage.getRecommendedBackend("fullstack", "react");
    console.log('Backend recommendations for fullstack apps with React:', backendRecommendations.map(tech => tech.name));
    
    // Test database recommendations with backend context
    const databaseRecommendations = await storage.getRecommendedDatabase("web", "nodejs");
    console.log('Database recommendations for web apps with Node.js:', databaseRecommendations.map(tech => tech.name));
    
    // Test context-aware recommendations
    const contextAwareRecommendations = await storage.getTechWithContext("database", {
      appType: "web",
      frontend: "react",
      backend: "nodejs"
    });
    console.log('Context-aware database recommendations:', contextAwareRecommendations.map(tech => tech.name));
    
    console.log('Recommendation engine testing completed successfully!');
  } catch (error) {
    console.error('Error testing recommendation engine:', error);
  }
}

testRecommendationEngine();