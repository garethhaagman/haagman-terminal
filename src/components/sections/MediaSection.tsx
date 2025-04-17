
import { Radio, Volume2, Monitor } from 'lucide-react';
import { useState } from 'react';

const MediaSection = () => {
  const [activeStation, setActiveStation] = useState<number | null>(null);
  
  const mediaStations = [
    { 
      id: 1, 
      name: "Crypto Risk Today", 
      frequency: "FM 101.2",
      type: "PODCAST",
      status: "TRANSMITTING"
    },
    { 
      id: 2, 
      name: "AI Insurance Weekly", 
      frequency: "AM 570",
      type: "INTERVIEW",
      status: "STANDBY"
    },
    { 
      id: 3, 
      name: "Underwriter's Digest", 
      frequency: "DAB 11.5",
      type: "PUBLICATION",
      status: "ARCHIVED" 
    },
    { 
      id: 4, 
      name: "The Risk Protocol", 
      frequency: "SW 24.4",
      type: "WHITEPAPER",
      status: "CLASSIFIED" 
    },
  ];
  
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
                      'text-pipboy-primary/50'}
                  `}>
                    {station.status}
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
                <Volume2 className="w-4 h-4 mr-1 text-pipboy-primary" />
                <div className="text-xs">RECEIVING</div>
              </div>
            )}
          </div>
          
          {activeStation !== null ? (
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
