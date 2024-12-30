import { SegmentedControl, Tooltip } from '@mantine/core';
import { useLanguage } from '../../contexts/LanguageContext';

const FLAGS = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  pt: '🇵🇹',
  ru: '🇷🇺',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷',
} as const;

export function LanguageSelector() {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  return (
    <SegmentedControl
      value={currentLanguage.code}
      onChange={(value) => {
        const language = availableLanguages.find((lang) => lang.code === value);
        if (language) {
          setLanguage(language);
        }
      }}
      data={availableLanguages.map((lang) => ({
        value: lang.code,
        label: (
          <Tooltip label={lang.name} withArrow>
            <div style={{ fontSize: '1.5rem' }}>{FLAGS[lang.code as keyof typeof FLAGS]}</div>
          </Tooltip>
        ),
      }))}
    />
  );
}
