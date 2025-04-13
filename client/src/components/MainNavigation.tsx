import { useState } from 'react';
import { useWizard } from '@/context/WizardContext';
import { useLocation } from 'wouter';

type Tab = 'webapp' | 'crossplatform' | 'android' | 'ios';

interface TabInfo {
  id: Tab;
  label: string;
  description: string;
}

export default function MainNavigation() {
  const { updateProjectConfig } = useWizard();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('webapp');

  const tabs: TabInfo[] = [
    {
      id: 'webapp',
      label: 'Web Application',
      description: 'Build applications that run in web browsers on any device',
    },
    {
      id: 'crossplatform',
      label: 'Cross-Platform App',
      description: 'Create mobile apps that work on both iOS and Android with one codebase',
    },
    {
      id: 'android',
      label: 'Native Android',
      description: 'Develop Android-specific apps with native performance and features',
    },
    {
      id: 'ios',
      label: 'Native iOS',
      description: 'Create iOS apps with Swift and native Apple platform features',
    },
  ];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    
    // Update app type in context
    let appType = 'web';
    
    switch(tab) {
      case 'webapp':
        appType = 'web';
        break;
      case 'crossplatform':
        appType = 'mobile';
        break;
      case 'android':
      case 'ios':
        appType = 'mobile';
        break;
    }
    
    updateProjectConfig({ appType: appType as any });
    
    // Reset location to main page
    setLocation('/');
  };

  return (
    <div className="mb-8">
      <div className="navigation-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-400 mt-2">
        {tabs.find(tab => tab.id === activeTab)?.description}
      </div>
    </div>
  );
}