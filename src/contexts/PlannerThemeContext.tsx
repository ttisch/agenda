import { createContext, ReactNode, useContext, useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import leavesImage from '@/assets/leaves.jpg';
import minimalistImage from '@/assets/minimalist.jpg';
import orangeImage from '@/assets/orange.jpg';
import seaImage from '@/assets/seascape.jpg';

export type PlannerTheme = {
  code: string;
  name: string;
  thumbnail: string;
  description: string;
  primaryColor: string;
  eventColor: string;
  eventColorDone: string;
};

function hexToRgba(hex: string, alpha: number) {
  if (!hex.startsWith('#') || (hex.length !== 7 && hex.length !== 4)) {
    throw new Error('Invalid hex color format');
  }

  let r, g, b;

  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type PlannerThemeContextType = {
  currentPlannerTheme: PlannerTheme;
  setPlannerTheme: (plannerTheme: PlannerTheme) => void;
  availablePlannerThemes: PlannerTheme[];
};

const PlannerThemeContext = createContext<PlannerThemeContextType | undefined>(undefined);

export function PlannerThemeProvider({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();

  const plannerThemes: PlannerTheme[] = [
    {
      code: 'leaves',
      name: 'Chilling Green',
      thumbnail: leavesImage,
      description: 'Like a calm, bug-free code review—chill, but functional.',
      primaryColor: 'green',
      eventColor: hexToRgba(theme.colors.green[7], 0.46),
      eventColorDone: hexToRgba(theme.colors.green[3], 0.46),
    },
    {
      code: 'seascape',
      name: 'Mild Breeze',
      thumbnail: seaImage,
      description: 'Cool and collected—just like you when debugging at 3 a.m.',
      primaryColor: 'blue',
      eventColor: hexToRgba(theme.colors.blue[7], 0.46),
      eventColorDone: hexToRgba(theme.colors.blue[3], 0.46),
    },
    {
      code: 'orange',
      name: 'Vivid Orange',
      thumbnail: orangeImage,
      description: 'Bright, bold, and ready to launch—because why wait for the weekend?',
      primaryColor: 'orange',
      eventColor: hexToRgba(theme.colors.orange[7], 0.46),
      eventColorDone: hexToRgba(theme.colors.orange[3], 0.46),
    },
    {
      code: 'minimalist',
      name: 'Minimalist',
      thumbnail: minimalistImage,
      description: 'Just give me the facts, dude ...',
      primaryColor: 'gray',
      eventColor: hexToRgba(theme.colors.gray[7], 0.46),
      eventColorDone: hexToRgba(theme.colors.gray[3], 0.46),
    },
  ];
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
      theme.primaryColor = plannerTheme.primaryColor;
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
