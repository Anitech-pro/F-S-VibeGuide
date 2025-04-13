import { useState, useEffect } from "react";
import { useWizard, FrontendFramework, StylingOption } from "@/context/WizardContext";
import ProgressBar from "@/components/ProgressBar";
import WizardNavigation from "@/components/WizardNavigation";
import MainNavigation from "@/components/MainNavigation";
import TechOptionCard from "@/components/TechOptionCard";
import TechDetailView from "@/components/TechDetailView";
import { frontendOptions, stylingOptions, getRecommendationReason } from "@/lib/simpleTechData";

// Icons
const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
    <path fill="currentColor" d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046z" />
    <path fill="currentColor" d="M5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 00-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 00-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 013.233-.501 24.847 24.847 0 012.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zm9.589 20.362c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 002.421-2.968l.135-.193.234-.02a23.63 23.63 0 003.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 01-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 01-3.234.501 24.674 24.674 0 01-2.051 2.545z" />
  </svg>
);

const VueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
    <path fill="currentColor" d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78zM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43z" />
  </svg>
);

const TailwindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
    <path fill="currentColor" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const CSSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
    <path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
  </svg>
);

const AngularIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
    <path fill="currentColor" d="M9.93 12.645h4.134L11.996 7.74M11.996.009L.686 3.988l1.725 14.76 9.585 5.243 9.585-5.243 1.725-14.76L11.996.009zm7.058 18.297h-2.636l-1.42-3.501H8.995l-1.42 3.501H4.937l7.06-15.648 7.057 15.648z" />
  </svg>
);

const StyledComponentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
    <path fill="currentColor" d="M16.214 6.762c-.268-.264-1.178-.188-1.978.156-.859.375-2.339 1.544-2.582 1.763-.246.217-1.625 1.599-1.625 1.599s1.347-1.307 1.55-1.535c.417-.474 1.609-1.663 2.27-2.213.376-.315 1.929-1.463 2.537-1.485.2-.27.232.06.209.151-.23.152-.679.664-.956.949-.277.288-1.115 1.076-1.898 1.829-.783.752-1.747 1.834-2.041 2.177-.294.343-1.309 1.572-1.309 1.572s1.149-1.161 1.352-1.372c.203-.21 1.812-1.902 1.812-1.902s.11-.041-.088-.074c-.198-.04-.434.162-.67.403-.33.336-.687.737-.778.836-.888.971-1.417 1.614-1.926 2.233-.155.188-.605.672-.815.91-.211.235-.706.661-.706.661s.322-.305.431-.417c.443-.437 2.058-2.4 2.626-3.142.108-.148 2.283-2.586 2.558-2.85s.971-.8 1.39-1.087c.41-.283 1.001-.492 1.319-.43.242.072.371.235.332.443-.04.24-.254.604-.5.867-.248.259-.527.474-.814.666-.293.196-.611.376-.909.544-.3.17-.623.32-.878.437-.258.12-.238.073-.238.073s1.418-1.173 1.744-1.423c.324-.253 1.317-1.024 1.733-1.215.32-.147 1.44-.648 1.983-.656.535-.018.906.252.835.498-.065.17-.184.372-.47.668-.26.234-.707.6-1.221.964-.503.36-1.189.758-1.605.986-.418.228-1.439.695-1.777.818-.34.125-.693.261-.996.384-.303.125-.898.344-1.28.482-.413.152-1.123.385-1.123.385s-.946.36-1.121.424c-.146.055-1.156.323-1.156.323s-.065.032.072-.05c.138-.083.888-.518 1.063-.62.09-.054.378-.238.747-.447.368-.211 1.133-.673 1.794-1.049.662-.375 1.292-.735 1.739-.964.448-.229 1.468-.648 1.468-.648s1.27-.465 1.856-.653c.586-.188.936-.25 1.168-.232.38.030.477.168.477.254 0 .088-.123.360-.574.945-.453.585-1.067 1.15-1.433 1.458-.37.305-1.023.75-1.273.885-.12.065-.7.31-.7.31s.021.119.88.124c.067.8.154-.03.296-.1.142-.069.688-.321 1.04-.514.354-.193 1.668-1.083 2.24-1.619.572-.536 1.37-1.414 1.37-1.642 0-.22-.123-.277-.21-.328-.87-.047-.65.004-1.19.329-.54.323-1.657 1.097-2.095 1.43-.438.335-.745.555-.745.555s.319-.342.616-.642c.297-.3.689-.673 1.06-1.031.372-.36.723-.736.984-.946.26-.216.819-.588.922-.657.101-.07.207-.126.256-.12.066.008.206.05.206.21 0 .162-.188.493-.438.935-.251.441-.729.958-1.156 1.47-.224.27-.474.543-.709.801-.236.259-.99 1.066-.99 1.066z" />
  </svg>
);

export default function FrontendSelection() {
  const { projectConfig, updateProjectConfig, setCurrentStep } = useWizard();
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend');
  
  useEffect(() => {
    // Update current step when this page loads
    setCurrentStep("frontend");
  }, [setCurrentStep]);
  
  // If the app type doesn't need frontend, skip this step
  const shouldSkipFrontend = projectConfig.appType === "backend";
  
  // Get the relevant tech category data
  const getIconForTech = (techId: string) => {
    switch(techId) {
      case 'react': return <ReactIcon />;
      case 'vue': return <VueIcon />;
      case 'angular': return <AngularIcon />;
      case 'tailwind': return <TailwindIcon />;
      case 'css': return <CSSIcon />;
      case 'styled-components': return <StyledComponentsIcon />;
      default: return null;
    }
  };
  
  // Apply icons to tech options
  const enhancedFrontendOptions = frontendOptions.map(option => ({
    ...option,
    icon: getIconForTech(option.id)
  }));
  
  const enhancedStylingOptions = stylingOptions.map(option => ({
    ...option,
    icon: getIconForTech(option.id)
  }));
  
  // Handle framework selection
  const handleFrameworkSelect = (framework: FrontendFramework) => {
    updateProjectConfig({ frontend: framework });
  };
  
  // Handle styling selection
  const handleStylingSelect = (styling: StylingOption) => {
    updateProjectConfig({ styling: styling });
  };
  
  // Handle viewing tech details
  const handleViewDetails = (techId: string, category: string) => {
    setSelectedTechId(techId);
    setSelectedCategory(category);
  };
  
  // Find the selected tech details
  const selectedTechDetails = selectedCategory === 'frontend' 
    ? enhancedFrontendOptions.find(opt => opt.id === selectedTechId)
    : enhancedStylingOptions.find(opt => opt.id === selectedTechId);
  
  // Determine if a tech is recommended based on previous selections
  const isRecommended = (id: string, category: string): boolean => {
    if (category === 'frontend') {
      // Recommend React for web apps
      if (id === 'react' && projectConfig.appType === 'web') return true;
      // Recommend React Native for mobile
      if (id === 'react-native' && projectConfig.appType === 'mobile') return true;
    } else if (category === 'styling') {
      // Recommend Tailwind for modern development
      if (id === 'tailwind') return true;
    }
    return false;
  };
  
  // Get recommendation reason
  const getRecommendationReason = (id: string, category: string): string => {
    if (category === 'frontend') {
      if (id === 'react' && projectConfig.appType === 'web') {
        return "React is recommended for web applications due to its large ecosystem, extensive documentation, and strong community support. It's widely used in South Africa and has excellent learning resources.";
      }
      if (id === 'react-native' && projectConfig.appType === 'mobile') {
        return "React Native is ideal for cross-platform mobile development, allowing you to build apps for both iOS and Android with a single codebase. It has strong adoption in South Africa's developer community.";
      }
    } else if (category === 'styling') {
      if (id === 'tailwind') {
        return "Tailwind CSS is recommended for its utility-first approach that speeds up development and ensures consistency. It's especially useful for developers who aren't design experts but want professional-looking UIs.";
      }
    }
    return "";
  };

  return (
    <>
      <ProgressBar />
      
      <div className="p-6 md:p-8">
        <MainNavigation />
        
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Frontend Selection</h2>
            <span className="text-sm text-purple-400">Step 2 of 4</span>
          </div>
          
          {shouldSkipFrontend ? (
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <div className="flex items-center text-yellow-300 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Note</span>
              </div>
              <p className="text-gray-300">
                Since you selected a backend-only application, you can skip the frontend selection. Click Next to continue to the backend selection.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                  Frontend Framework
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enhancedFrontendOptions.map((option) => (
                    <TechOptionCard 
                      key={option.id}
                      id={option.id}
                      name={option.name}
                      description={option.description}
                      icon={option.icon}
                      advantages={option.advantages.slice(0, 3)}
                      isSelected={projectConfig.frontend === option.id as FrontendFramework}
                      isRecommended={isRecommended(option.id, 'frontend')}
                      onSelect={() => handleFrameworkSelect(option.id as FrontendFramework)}
                      onViewDetails={() => handleViewDetails(option.id, 'frontend')}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                  Styling Solution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enhancedStylingOptions.map((option) => (
                    <TechOptionCard 
                      key={option.id}
                      id={option.id}
                      name={option.name}
                      description={option.description}
                      icon={option.icon}
                      advantages={option.advantages.slice(0, 3)}
                      isSelected={projectConfig.styling === option.id as StylingOption}
                      isRecommended={isRecommended(option.id, 'styling')}
                      onSelect={() => handleStylingSelect(option.id as StylingOption)}
                      onViewDetails={() => handleViewDetails(option.id, 'styling')}
                    />
                  ))}
                </div>
              </section>
              
              {selectedTechDetails && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">{selectedTechDetails.name}</h3>
                  <p className="text-gray-300 mb-4">{selectedTechDetails.description}</p>
                  
                  {isRecommended(selectedTechDetails.id, selectedCategory) && (
                    <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-green-400">Recommended</span>
                      </div>
                      <p className="text-gray-300 text-sm">{getRecommendationReason(selectedTechDetails.id, selectedCategory)}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-medium text-purple-400 mb-2">Advantages</h4>
                      <ul className="space-y-1">
                        {selectedTechDetails.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-purple-400 mb-2">Limitations</h4>
                      <ul className="space-y-1">
                        {selectedTechDetails.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-purple-400 mb-2">Use Cases</h4>
                    <ul className="space-y-1">
                      {selectedTechDetails.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                          </svg>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <WizardNavigation nextLabel="Next: Backend Selection" />
      </div>
    </>
  );
}
