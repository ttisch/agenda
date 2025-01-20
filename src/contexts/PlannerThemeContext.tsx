import { createContext, ReactNode, useContext, useState } from 'react';
import leavesImage from '@/assets/leaves.jpg';
import minimalistImage from '@/assets/minimalist.jpg';
import orangeImage from '@/assets/orange.jpg';
import seaImage from '@/assets/seascape.jpg';

type PlannerTheme = {
  code: string;
  name: string;
  thumbnail: string;
  description: string;
  primaryColor: string;
};

const plannerThemes: PlannerTheme[] = [
  {
    code: 'leaves',
    name: 'Chilling Green',
    thumbnail: leavesImage,
    description: 'Like a calm, bug-free code review—chill, but functional.',
    primaryColor: 'green',
  },
  {
    code: 'seascape',
    name: 'Mild Breeze',
    thumbnail: seaImage,
    description: 'Cool and collected—just like you when debugging at 3 a.m.',
    primaryColor: 'blue',
  },
  {
    code: 'orange',
    name: 'Vivid Orange',
    thumbnail: orangeImage,
    description: 'Bright, bold, and ready to launch—because why wait for the weekend?',
    primaryColor: 'orange',
  },
  {
    code: 'minimalist',
    name: 'Minimalist',
    thumbnail: minimalistImage,
    description: 'Just give me the facts, dude ...',
    primaryColor: 'gray',
  },
];

type PlannerThemeContextType = {
  currentPlannerTheme: PlannerTheme;
  setPlannerTheme: (plannerTheme: PlannerTheme) => void;
  availablePlannerThemes: PlannerTheme[];
};

const PlannerThemeContext = createContext<PlannerThemeContextType | undefined>(undefined);

export function PlannerThemeProvider({ children }: { children: ReactNode }) {
  const [currentPlannerTheme, setCurrentPlannerTheme] = useState<PlannerTheme>(() => {
    const saved = localStorage.getItem('planner-planner-theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = plannerThemes.find((lang) => lang.code === parsed.code);
      if (found) {
        return found;
      }
    }
    return plannerThemes[0];
  });

  const value = {
    currentPlannerTheme,
    setPlannerTheme: (plannerTheme: PlannerTheme) => {
      setCurrentPlannerTheme(plannerTheme);
      localStorage.setItem('planner-planner-theme', JSON.stringify(plannerTheme));
    },
    availablePlannerThemes: plannerThemes,
  };

  return <PlannerThemeContext.Provider value={value}>{children}</PlannerThemeContext.Provider>;
}

export function usePlannerTheme() {
  const context = useContext(PlannerThemeContext);
  if (context === undefined) {
    throw new Error('usePlannerTheme must be used within a PlannerThemeProvider');
  }
  return context;
}
