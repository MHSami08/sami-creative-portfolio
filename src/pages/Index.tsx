import { useState, useEffect } from 'react';
import { Menu, X, Search, Volume2, VolumeX } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Contact from '../components/Contact';
import MyAim from '../components/MyAim';
import SearchDialog from '../components/SearchDialog';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { playSound, toggleSound, isEnabled: soundEnabled } = useSoundEffects();

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'My Aim', href: '#myaim' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: "Developer's Space", href: '/developer-space' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '/developer-space') {
      window.location.href = '/developer-space';
      return;
    }
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
    <div className="min-h-screen bg-background text-foreground smooth-scroll">
      
      {/* Enhanced Navigation with glass morphism */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-18">
            <div className="flex-shrink-0 min-w-0 animate-slide-in-left">
              <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent truncate animate-shimmer">
                MH Sami
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => playSound('hover')}
                    className="apple-button text-foreground hover:text-blue-400 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-sm font-medium transition-all duration-500 hover:scale-105 animate-slide-in-right"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              {/* Search Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  playSound('click');
                }}
                className="apple-button p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl group animate-glow-pulse"
                aria-label="Search (Ctrl+K)"
                title="Search (Ctrl+K)"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-400 group-hover:scale-125 transition-all duration-300" />
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => {
                  const newState = toggleSound();
                  playSound('click');
                }}
                className="apple-button p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl group"
                aria-label="Toggle sound effects"
                title="Toggle sound effects"
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-400 group-hover:scale-125 transition-all duration-300 animate-pulse-scale" />
                ) : (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400 group-hover:scale-125 transition-all duration-300" />
                )}
              </button>


              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    playSound('click');
                  }}
                  className="apple-button p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg group"
                >
                  {isMenuOpen ? 
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 group-hover:scale-125 transition-all duration-300 animate-pulse-scale" /> : 
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:scale-125 transition-all duration-300" />
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-in-right">
              <div className="px-3 pt-3 pb-4 space-y-2 sm:px-4 glass-card border-t border-white/10 rounded-b-3xl">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="apple-button text-foreground hover:text-blue-400 block px-5 py-4 rounded-2xl text-base font-medium w-full text-left transition-all duration-500 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${0.05 * index}s` }}
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
                  className="apple-button text-foreground hover:text-purple-400 flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-medium w-full text-left transition-all duration-500 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${0.05 * navItems.length}s` }}
                >
                  <Search className="h-5 w-5 animate-pulse-scale" />
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
      <main className="pt-14 sm:pt-18">
        
        <section id="home" className="animate-fade-in">
          <Hero />
        </section>
        <section id="portfolio" className="py-12 sm:py-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Portfolio />
        </section>
        <section id="about" className="py-12 sm:py-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <About />
        </section>
        <section id="myaim" className="py-12 sm:py-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <MyAim />
        </section>
        <section id="services" className="py-12 sm:py-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Services />
        </section>
        <section id="contact" className="py-12 sm:py-20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Contact />
        </section>
      </main>

      {/* Footer with glass morphism */}
      <footer className="glass-card border-t border-white/10 animate-fade-in-up">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mx-auto animate-shimmer"></div>
            <p className="text-sm sm:text-base text-muted-foreground">
              © 2025 MH Sami. All rights reserved. 
              <span className="block sm:inline text-amber-400 font-amiri ml-0 sm:ml-2 mt-2 sm:mt-0 animate-glow-pulse">جزاك الله خيرا</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
