import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const BootSequence = () => {
  const [text, setText] = useState('');
  const isMobile = useIsMobile();
  
  // Define different text formats for mobile and desktop
  const mobileText = 'Haagman Systems //\nAccessing Firmware v1.0 ...';
  const desktopText = 'Haagman Systems // Accessing Firmware v1.0 ...';
  const fullText = isMobile ? mobileText : desktopText;
  
  useEffect(() => {
    let index = 0;
    let displayText = '';
    
    // Type effect
    const interval = setInterval(() => {
      // For mobile with line breaks, we need special handling
      if (isMobile) {
        const nextChar = fullText[index];
        displayText += nextChar;
        setText(displayText);
      } else {
        setText(fullText.substring(0, index + 1));
      }
      
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, isMobile ? 30 : 40); // Slightly faster typing on mobile for better UX
    
    return () => clearInterval(interval);
  }, [fullText, isMobile]);

  // Function to handle text display with line breaks for mobile
  const displayText = () => {
    if (isMobile) {
      return text.split('\n').map((line, index) => (
        <span key={index} className="block">
          {line}
          {index < text.split('\n').length - 1 && text.includes('\n', index) ? '' : <span className="animate-pulse">_</span>}
        </span>
      ));
    }
    
    return (
      <>
        {text}
        <span className="animate-pulse">_</span>
      </>
    );
  };

  return (
    <div className="h-full flex flex-col animate-crt-flicker">
      <div className={`${isMobile ? 'h-10 py-1' : 'h-12'} bg-pipboy-background border-b-2 border-pipboy-shadow flex items-center px-4 w-full`}>
        <div className={`text-pipboy-amber ${isMobile ? 'text-lg' : 'text-xl'} mx-auto`}>BOOT SEQUENCE INITIATED</div>
      </div>
      {/* This empty div ensures vertical centering by pushing content down */}
      <div className="flex-grow"></div>
      <div className="flex justify-center items-center w-full py-8">
        <div 
          className={`${isMobile ? 'text-xl px-4 py-2 text-center' : 'text-2xl'} pip-text-glow max-w-full`} 
          style={{ fontFamily: 'VT323, monospace' }}
        >
          {displayText()}
        </div>
      </div>
      {/* This empty div ensures vertical centering by pushing content up */}
      <div className="flex-grow"></div>
    </div>
  );
};

export default BootSequence;
