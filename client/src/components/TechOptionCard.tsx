import React from 'react';

interface TechOptionCardProps {
  id: string;
  name: string; 
  description: string;
  icon: React.ReactNode;
  advantages: string[];
  isSelected: boolean;
  isRecommended?: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
}

export default function TechOptionCard({
  id,
  name,
  description,
  icon,
  advantages,
  isSelected,
  isRecommended = false,
  isDisabled = false,
  onSelect,
  onViewDetails
}: TechOptionCardProps) {
  return (
    <div 
      className={`tech-option-card relative ${isSelected ? 'selected' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={isDisabled ? undefined : onSelect}
    >
      {isRecommended && (
        <div className="absolute top-2 right-2 bg-green-600 text-xs text-white px-2 py-1 rounded-full">
          Recommended
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {icon}
            <h3 className="text-md font-medium text-white">{name}</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">{description}</p>
        </div>
        
        <div 
          className={`checkbox-container ${isSelected ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) onSelect();
          }}
        >
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      
      <div className="space-y-1 mt-4 mb-4">
        {advantages.slice(0, 2).map((advantage, index) => (
          <div key={index} className="flex items-center text-xs text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{advantage}</span>
          </div>
        ))}
        {advantages.length > 2 && (
          <div className="text-xs text-gray-400">
            +{advantages.length - 2} more advantages
          </div>
        )}
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
        className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors w-full"
      >
        View Details
      </button>
    </div>
  );
}