import { useState, useEffect } from 'react';
import { WizardProvider, useWizard } from "@/context/WizardContext";

// Test component that uses the WizardContext
function TestWizardConsumer() {
  const { projectConfig, updateProjectConfig } = useWizard();
  const [testState, setTestState] = useState("Initial state");

  useEffect(() => {
    console.log("Test component mounted with projectConfig:", projectConfig);
    
    // Test updating the wizard context
    setTimeout(() => {
      updateProjectConfig({ 
        name: "Test Project", 
        appType: "web" 
      });
      setTestState("State updated after 1 second");
      console.log("Updated projectConfig with test data");
    }, 1000);
  }, []);

  return (
    <div style={{ padding: '20px', border: '2px solid green', margin: '20px' }}>
      <h2>Wizard Context Test Component</h2>
      <p>Test State: {testState}</p>
      <p>Project Name: {projectConfig.name || "Not set"}</p>
      <p>App Type: {projectConfig.appType || "Not selected"}</p>
      <div>
        <button 
          onClick={() => updateProjectConfig({ name: "Updated Test Name" })}
          style={{ padding: '8px 16px', background: '#6b21a8', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Update Name
        </button>
      </div>
    </div>
  );
}

// Test wrapper with WizardProvider
export default function TestComponent() {
  return (
    <div style={{ padding: '20px', border: '2px solid blue', margin: '20px' }}>
      <h1>WizardContext Provider Test</h1>
      <p>This component tests if the WizardProvider and context are working correctly</p>
      
      <WizardProvider>
        <TestWizardConsumer />
      </WizardProvider>
    </div>
  );
}