import { useState } from "react";

export default function HelpButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="relative">
        <button 
          className="bg-purple-500 h-12 w-12 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
          onClick={() => setShowTooltip(!showTooltip)}
          aria-label="Help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        {showTooltip && (
          <div className="absolute bottom-16 right-0 w-64 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">Need Help?</h3>
              <button 
                onClick={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-300">
              This wizard will guide you through setting up your project's technology stack. Select options that best fit your project needs.
            </p>
            <div className="mt-3 text-xs text-purple-400">
              Learn more about technology choices in the explanation panels.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
