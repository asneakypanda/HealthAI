import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIResponseContextType {
  aiResponse: string;
  setAiResponse: (response: string) => void;
}

const AIResponseContext = createContext<AIResponseContextType | undefined>(undefined);

export const useAIResponse = (): AIResponseContextType => {
  const context = useContext(AIResponseContext);
  if (!context) {
    throw new Error('useAIResponse must be used within a AIResponseProvider');
  }
  return context;
};

interface AIResponseProviderProps {
  children: ReactNode;
}

export const AIResponseProvider: React.FC<AIResponseProviderProps> = ({ children }) => {
  const [aiResponse, setAiResponse] = useState<string>("");

  return (
    <AIResponseContext.Provider value={{ aiResponse, setAiResponse }}>
      {children}
    </AIResponseContext.Provider>
  );
};
