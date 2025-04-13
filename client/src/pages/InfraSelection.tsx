import { useWizard, Authentication, Hosting } from "@/context/WizardContext";
import ProgressBar from "@/components/ProgressBar";
import WizardNavigation from "@/components/WizardNavigation";
import { useEffect } from "react";

interface TechOption {
  id: string;
  name: string;
  description: string;
  advantages: string[];
  icon: React.ReactNode;
}

function OptionCard({ 
  option, 
  isSelected, 
  onSelect 
}: { 
  option: TechOption; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <div 
      className={`base-card option-card ${
        isSelected ? "selected-card" : ""
      } bg-gray-700 bg-opacity-30 border rounded-xl p-6 cursor-pointer transition-all duration-200`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="info-click-area">
          <div className="flex items-center mb-2">
            {option.icon}
            <span className="font-medium text-white">{option.name}</span>
          </div>
          <p className="text-sm text-gray-300 mb-4">{option.description}</p>
        </div>
        <div className="input-container">
          <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-purple-500 bg-purple-500 flex items-center justify-center" : "border-gray-600"}`}>
            {isSelected && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        {option.advantages.map((advantage, index) => (
          <div key={index} className="flex items-center text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{advantage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InfraSelection() {
  const { projectConfig, updateProjectConfig, setCurrentStep } = useWizard();
  
  useEffect(() => {
    // Update current step when this page loads
    setCurrentStep("infrastructure");
  }, [setCurrentStep]);
  
  // Authentication options
  const authOptions: TechOption[] = [
    {
      id: "jwt",
      name: "JWT Authentication",
      description: "JSON Web Tokens for secure authentication and authorization.",
      advantages: [
        "Stateless authentication",
        "Cross-domain capabilities",
        "Compact and self-contained",
        "Easy to implement"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M10.2 0v6H7.8V0h2.4zm6.456 1.8l.468 2.28-2.244.96-.684-2.232 2.46-1.008zm-14.304.936L4.8 3.96l-2.244.96L2.1 2.64l.252-.104zM12 5.04l1.2 1.2-1.2 1.2-1.2-1.2L12 5.04zM0 7.2h6v2.4H0V7.2zm18 0h6v2.4h-6V7.2zm-7.8 3.84l2.232.684-.96 2.244-2.28-.468L10.2 11.04zm-7.536.876l2.232-.684 1.008 2.46-2.232.684-.084-.204-1.008-2.052.084-.204zM21.996 12l-2.052 1.008-.204-.084-.684-2.232 2.46-1.008.48.204zM12 13.2l1.2 1.2-1.2 1.2-1.2-1.2 1.2-1.2zm-1.644 3.876l2.244-.96.684 2.232-2.46 1.008-.468-2.28zm10.344.084l.204.084 2.052 1.008-.48.204-2.46 1.008-.684-2.232.084-.204 1.284-.6zM2.1 17.364l2.244-.96.684 2.232-2.46 1.008-.468-2.28zM7.8 18h2.4v6H7.8v-6zm6 0h2.4v6h-2.4v-6z"/>
        </svg>
      )
    },
    {
      id: "auth0",
      name: "Auth0",
      description: "Secure, adaptable, and easy-to-implement authentication service.",
      advantages: [
        "Single sign-on",
        "Multiple auth methods",
        "User management",
        "Enterprise security features"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12zm-9.974 8.455l-2.043-2.04 2.043-2.042 2.043 2.042zm0-9.123L9.96 4.738h4.095l-2.043 2.042zm-3.228 2.583l2.042-2.042 2.043 2.042-2.043 2.042zm6.45-.541l2.043-2.042 2.043 2.042-2.043 2.042zm-.54 3.228l2.042-2.042 2.042 2.042-2.042 2.043zM5.9 7.46L6.88 4.74h2.86L5.9 8.58zm0 5.196l7.073-7.072 1.47 1.47-5.6 5.602 4.12 4.13-1.47 1.47zm12.214-5.196L14.267 4.74h2.853z"/>
        </svg>
      )
    }
  ];
  
  // Hosting options
  const hostingOptions: TechOption[] = [
    {
      id: "vercel",
      name: "Vercel",
      description: "Platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.",
      advantages: [
        "Optimized for frontend frameworks",
        "Serverless functions",
        "CDN by default",
        "Easy deployment with Git"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M12 0L0 24h24L12 0zm0 4.615L21.23 22.5H2.77L12 4.615Z"/>
        </svg>
      )
    },
    {
      id: "aws",
      name: "AWS",
      description: "Comprehensive cloud computing platform with a wide range of services.",
      advantages: [
        "Broad set of services",
        "Global infrastructure",
        "High reliability",
        "Flexible pricing"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.67-.367-1.236-.367-.265 0-.526.032-.797.112-.27.08-.526.176-.773.304-.12.063-.208.087-.256.087-.08 0-.152-.063-.223-.191l-.24-.335a.266.266 0 0 1-.056-.183c0-.08.04-.16.112-.24a2.45 2.45 0 0 1 .91-.519c.374-.15.83-.223 1.357-.223.911 0 1.317.88 1.661.56.344.48.518 1.19.518 2.14v2.82zm-3.42-.902c0 .334.088.59.255.767.175.176.39.255.654.255.16 0 .32-.031.487-.08a.97.97 0 0 0 .43-.247c.127-.12.223-.263.295-.43.8-.167.12-.359.12-.575v-.861a6.65 6.65 0 0 0-.735-.136 3.874 3.874 0 0 0-.704-.064c-.39 0-.693.096-.91.296-.223.2-.327.454-.327.77zm8.274 2.297c-.103 0-.175-.024-.224-.08-.047-.056-.088-.16-.12-.303l-1.35-4.448c-.032-.111-.048-.183-.048-.223 0-.096.064-.144.192-.144h.782c.112 0 .192.024.24.08.047.056.082.16.112.303l.962 3.784.982-3.784c.024-.127.064-.231.112-.295.048-.064.136-.088.24-.088h.638c.112 0 .192.024.24.08.048.056.082.16.104.303l.998 3.832.958-3.832c.032-.127.072-.231.12-.295.048-.064.128-.088.232-.088h.734c.128 0 .192.048.192.144a.403.403 0 0 1-.04.223l-1.37 4.448c-.03.143-.072.247-.12.303-.047.056-.119.08-.224.08h-.686c-.104 0-.184-.024-.232-.08-.048-.056-.088-.16-.104-.303l-.99-3.665-.958 3.665c-.024.143-.064.247-.112.303-.048.056-.128.08-.232.08h-.694zm8.056 0c-.103 0-.175-.024-.224-.08-.047-.056-.088-.16-.12-.303l-1.35-4.448c-.032-.111-.048-.183-.048-.223 0-.096.064-.144.192-.144h.782c.112 0 .192.024.24.08.047.056.08.16.112.303l.958 3.784.982-3.784c.032-.127.064-.231.112-.295.048-.064.136-.088.24-.088h.638c.112 0 .192.024.24.08.048.056.08.16.112.303l.99 3.832.966-3.832c.024-.127.064-.231.112-.295.048-.064.128-.088.232-.088h.734c.128 0 .192.048.192.144a.403.403 0 0 1-.04.223l-1.37 4.448c-.032.143-.072.247-.12.303-.048.056-.12.08-.224.08h-.686c-.112 0-.184-.024-.232-.08-.048-.056-.088-.16-.112-.303l-.982-3.665-.958 3.665c-.024.143-.064.247-.112.303-.048.056-.128.08-.232.08h-.694z"/>
        </svg>
      )
    }
  ];
  
  // Handle authentication selection
  const handleAuthSelect = (auth: Authentication) => {
    updateProjectConfig({ authentication: auth });
  };
  
  // Handle hosting selection
  const handleHostingSelect = (hosting: Hosting) => {
    updateProjectConfig({ hosting: hosting });
  };

  return (
    <>
      <ProgressBar />
      
      <div className="p-6 md:p-8">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Infrastructure Selection</h2>
            <span className="text-sm text-purple-400">Step 4 of 4</span>
          </div>
          
          <div className="space-y-8">
            <section>
              <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                Authentication
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {authOptions.map((option) => (
                  <OptionCard 
                    key={option.id}
                    option={option}
                    isSelected={projectConfig.authentication === option.id as Authentication}
                    onSelect={() => handleAuthSelect(option.id as Authentication)}
                  />
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                Hosting
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hostingOptions.map((option) => (
                  <OptionCard 
                    key={option.id}
                    option={option}
                    isSelected={projectConfig.hosting === option.id as Hosting}
                    onSelect={() => handleHostingSelect(option.id as Hosting)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
        
        <WizardNavigation nextLabel="Review & Generate" />
      </div>
    </>
  );
}
