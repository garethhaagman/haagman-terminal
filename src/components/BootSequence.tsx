
import { useEffect, useState } from 'react';

const BootSequence = () => {
  const [text, setText] = useState('');
  const fullText = 'Testudo Systems // Accessing Insuru Guru Firmware v1.0 ...';
  
  useEffect(() => {
    let index = 0;
    // Type effect
    const interval = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center animate-crt-flicker">
      <div className="h-12 bg-pipboy-background border-b-2 border-pipboy-shadow flex items-center px-4">
        <div className="text-pipboy-amber text-xl">BOOT SEQUENCE INITIATED</div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-2xl pip-text-glow" style={{ fontFamily: 'VT323, monospace' }}>
          {text}
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
