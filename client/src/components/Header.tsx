import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
// Mock data for search (replace with API or context in production)
const SEARCH_MONASTERIES = [
  { id: '1', name: 'Rumtek Monastery' },
  { id: '2', name: 'Enchey Monastery' },
  { id: '3', name: 'Pemayangtse Monastery' },
];
const SEARCH_MANUSCRIPTS = [
  { id: '1', title: 'Palm-leaf Buddhist Manuscript' },
  { id: '2', title: 'Tibetan Illuminated Manuscript' },
];
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, Globe, Sun, Moon, Search } from 'lucide-react';
import { Language } from '@shared/schema';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ne' as Language, name: 'नेपाली', flag: '🇳🇵' },
  { code: 'bn' as Language, name: 'বাংলা', flag: '🇧🇩' },
  { code: 'bo' as Language, name: 'བོད་ཡིག', flag: '🏳️' },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Monasteries', href: '/monasteries' },
  { label: 'Manuscripts', href: '/#manuscripts' },
  { label: 'Trip Planner', href: '/#trip-planner' },
  { label: 'Travel Guide', href: '/travel-guide' },
  { label: 'Culture', href: '/culture' },
  { label: 'Blog', href: '/blog' },
];

export default function Header({ currentLanguage, onLanguageChange, isDarkMode, onThemeToggle }: HeaderProps) {
  // Mobile search state
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [location, navigate] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search bar state
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtered results
  const monasteryResults = search
    ? SEARCH_MONASTERIES.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    : [];
  const manuscriptResults = search
    ? SEARCH_MANUSCRIPTS.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleResultClick = (type: 'monastery' | 'manuscript', id: string) => {
    setShowDropdown(false);
    setSearch('');
    if (type === 'monastery') {
      navigate(`/monasteries?id=${id}`);
    } else {
      navigate(`/manuscripts/${id}`);
    }
  };

  // Always scroll to trip planner section, even if already on Home

  const handleTripPlannerClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (location === '/') {
      setTimeout(() => {
        document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate('/#trip-planner');
    }
  }, [location, navigate]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Monestry360</span>
          </Link>
          {/* Search Bar (after logo, desktop only) */}
          <div className="relative w-64 hidden md:block">
            <input
              ref={inputRef}
              type="text"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-primary bg-background"
              placeholder="Search monasteries or manuscripts..."
              value={search}
              onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              aria-label="Search monasteries or manuscripts"
            />
            {showDropdown && (search.length > 0) && (
              <div className="absolute left-0 mt-1 w-full bg-background border rounded shadow z-50 max-h-64 overflow-auto">
                {monasteryResults.length === 0 && manuscriptResults.length === 0 && (
                  <div className="p-3 text-muted-foreground text-sm">No results found.</div>
                )}
                {monasteryResults.length > 0 && (
                  <div>
                    <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Monasteries</div>
                    {monasteryResults.map(m => (
                      <button
                        key={m.id}
                        className="w-full text-left px-3 py-2 hover:bg-accent/30 text-sm"
                        onMouseDown={() => handleResultClick('monastery', m.id)}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                )}
                {manuscriptResults.length > 0 && (
                  <div>
                    <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Manuscripts</div>
                    {manuscriptResults.map(m => (
                      <button
                        key={m.id}
                        className="w-full text-left px-3 py-2 hover:bg-accent/30 text-sm"
                        onMouseDown={() => handleResultClick('manuscript', m.id)}
                      >
                        {m.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Mobile Search Icon */}
          <button
            className="md:hidden p-2 rounded hover:bg-accent/30 focus:outline-none"
            aria-label="Open search"
            onClick={() => setShowMobileSearch(v => !v)}
          >
            <Search className="h-6 w-6 text-primary" />
          </button>
          {/* Mobile Search Dropdown */}
          {showMobileSearch && (
            <div className="absolute left-0 top-16 w-full bg-background border-b z-50 px-4 py-3 flex flex-col md:hidden">
              <input
                ref={inputRef}
                type="text"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-primary bg-background"
                placeholder="Search monasteries or manuscripts..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                aria-label="Search monasteries or manuscripts"
                autoFocus
              />
              {showDropdown && (search.length > 0) && (
                <div className="mt-1 w-full bg-background border rounded shadow z-50 max-h-64 overflow-auto">
                  {monasteryResults.length === 0 && manuscriptResults.length === 0 && (
                    <div className="p-3 text-muted-foreground text-sm">No results found.</div>
                  )}
                  {monasteryResults.length > 0 && (
                    <div>
                      <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Monasteries</div>
                      {monasteryResults.map(m => (
                        <button
                          key={m.id}
                          className="w-full text-left px-3 py-2 hover:bg-accent/30 text-sm"
                          onMouseDown={() => { handleResultClick('monastery', m.id); setShowMobileSearch(false); }}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  )}
                  {manuscriptResults.length > 0 && (
                    <div>
                      <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Manuscripts</div>
                      {manuscriptResults.map(m => (
                        <button
                          key={m.id}
                          className="w-full text-left px-3 py-2 hover:bg-accent/30 text-sm"
                          onMouseDown={() => { handleResultClick('manuscript', m.id); setShowMobileSearch(false); }}
                        >
                          {m.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>


        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.label === 'Trip Planner' ? (
                  <a
                    href="/#trip-planner"
                    onClick={handleTripPlannerClick}
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
                    data-testid="nav-trip-planner"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href}>
                    <NavigationMenuLink 
                      className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                        location === item.href ? 'bg-accent text-accent-foreground' : ''
                      }`}
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 w-9 p-0" data-testid="button-language">
                  <Globe className="h-4 w-4" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-48 gap-2 p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`flex items-center space-x-2 rounded-sm px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground ${
                          currentLanguage === lang.code ? 'bg-accent text-accent-foreground' : ''
                        }`}
                        data-testid={`language-${lang.code}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            data-testid="button-theme-toggle"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}