import React, { createContext, useContext, useEffect, useState } from 'react';
import { getBusinessHours, updateBusinessHours } from '../services/database';

interface BusinessHours {
  startTime: string;
  endTime: string;
  workDays: number[];
}

interface BusinessHoursContextType {
  businessHours: BusinessHours;
  setBusinessHours: (hours: BusinessHours) => Promise<void>;
}

const BusinessHoursContext = createContext<BusinessHoursContextType | undefined>(undefined);

export function BusinessHoursProvider({ children }: { children: React.ReactNode }) {
  const [businessHours, setBusinessHoursState] = useState<BusinessHours>({
    startTime: '07:00',
    endTime: '16:00',
    workDays: [1, 2, 3, 4, 5],
  });

  useEffect(() => {
    getBusinessHours().then(setBusinessHoursState);
  }, []);

  const setBusinessHours = async (hours: BusinessHours) => {
    await updateBusinessHours(hours);
    setBusinessHoursState(hours);
  };

  return (
    <BusinessHoursContext.Provider value={{ businessHours, setBusinessHours }}>
      {children}
    </BusinessHoursContext.Provider>
  );
}

export function useBusinessHours() {
  const context = useContext(BusinessHoursContext);
  if (context === undefined) {
    throw new Error('useBusinessHours must be used within a BusinessHoursProvider');
  }
  return context;
}
