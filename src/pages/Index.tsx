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
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'My Aim', href: '#myaim' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    playSound('navigation');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation, content and footer remain unchanged */}
    </div>
  );
};

export default Index;
