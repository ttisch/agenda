import { createContext, ReactNode, useContext, useState } from 'react';

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  availableLanguages: Language[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('planner-language');
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = languages.find((lang) => lang.code === parsed.code);
      if (found) {
        return found;
      }
    }
    return languages[0];
  });

  const value = {
    currentLanguage,
    setLanguage: (language: Language) => {
      setCurrentLanguage(language);
      localStorage.setItem('planner-language', JSON.stringify(language));
    },
    availableLanguages: languages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
