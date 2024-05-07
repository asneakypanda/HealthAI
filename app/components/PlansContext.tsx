import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Plan {
  id: number;
  content: string;
}

interface PlansContextType {
  plans: Plan[];
  addPlan: (content: string) => void;
}

interface PlansProviderProps {
    children: ReactNode;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export const PlansProvider: React.FC<PlansProviderProps> = ({ children }) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const addPlan = (content: string) => {
    const newPlan = {
      id: plans.length + 1,
      content,
    };
    setPlans([...plans, newPlan]);
  };

  return (
    <PlansContext.Provider value={{ plans, addPlan }}>
      {children}
    </PlansContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};
