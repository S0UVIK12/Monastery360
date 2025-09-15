import { useState } from 'react';
import Header from '../Header';
import { Language } from '@shared/schema';

export default function HeaderExample() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Header
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      isDarkMode={isDarkMode}
      onThemeToggle={() => setIsDarkMode(!isDarkMode)}
    />
  );
}