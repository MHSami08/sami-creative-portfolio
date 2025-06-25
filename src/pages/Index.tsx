
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Contact from '../components/Contact';
import MyAim from '../components/MyAim';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Navigation - Mobile responsive */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-emerald-400/20 shadow-lg shadow-emerald-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex-shrink-0">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
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
                    className="text-foreground hover:text-emerald-400 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-emerald-500/10"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Enhanced Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 border border-emerald-400/30 backdrop-blur-lg shadow-lg hover:shadow-xl group"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun className="h-4 sm:h-5 w-4 sm:w-5 text-amber-400 group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                  <Moon className="h-4 sm:h-5 w-4 sm:w-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 border border-emerald-400/30 backdrop-blur-lg shadow-lg"
                >
                  {isMenuOpen ? <X className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-400" /> : <Menu className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
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
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content with proper spacing for mobile */}
      <main className="pt-14 sm:pt-16">
        <section id="home">
          <Hero />
        </section>
        <section id="about" className="py-8 sm:py-16">
          <About />
        </section>
        <section id="myaim" className="py-8 sm:py-16">
          <MyAim />
        </section>
        <section id="portfolio" className="py-8 sm:py-16">
          <Portfolio />
        </section>
        <section id="services" className="py-8 sm:py-16">
          <Services />
        </section>
        <section id="contact" className="py-8 sm:py-16">
          <Contact />
        </section>
      </main>

      {/* Enhanced Footer - Mobile responsive */}
      <footer className="bg-gradient-to-r from-emerald-900/10 to-blue-900/10 border-t border-emerald-400/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              © 2025 Masrafi Haque Sami. All rights reserved. 
              <span className="block sm:inline text-emerald-400 font-amiri ml-0 sm:ml-2 mt-1 sm:mt-0">جزاك الله خيرا</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
