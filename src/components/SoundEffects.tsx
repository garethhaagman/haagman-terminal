
import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export const useSoundEffects = () => {
  const soundsRef = useRef<{
    boot?: Howl;
    click?: Howl;
  }>({});

  useEffect(() => {
    // Initialize sounds
    soundsRef.current = {
      boot: new Howl({
        src: ['/sounds/boot.mp3'],
        volume: 0.5,
      }),
      click: new Howl({
        src: ['/sounds/click.mp3'],
        volume: 0.3,
      }),
    };

    return () => {
      // Clean up sounds when component unmounts
      if (soundsRef.current.boot) {
        soundsRef.current.boot.unload();
      }
      if (soundsRef.current.click) {
        soundsRef.current.click.unload();
      }
    };
  }, []);

  const playBootSound = () => {
    soundsRef.current.boot?.play();
  };

  const playClickSound = () => {
    soundsRef.current.click?.play();
  };

  return {
    playBootSound,
    playClickSound,
  };
};
