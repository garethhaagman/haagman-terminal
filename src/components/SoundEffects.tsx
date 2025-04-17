import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

/**
 * Custom hook for managing sound effects throughout the application
 * Handles loading, playing, and unloading of sound assets
 */
export const useSoundEffects = () => {
  // Reference to hold sound instances to prevent recreation on re-renders
  const soundsRef = useRef<{
    boot?: Howl;
    click?: Howl;
    game?: Howl;
  }>({});

  useEffect(() => {
    // Initialize sounds only once on component mount
    soundsRef.current = {
      boot: new Howl({
        src: ['/sounds/boot.mp3'],
        volume: 0.5,
        preload: true
      }),
      
      click: new Howl({
        src: ['/sounds/click.mp3'],
        volume: 0.3,
        preload: true
      }),
      
      // Game sounds with different sprites for different events
      game: new Howl({
        src: ['/sounds/click.mp3'], // Using click sound as fallback
        volume: 0.3,
        preload: true,
        // Define time ranges for different sound effects
        sprite: {
          correct: [0, 300],  // First 300ms for correct guess
          wrong: [0, 300],    // Same sound for wrong guess (can be replaced with different sound)
          win: [0, 500],      // Longer sound for winning
          lose: [0, 500]      // Longer sound for losing
        }
      }),
    };

    // Clean up sounds when component unmounts to prevent memory leaks
    return () => {
      Object.values(soundsRef.current).forEach(sound => {
        if (sound) sound.unload();
      });
    };
  }, []);

  // Play boot sound (used when application starts)
  const playBootSound = () => {
    if (!soundsRef.current.boot) return;
    
    // Stop any current playback and restart
    soundsRef.current.boot.stop();
    soundsRef.current.boot.play();
  };

  // Play UI click/interaction sound
  const playClickSound = () => {
    if (!soundsRef.current.click) return;
    
    // Allow overlapping click sounds for responsive feedback
    soundsRef.current.click.play();
  };
  
  // Play game-specific sounds with different effects for different events
  const playGameSound = (type: 'correct' | 'wrong' | 'win' | 'lose') => {
    if (!soundsRef.current.game) return;
    
    // Play the appropriate sound sprite based on the event type
    soundsRef.current.game.play(type);
  };

  // Return the sound playing functions for use in components
  return {
    playBootSound,
    playClickSound,
    playGameSound,
  };
};
