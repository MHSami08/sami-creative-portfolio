
import { useCallback, useRef } from 'react';

// Sound effect URLs - using free sounds from various sources
const SOUND_EFFECTS = {
  click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dss2MgBz6a2+/BdSMFl',
  hover: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dss2MgBz6a2+/BdSMFa',
  success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dss2MgBz6a2+/BdSMFc',
  navigation: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/L DciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dss2MgBz6a2+/BdSMFd'
};

export const useSoundEffects = () => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const isEnabled = useRef(true);

  // Initialize audio elements
  const initAudio = useCallback(() => {
    Object.entries(SOUND_EFFECTS).forEach(([key, url]) => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(url);
        audio.volume = 0.3; // Keep volume low for better UX
        audio.preload = 'auto';
        audioRefs.current[key] = audio;
      }
    });
  }, []);

  // Play sound effect
  const playSound = useCallback((soundName: keyof typeof SOUND_EFFECTS) => {
    if (!isEnabled.current) return;
    
    initAudio();
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay restrictions
      });
    }
  }, [initAudio]);

  // Toggle sound effects on/off
  const toggleSound = useCallback(() => {
    isEnabled.current = !isEnabled.current;
    return isEnabled.current;
  }, []);

  return {
    playSound,
    toggleSound,
    isEnabled: isEnabled.current
  };
};
