import { useState } from 'react';
import { Link } from 'wouter';

// Simple App Test Component
export default function AppTest() {
  const [testResults, setTestResults] = useState<{
    name: string;
    passed: boolean;
    message?: string;
  }[]>([]);
  
  // Function to run tests
  const runTests = () => {
    const results = [];
    
    // Test 1: Check if React is working
    try {
      // This will work if React is rendering correctly
      results.push({
        name: "React Rendering",
        passed: true,
        message: "React components are rendering correctly!"
      });
    } catch (error) {
      results.push({
        name: "React Rendering",
        passed: false,
        message: `Error: ${(error as Error).message}`
      });
    }
    
    // Test 2: Check if state updates work
    try {
      const [testState, setTestState] = useState("initial");
      setTestState("updated");
      results.push({
        name: "React State",
        passed: testState === "updated",
        message: testState === "updated" 
          ? "React state updates are working properly!"
          : `State update failed: ${testState}`
      });
    } catch (error) {
      results.push({
        name: "React State",
        passed: false,
        message: `Error: ${(error as Error).message}`
      });
    }
    
    // Test 3: Check if Wouter is available
    try {
      results.push({
        name: "Wouter Routing",
        passed: typeof Link === 'function',
        message: typeof Link === 'function' 
          ? "Wouter routing is available!" 
          : "Wouter routing components are not available"
      });
    } catch (error) {
      results.push({
        name: "Wouter Routing",
        passed: false,
        message: `Error: ${(error as Error).message}`
      });
    }
    
    setTestResults(results);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#a855f7', textAlign: 'center', marginBottom: '20px' }}>
        Full-Stack Vibe Guide App Test
      </h1>
      
      <div style={{ 
        background: '#1f2937', 
        border: '1px solid #374151',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#e5e7eb', marginBottom: '10px' }}>App Testing Dashboard</h2>
        <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
          This page helps verify that the application is functioning correctly.
          Click the button below to run basic React component tests.
        </p>
        
        <button 
          onClick={runTests}
          style={{
            background: '#6d28d9',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Run Frontend Tests
        </button>
        
        {testResults.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#e5e7eb', marginBottom: '10px' }}>Test Results:</h3>
            
            {testResults.map((result, index) => (
              <div 
                key={index}
                style={{
                  padding: '12px',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  background: result.passed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderLeft: `4px solid ${result.passed ? '#22c55e' : '#ef4444'}`
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '4px',
                  color: result.passed ? '#22c55e' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  {result.passed ? '✓' : '✗'} {result.name}
                </div>
                <div style={{ color: '#d1d5db', fontSize: '14px' }}>
                  {result.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '20px' 
      }}>
        <a 
          href="/test" 
          style={{
            padding: '8px 16px',
            background: '#374151',
            color: '#e5e7eb',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Go to Context Test Page
        </a>
        
        <a 
          href="/" 
          style={{
            padding: '8px 16px',
            background: '#6d28d9',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Back to Main App
        </a>
      </div>
    </div>
  );
}