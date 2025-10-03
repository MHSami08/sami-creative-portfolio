// Hero Section Configuration
// This file stores customizable hero section data

export interface HeroStats {
  experience: string;
  projects: string;
  quality: string;
}

export const getHeroStats = (): HeroStats => {
  const storedStats = localStorage.getItem('heroStats');
  if (storedStats) {
    return JSON.parse(storedStats);
  }
  
  // Default values
  return {
    experience: '1+',
    projects: '20+',
    quality: 'Best'
  };
};

export const setHeroStats = (stats: HeroStats): void => {
  localStorage.setItem('heroStats', JSON.stringify(stats));
};
