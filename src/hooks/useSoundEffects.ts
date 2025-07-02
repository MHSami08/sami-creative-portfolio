
import { useCallback, useRef, useState } from 'react';

// Simple beep generation function for cross-browser compatibility
const createAudioBuffer = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
  
  return audioContext;
};

export const useSoundEffects = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitialized = useRef(false);

  // Initialize audio context on first user interaction
  const initAudio = useCallback(() => {
    if (!isInitialized.current && isEnabled) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        isInitialized.current = true;
      } catch (error) {
        console.log('Audio not supported in this browser');
      }
    }
  }, [isEnabled]);

  // Play sound effect using Web Audio API
  const playSound = useCallback((soundName: 'click' | 'hover' | 'success' | 'navigation') => {
    if (!isEnabled) return;
    
    try {
      initAudio();
      
      if (!audioContextRef.current) return;
      
      const audioContext = audioContextRef.current;
      
      // Resume audio context if suspended (required by some browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies and durations for different sounds
      let frequency = 800;
      let duration = 0.1;
      let type: OscillatorType = 'sine';
      
      switch (soundName) {
        case 'click':
          frequency = 1000;
          duration = 0.1;
          type = 'square';
          break;
        case 'hover':
          frequency = 600;
          duration = 0.05;
          type = 'sine';
          break;
        case 'success':
          frequency = 1200;
          duration = 0.2;
          type = 'triangle';
          break;
        case 'navigation':
          frequency = 800;
          duration = 0.15;
          type = 'sine';
          break;
      }
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      // Create a gentle fade out
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
      
    } catch (error) {
      // Silently fail if audio is not supported
      console.log('Could not play sound:', error);
    }
  }, [isEnabled, initAudio]);

  // Toggle sound effects on/off
  const toggleSound = useCallback(() => {
    setIsEnabled(prev => !prev);
    return !isEnabled;
  }, [isEnabled]);

  return {
    playSound,
    toggleSound,
    isEnabled
  };
};
