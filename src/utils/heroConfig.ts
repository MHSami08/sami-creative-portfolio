// Hero section configuration
export interface HeroStats {
  experience: string;
  projects: string;
  quality: string;
}

const HERO_CONFIG_KEY = 'mh_hero_config';

const defaultStats: HeroStats = {
  experience: '2+',
  projects: '50+',
  quality: '100%'
};

export const getHeroStats = (): HeroStats => {
  try {
    const stored = localStorage.getItem(HERO_CONFIG_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading hero stats:', error);
  }
  return defaultStats;
};

export const saveHeroStats = (stats: HeroStats): void => {
  try {
    localStorage.setItem(HERO_CONFIG_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving hero stats:', error);
  }
};
