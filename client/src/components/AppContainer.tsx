import { ReactNode } from "react";
import HelpButton from "./HelpButton";

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
      
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="flex justify-center items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <h1 className="text-3xl font-bold text-white">Full-Stack <span className="text-purple-400">Vibe Guide</span></h1>
        </div>
        <p className="text-gray-400 max-w-xl mx-auto">Create your perfect tech stack and get guidance through the entire development process</p>
      </header>
      
      {/* Main content */}
      <main className="max-w-6xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        {children}
      </main>
      
      {/* Help button */}
      <HelpButton />
    </div>
  );
}
