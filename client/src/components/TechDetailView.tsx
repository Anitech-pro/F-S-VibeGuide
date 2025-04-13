import React from 'react';

interface TutorialResource {
  title: string;
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface PromptSuggestion {
  title: string;
  prompt: string;
}

interface TechDetailViewProps {
  title: string;
  description: string;
  useCases: string[];
  advantages: string[];
  limitations: string[];
  tutorialLinks: TutorialResource[];
  promptSuggestions: PromptSuggestion[];
  isRecommended?: boolean;
  recommendationReason?: string;
}

export default function TechDetailView({
  title,
  description,
  useCases,
  advantages,
  limitations,
  tutorialLinks,
  promptSuggestions,
  isRecommended = false,
  recommendationReason,
}: TechDetailViewProps) {
  return (
    <div className="tech-detail-panel">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {isRecommended && (
          <span className="recommended-badge">Recommended</span>
        )}
      </div>
      
      <p className="text-gray-300 mb-6">{description}</p>
      
      {isRecommended && recommendationReason && (
        <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4 mb-6">
          <div className="flex items-center text-green-400 font-medium mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Why we recommend this</span>
          </div>
          <p className="text-gray-300 text-sm">{recommendationReason}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Ideal Use Cases</h4>
          <ul className="space-y-2">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex text-gray-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Advantages</h4>
          <ul className="space-y-2">
            {advantages.map((advantage, index) => (
              <li key={index} className="flex text-gray-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-3">Limitations to Consider</h4>
        <ul className="space-y-2">
          {limitations.map((limitation, index) => (
            <li key={index} className="flex text-gray-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-3">Learning Resources</h4>
        <ul className="space-y-3">
          {tutorialLinks.map((resource, index) => (
            <li key={index} className="flex items-center text-gray-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resource-link"
              >
                {resource.title}
              </a>
              {resource.difficulty === 'beginner' && (
                <span className="beginner-friendly-badge">Beginner Friendly</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-medium text-white mb-3">AI Prompt Suggestions</h4>
        <p className="text-gray-400 text-sm mb-3">
          Copy these prompts to ask your favorite AI assistant for help with {title}.
        </p>
        <div className="space-y-3">
          {promptSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-sm font-medium text-gray-300">{suggestion.title}</h5>
                <button 
                  className="text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                  onClick={() => navigator.clipboard.writeText(suggestion.prompt)}
                >
                  Copy Prompt
                </button>
              </div>
              <p className="text-gray-400 text-xs italic">{suggestion.prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}