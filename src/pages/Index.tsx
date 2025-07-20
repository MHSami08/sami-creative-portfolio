
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Search, Volume2, VolumeX } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Contact from '../components/Contact';
import MyAim from '../components/MyAim';
import SearchDialog from '../components/SearchDialog';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { playSound, toggleSound, isEnabled: soundEnabled } = useSoundEffects();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    playSound('click');
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'My Aim', href: '#myaim' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    playSound('navigation');
  };

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        playSound('click');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Navigation with better mobile layout */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-emerald-400/20 shadow-lg shadow-emerald-500/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-16">
            <div className="flex-shrink-0 min-w-0">
              <h1 className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent truncate">
                Masrafi Haque Sami
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 lg:space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => playSound('hover')}
                    className="text-foreground hover:text-emerald-400 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-emerald-500/10"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  playSound('click');
                }}
                className="p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 border border-emerald-400/30 backdrop-blur-lg shadow-lg hover:shadow-xl group"
                aria-label="Search (Ctrl+K)"
                title="Search (Ctrl+K)"
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => {
                  const newState = toggleSound();
                  playSound('click');
                }}
                className="p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 border border-emerald-400/30 backdrop-blur-lg shadow-lg hover:shadow-xl group"
                aria-label="Toggle sound effects"
                title="Toggle sound effects"
              >
                {soundEnabled ? (
                  <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                onMouseEnter={() => playSound('hover')}
                className="p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 border border-emerald-400/30 backdrop-blur-lg shadow-lg hover:shadow-xl group"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-amber-400 group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                  <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    playSound('click');
                  }}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 border border-emerald-400/30 backdrop-blur-lg shadow-lg"
                >
                  {isMenuOpen ? <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" /> : <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-xl border-t border-emerald-400/20 rounded-b-2xl">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-emerald-400 block px-4 py-3 rounded-xl text-base font-medium w-full text-left transition-all duration-300 hover:bg-emerald-500/10"
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                    playSound('click');
                  }}
                  className="text-foreground hover:text-emerald-400 flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium w-full text-left transition-all duration-300 hover:bg-emerald-500/10"
                >
                  <Search className="h-5 w-5" />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-12 sm:pt-16">
        
        <section id="home">
          <Hero />
        </section>
        <section id="portfolio" className="py-8 sm:py-16">
          <Portfolio />
        </section>
        <section id="about" className="py-8 sm:py-16">
          <About />
        </section>
        <section id="myaim" className="py-8 sm:py-16">
          <MyAim />
        </section>
        <section id="services" className="py-8 sm:py-16">
          <Services />
        </section>
        <section id="contact" className="py-8 sm:py-16">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-900/10 to-blue-900/10 border-t border-emerald-400/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              © 2025 Masrafi Haque Sami. All rights reserved. 
              <span className="block sm:inline text-amber-300 font-amiri ml-0 sm:ml-2 mt-1 sm:mt-0">جزاك الله خيرا</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
