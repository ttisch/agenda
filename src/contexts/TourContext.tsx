import { createContext, useContext, useState } from 'react';

interface TourContextType {
  startTour: () => void;
  endTour: () => void;
  isActive: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  const startTour = () => {
    localStorage.removeItem('planner_tour_completed');
    setIsActive(true);
  };

  const endTour = () => {
    localStorage.setItem('planner_tour_completed', 'true');
    setIsActive(false);
  };

  return (
    <TourContext.Provider value={{ startTour, endTour, isActive }}>{children}</TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
