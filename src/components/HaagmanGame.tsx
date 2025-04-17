import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSoundEffects } from './SoundEffects';

// Game state types with additional 'loading' state to handle initialization
type GameState = 'loading' | 'playing' | 'won' | 'lost';

/**
 * HAAG-MAN - A hangman-style terminal game with software engineering terminology
 * Displays a word as underscores and reveals letters as they are guessed correctly
 */
const HaagmanGame = () => {
  // Tracking if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);
  const initializedRef = useRef(false);
  
  // Game state
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [remainingAttempts, setRemainingAttempts] = useState<number>(6);
  const [gameState, setGameState] = useState<GameState>('loading');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const { playClickSound, playGameSound } = useSoundEffects();
  
  // Enhanced word bank with longer, more technical software engineering terms
  const wordBank = useMemo(() => [
    'MICROSERVICES',
    'AUTHENTICATION',
    'CONTAINERIZATION',
    'VIRTUALIZATION',
    'INFRASTRUCTURE',
    'DEPENDENCY',
    'POLYMORPHISM',
    'REFACTORING',
    'SERIALIZATION',
    'ASYNCHRONOUS',
    'ORCHESTRATION',
    'DISTRIBUTED',
    'RECURSION',
    'ENCRYPTION',
    'ARCHITECTURE',
    'MIDDLEWARE',
    'CONCURRENCY',
    'SCALABILITY',
    'OPTIMIZATION',
    'DEPLOYMENT',
    'VERSIONING',
    'COMPILATION',
    'ABSTRACTION',
    'INTEGRATION',
    'PERSISTENCE',
    'DEDUPLICATION',
    'PARALLELISM',
    'IDEMPOTENT',
    'BLOCKCHAIN',
    'AUGMENTATION'
  ], []);
  
  // Select a random word from the word bank
  const getRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    // Clone the word to ensure it's a fresh string reference
    return wordBank[randomIndex];
  }, [wordBank]);
  
  // Initialize or reset the game
  const initGame = useCallback(() => {
    if (!isMounted.current) return;
    
    // First set to loading state to prevent visual glitches
    setGameState('loading');
    
    // Get a new word while in loading state (hidden from user)
    const newWord = getRandomWord();
    
    // Use setTimeout to ensure state updates are batched and rendering is smooth
    setTimeout(() => {
      if (!isMounted.current) return;
      
      // Reset game state with the new word
      setWord(newWord);
      setGuessedLetters(new Set());
      setRemainingAttempts(6);
      setGameState('playing');
      playClickSound();
    }, 400); // Slightly longer delay for better transition effect
  }, [getRandomWord, playClickSound]);
  
  // Function specifically for handling retry button clicks
  const handleRetryClick = useCallback(() => {
    if (gameState !== 'won' && gameState !== 'lost') return;
    
    playClickSound();
    initGame();
  }, [initGame, playClickSound, gameState]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Start new game on initial load - with special handling for the first load
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    // Load high score from localStorage if available
    const savedHighScore = localStorage.getItem('haagmanHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    // Pick a word immediately to reduce initialization time
    const initialWord = getRandomWord();
    
    // Set a delay to ensure DOM is ready and initialization is smooth
    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      
      // Apply the initial word and transition to playing state
      setWord(initialWord);
      setGameState('playing');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [getRandomWord]);
  
  // Check win/lose conditions whenever relevant state changes
  useEffect(() => {
    if (gameState !== 'playing' || !word) return;
    
    // Check if all letters in the word have been guessed (win condition)
    const hasWon = word.length > 0 && [...word].every(letter => guessedLetters.has(letter));
    
    if (hasWon) {
      setGameState('won');
      const newScore = score + 1;
      setScore(newScore);
      playGameSound('win');
      
      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('haagmanHighScore', newScore.toString());
      }
    } else if (remainingAttempts <= 0) {
      // Lose condition
      setGameState('lost');
      setScore(0);
      playGameSound('lose');
    }
  }, [word, guessedLetters, remainingAttempts, gameState, score, highScore, playGameSound]);
  
  // Process keyboard input for letter guessing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for game-related keys
      if (/^[A-Z]$/i.test(e.key)) {
        e.preventDefault();
      }
      
      if (gameState !== 'playing') {
        // If game is over, any key will start a new game
        if (gameState === 'won' || gameState === 'lost') {
          initGame();
        }
        return;
      }
      
      const key = e.key.toUpperCase();
      // Only accept letter keys A-Z that haven't been guessed yet
      if (/^[A-Z]$/.test(key) && !guessedLetters.has(key)) {
        // Add the guessed letter to the set
        setGuessedLetters(prev => new Set([...prev, key]));
        
        // Check if the letter is in the word
        if (!word.includes(key)) {
          setRemainingAttempts(prev => prev - 1);
          playGameSound('wrong');
        } else {
          playGameSound('correct');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, guessedLetters, word, playGameSound, initGame]);
  
  // Handle clicking on a letter in the onscreen keyboard
  const handleLetterClick = useCallback((letter: string) => {
    if (gameState !== 'playing' || guessedLetters.has(letter)) return;
    
    // Add the guessed letter to the set
    setGuessedLetters(prev => new Set([...prev, letter]));
    
    // Check if the letter is in the word
    if (!word.includes(letter)) {
      setRemainingAttempts(prev => prev - 1);
      playGameSound('wrong');
    } else {
      playGameSound('correct');
    }
  }, [gameState, guessedLetters, word, playGameSound]);
  
  // Render the word with guessed letters revealed and underscores for hidden letters
  const renderWord = useCallback(() => {
    // Handle loading state with placeholder underscores of consistent length
    if (gameState === 'loading' || !word) {
      // Create a placeholder with fixed length (matching the previous word if available)
      const placeholderLength = word.length || 12;
      
      return (
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <div className="inline-flex items-end space-x-2">
            {Array(placeholderLength).fill(0).map((_, index) => (
              <div 
                key={`placeholder-${index}`}
                className="relative w-7 h-10 flex flex-col items-center justify-end"
              >
                <div className="h-0.5 w-6 mb-1.5 bg-pipboy-shadow/50"></div>
              </div>
            ))}
          </div>
          {gameState === 'loading' && (
            <div className="text-pipboy-primary text-sm animate-pulse mt-2">
              INITIALIZING WORD SEQUENCE...
            </div>
          )}
        </div>
      );
    }
    
    // Handle extremely long words by wrapping if needed
    const lettersPerRow = Math.min(15, word.length);
    const rows = [];
    
    for (let i = 0; i < word.length; i += lettersPerRow) {
      const rowLetters = [...word].slice(i, i + lettersPerRow);
      rows.push(rowLetters);
    }
    
    return (
      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        {rows.map((rowLetters, rowIndex) => (
          <div 
            key={`row-${rowIndex}`}
            className="inline-flex items-end space-x-2"
          >
            {rowLetters.map((letter, letterIndex) => {
              const index = rowIndex * lettersPerRow + letterIndex;
              const isGuessed = guessedLetters.has(letter);
              
              return (
                <div 
                  key={`letter-box-${index}`}
                  className="relative w-7 h-10 flex flex-col items-center justify-end"
                >
                  {/* Letter display - invisible if not guessed */}
                  <div 
                    className={`
                      absolute top-0 inset-x-0 h-8 flex items-center justify-center
                      text-xl font-mono font-bold
                      transition-all duration-300 ease-in-out
                      ${isGuessed 
                        ? 'opacity-100 text-pipboy-primary transform-none' 
                        : 'opacity-0 transform translate-y-1'}
                    `}
                    aria-hidden={!isGuessed}
                  >
                    {letter}
                  </div>
                  
                  {/* Underscore - always visible */}
                  <div 
                    className={`
                      h-0.5 w-6 mb-1.5
                      ${isGuessed ? 'bg-pipboy-primary' : 'bg-pipboy-shadow'}
                      transition-all duration-300 ease-in-out
                      ${isGuessed ? 'transform scale-110' : 'transform-none'}
                    `}
                  ></div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }, [word, guessedLetters, gameState]);
  
  // Render the onscreen keyboard
  const renderKeyboard = useCallback(() => {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    
    // Show disabled keyboard during loading state
    const isDisabled = gameState === 'loading' || gameState !== 'playing';
    
    return (
      <div className="flex flex-col items-center space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-1">
            {row.map(letter => {
              const isGuessed = guessedLetters.has(letter);
              const isInWord = word.includes(letter);
              
              let buttonStyle = 'bg-pipboy-shadow/30 text-pipboy-primary hover:bg-pipboy-shadow/50';
              if (isGuessed) {
                buttonStyle = isInWord 
                  ? 'bg-pipboy-primary/30 text-pipboy-primary' 
                  : 'bg-pipboy-amber/30 text-pipboy-amber';
              }
              
              if (gameState === 'loading') {
                buttonStyle = 'bg-pipboy-shadow/20 text-pipboy-primary/50';
              }
              
              return (
                <button
                  key={`key-${letter}`}
                  onClick={() => handleLetterClick(letter)}
                  disabled={isGuessed || isDisabled}
                  className={`
                    w-8 h-8 flex items-center justify-center rounded
                    ${buttonStyle}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    transition-colors duration-200 ease-in-out
                  `}
                  aria-pressed={isGuessed}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }, [gameState, guessedLetters, word, handleLetterClick]);
  
  // Render the hangman ASCII art visualization
  const renderHaagman = useCallback(() => {
    const stages = [
      [
        '  +---+',
        '  |   |',
        '      |',
        '      |',
        '      |',
        '      |',
        '========='
      ],
      [
        '  +---+',
        '  |   |',
        '  O   |',
        '      |',
        '      |',
        '      |',
        '========='
      ],
      [
        '  +---+',
        '  |   |',
        '  O   |',
        '  |   |',
        '      |',
        '      |',
        '========='
      ],
      [
        '  +---+',
        '  |   |',
        '  O   |',
        ' /|   |',
        '      |',
        '      |',
        '========='
      ],
      [
        '  +---+',
        '  |   |',
        '  O   |',
        ' /|\\  |',
        '      |',
        '      |',
        '========='
      ],
      [
        '  +---+',
        '  |   |',
        '  O   |',
        ' /|\\  |',
        ' /    |',
        '      |',
        '========='
      ],
      [
        '  +---+',
        '  |   |',
        '  O   |',
        ' /|\\  |',
        ' / \\  |',
        '      |',
        '========='
      ]
    ];
    
    // Always show initial stage during loading
    const currentStage = gameState === 'loading' 
      ? 0 
      : Math.min(6, Math.max(0, 6 - remainingAttempts));
      
    const asciiArt = stages[currentStage];
    
    return (
      <div className={`font-mono text-sm text-pipboy-primary mr-4 ${gameState === 'loading' ? 'opacity-50' : ''}`}>
        {asciiArt.map((line, index) => (
          <pre key={`line-${index}`}>{line}</pre>
        ))}
      </div>
    );
  }, [remainingAttempts, gameState]);
  
  // Render game status and messages
  const renderGameStatus = useCallback(() => {
    if (gameState === 'loading') {
      return null;
    } else if (gameState === 'won') {
      return (
        <div className="text-center text-pipboy-primary mb-4 animate-pulse">
          ACCESS GRANTED - SECURITY PROTOCOL BYPASSED
        </div>
      );
    } else if (gameState === 'lost') {
      return (
        <div className="text-center text-pipboy-amber mb-4">
          ACCESS DENIED - SECURITY LOCKOUT INITIATED
        </div>
      );
    }
    return null;
  }, [gameState]);
  
  // Main render
  return (
    <div className="flex flex-col h-full">
      {/* Game header with score and attempts */}
      <div className="flex items-center justify-between mb-4 border-b border-pipboy-shadow pb-2">
        <div className="text-pipboy-amber text-sm">TERMINAL GAME v1.0</div>
        <div className="flex space-x-4">
          <div className="text-pipboy-primary text-sm">
            SCORE: <span className="text-pipboy-amber">{score}</span>
          </div>
          <div className="text-pipboy-primary text-sm">
            HIGH: <span className="text-pipboy-amber">{highScore}</span>
          </div>
          <div className="text-pipboy-primary text-sm">
            TRIES: <span className={`${remainingAttempts <= 2 && gameState === 'playing' ? 'text-pipboy-amber animate-pulse' : 'text-pipboy-primary'}`}>
              {remainingAttempts}
            </span>
          </div>
        </div>
      </div>
      
      {/* Game content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex">
          {/* Left side: Hangman visualization */}
          <div className="w-1/3">
            {renderHaagman()}
          </div>
          
          {/* Right side: Word display and game status */}
          <div className="w-2/3 flex flex-col">
            {renderGameStatus()}
            <div className="transition-opacity duration-300 ease-in-out">
              {renderWord()}
            </div>
            
            {/* Game over actions */}
            {(gameState === 'won' || gameState === 'lost') && (
              <div className="text-center mb-4 animate-fade-in">
                <div className="text-xs text-pipboy-primary/70 mb-2">
                  {gameState === 'lost' ? `The word was: ${word}` : 'Decryption complete'}
                </div>
                <button
                  onClick={handleRetryClick}
                  className="bg-pipboy-shadow/30 text-pipboy-primary hover:bg-pipboy-shadow/50 
                    border border-pipboy-primary/50 px-4 py-1 rounded text-sm
                    transition-all duration-200 hover:bg-pipboy-shadow/70 focus:outline-none focus:ring-2 focus:ring-pipboy-primary/50"
                >
                  {gameState === 'won' ? 'DECRYPT NEXT SEQUENCE' : 'RETRY ACCESS'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Keyboard */}
        <div className="mt-4 transition-opacity duration-300 ease-in-out">
          {renderKeyboard()}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-pipboy-shadow/30">
        <div className="text-xs text-center text-pipboy-primary/70">
          HAAG-MAN SECURITY TERMINAL // 
          {gameState === 'loading' ? 'INITIALIZING...' : 
           gameState === 'playing' ? 'PICK A LETTER OR TYPE TO GUESS' : 
           'PRESS ANY KEY TO CONTINUE'}
        </div>
      </div>
    </div>
  );
};

export default HaagmanGame;