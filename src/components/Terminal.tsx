import { useState, useEffect } from 'react';
import BootSequence from './BootSequence';
import TerminalInterface from './TerminalInterface';
import { useSoundEffects } from './SoundEffects';
import { useIsMobile } from '@/hooks/use-mobile';

const PipBoy = () => {
  const [booting, setBooting] = useState(true);
  const { playBootSound } = useSoundEffects();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Play boot sound and simulate boot sequence
    playBootSound();
    const timer = setTimeout(() => {
      setBooting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [playBootSound]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`relative w-full max-w-4xl ${isMobile ? 'min-h-[50vh]' : 'aspect-[4/3]'} bg-pipboy-background rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl`}>
        {/* CRT Overlay Effect */}
        <div className="absolute inset-0 crt pointer-events-none"></div>
        
        {booting ? (
          <BootSequence />
        ) : (
          <TerminalInterface />
        )}
      </div>
    </div>
  );
};

export default PipBoy;
