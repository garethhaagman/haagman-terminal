import { Radio, Volume2, Monitor, RefreshCw, Twitter, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchUserTweets } from '../../services/twitterService';
import { TweetData } from '../../types/twitter';
import Tweet from '../Tweet';

const MediaSection = () => {
  const [activeStation, setActiveStation] = useState<number | null>(null);
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  const mediaStations = [
    { 
      id: 1, 
      name: "Twitter Feed", 
      frequency: "SW 24.4",
      type: "SOCIAL",
      status: "LIVE" 
    },
  ];

  // Fetch tweets when the Twitter station is selected
  useEffect(() => {
    if (activeStation === 1) {
      fetchTweets();
    }
  }, [activeStation]);

  /**
   * Fetch tweets from the Twitter API
   */
  const fetchTweets = async () => {
    setIsLoading(true);
    setError(null);
    setConnectionError(false);
    console.log("Attempting to fetch tweets...");
    
    try {
      // Get Twitter username from env vars or fallback to default
      const username = import.meta.env.VITE_TWITTER_USERNAME || 'garethhaagman';
      console.log("Using Twitter username:", username);
      
      // Check if API token is available
      if (!import.meta.env.VITE_TWITTER_BEARER_TOKEN) {
        console.error("No Twitter API token found");
        setConnectionError(true);
        setError('transmission link could not be established...');
        setIsLoading(false);
        return;
      }
      
      const tweetData = await fetchUserTweets(username, 5);
      console.log("Tweets fetched successfully:", tweetData);
      setTweets(tweetData);
      // Reset retry count on success
      setRetryCount(0);
    } catch (err) {
      console.error('Error loading tweets:', err);
      setConnectionError(true);
      setError('transmission link could not be established...');
      // Increment retry count
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle refresh button click
   */
  const handleRefreshTweets = () => {
    console.log("Refreshing tweets...");
    fetchTweets();
  };
  
  /**
   * Get error details based on retry count
   */
  const getErrorDetails = () => {
    if (retryCount > 2) {
      return "CRITICAL FAILURE - RATE LIMIT EXCEEDED";
    }
    return "NETWORK STATUS: OFFLINE";
  };
  
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2">
        <Radio className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">MEDIA TRANSMISSIONS</h2>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10">
          <h3 className="text-pipboy-amber text-lg mb-4">FREQUENCY SCANNER</h3>
          
          <div className="space-y-3">
            {mediaStations.map((station) => (
              <div 
                key={station.id}
                onClick={() => setActiveStation(station.id)}
                className={`
                  cursor-pointer border border-pipboy-shadow/30 rounded p-3
                  ${activeStation === station.id ? 'bg-pipboy-shadow/30' : 'bg-pipboy-shadow/10'}
                  hover:bg-pipboy-shadow/20 transition-colors
                `}
              >
                <div className="flex justify-between mb-1">
                  <div className="font-bold">{station.name}</div>
                  <div className="text-pipboy-amber text-sm">{station.frequency}</div>
                </div>
                <div className="flex justify-between text-xs">
                  <div>{station.type}</div>
                  <div className={`
                    ${station.status === 'TRANSMITTING' ? 'text-pipboy-primary animate-pulse' : 
                      station.status === 'STANDBY' ? 'text-pipboy-amber' : 
                      connectionError && activeStation === station.id ? 'text-pipboy-amber' :
                      'text-pipboy-primary/50'}
                  `}>
                    {connectionError && activeStation === station.id ? 'DISCONNECTED' : station.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-pipboy-amber text-lg">SIGNAL MONITOR</h3>
            {activeStation !== null && (
              <div className="flex items-center">
                {activeStation === 1 && !isLoading && (
                  <button 
                    onClick={handleRefreshTweets}
                    className="flex items-center text-pipboy-primary hover:text-pipboy-amber mr-3"
                    title="Refresh tweets"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                {!connectionError ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-1 text-pipboy-primary" />
                    <div className="text-xs">RECEIVING</div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-1 text-pipboy-amber" />
                    <div className="text-xs text-pipboy-amber">OFFLINE</div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {activeStation === 1 ? (
            <div className="h-64 overflow-y-auto pr-1">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-pipboy-primary animate-spin mb-2" />
                  <div className="text-sm">ESTABLISHING CONNECTION...</div>
                </div>
              ) : connectionError ? (
                <div className="h-full flex flex-col items-center justify-center text-pipboy-amber">
                  <AlertTriangle className="w-12 h-12 mb-4 text-pipboy-amber" />
                  <div className="text-center">
                    <div className="mb-2 uppercase">{error}</div>
                    <div className="text-xs mb-4">{getErrorDetails()}</div>
                  </div>
                </div>
              ) : tweets.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-pipboy-primary/50">
                  <Twitter className="w-16 h-16 mb-4" />
                  <div className="text-center">
                    <div>NO TRANSMISSIONS FOUND</div>
                    <div className="text-xs mt-2">BUFFER EMPTY - AWAITING DATA</div>
                    <button 
                      onClick={handleRefreshTweets}
                      className="text-xs border border-pipboy-primary/50 rounded px-3 py-1 mt-4 hover:bg-pipboy-shadow/20"
                    >
                      CHECK TRANSMISSION
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3 flex items-center border-b border-pipboy-shadow/20 pb-2">
                    <Twitter className="w-5 h-5 mr-2 text-pipboy-primary" />
                    <span className="text-sm">@{import.meta.env.VITE_TWITTER_USERNAME || 'garethhaagman'}'s Recent Transmissions</span>
                  </div>
                  {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweet={tweet} />
                  ))}
                </div>
              )}
            </div>
          ) : activeStation !== null ? (
            <div className="h-48 flex flex-col items-center justify-center">
              <Monitor className="w-16 h-16 mb-4 text-pipboy-primary animate-pulse" />
              <div className="text-center">
                <div className="text-sm mb-1">Now streaming content from</div>
                <div className="text-lg font-bold">
                  {mediaStations.find(s => s.id === activeStation)?.name}
                </div>
                <div className="text-xs mt-3 text-pipboy-primary/70">
                  Full access available upon request
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-pipboy-primary/50">
              <Radio className="w-16 h-16 mb-4" />
              <div className="text-center">
                <div>NO SIGNAL SELECTED</div>
                <div className="text-xs mt-2">Select a frequency to monitor</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10 mt-auto">
        <div className="text-xs text-center">
          <span className="text-pipboy-amber">SIGNAL DISCLAIMER:</span> All media appearances and publications subject to industry confidentiality protocols
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
