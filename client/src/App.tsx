import { useState, useEffect } from 'react';
import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// Import components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import pages
import Home from '@/pages/Home';
import Monasteries from '@/pages/Monasteries';
import NotFound from '@/pages/not-found';
import MonasteryDetail from '@/pages/MonasteryDetail';
import BlogDetail from '@/pages/BlogDetail';
import ManuscriptDetail from '@/pages/ManuscriptDetail';
import Manuscripts from '@/pages/Manuscripts';

// Import types
import type { Language } from '@shared/schema';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/monasteries" component={Monasteries} />
    <Route path="/monasteries/:id" component={MonasteryDetail} />
    <Route path="/blog/:id" component={BlogDetail} />
  <Route path="/manuscripts" component={Manuscripts} />
  <Route path="/manuscripts/:id" component={ManuscriptDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    console.log('Language changed to:', lang);
    // TODO: Implement actual language switching logic
  };

  const handleSubscribeNewsletter = (email: string) => {
    console.log('Newsletter subscription:', email);
    // TODO: Implement newsletter subscription
  };

  const handleContactEmergency = (type: string) => {
    console.log('Emergency contact:', type);
    // TODO: Implement emergency contact functionality
  };

  // Language initialization
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'ne', 'bn', 'bo'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          {/* Header */}
          <Header
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            isDarkMode={isDarkMode}
            onThemeToggle={handleThemeToggle}
          />

          {/* Main Content */}
          <main className="flex-1">
            <Router />
          </main>

          {/* Footer */}
          <Footer
            onSubscribeNewsletter={handleSubscribeNewsletter}
            onContactEmergency={handleContactEmergency}
          />
        </div>

        {/* Toast notifications */}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;