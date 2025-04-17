import { Shield } from 'lucide-react';

const BioSection = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2 mb-4">
        <Shield className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">PERSONNEL FILE</h2>
      </div>
      
      <div className="grid md:grid-cols-4 gap-4 flex-1">
        <div className="md:col-span-1 border border-pipboy-shadow/50 rounded p-3 bg-pipboy-shadow/10 h-full flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="text-lg uppercase pip-text-glow mb-1">Gareth Haagman</div>
            <div className="text-sm uppercase text-pipboy-amber">"GAZZA-TRON"</div>
            <div className="mt-3 text-xs border-t border-pipboy-shadow/50 pt-2">
              <div className="flex justify-between">
                <span>CLASS:</span>
                <span>FOUNDING ENGINEER</span>
              </div>
              <div className="flex justify-between">
                <span>SPECIALTY:</span>
                <span>SOFTWARE ENGINEER</span>
              </div>
              <div className="flex justify-between">
                <span>FACTION:</span>
                <span>ARTIFICIAL INTELLIGENCE</span>
              </div>
              <div className="flex justify-between">
                <span>RANK:</span>
                <span>SPECIALIST</span>
              </div>
            </div>
            
            <div className="mt-3 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-pipboy-amber uppercase text-xs">STATS</h3>
                <div className="text-pipboy-primary text-xs">2025</div>
              </div>
              
              <div className="space-y-1">
                <div className="stat-box">
                  <div className="text-xs uppercase mb-0.5 text-left">Artificial Intelligence</div>
                  <div className="w-full bg-pipboy-shadow/30 h-1.5 rounded-sm">
                    <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="text-xs uppercase mb-0.5 text-left">Full Stack Engineering</div>
                  <div className="w-full bg-pipboy-shadow/30 h-1.5 rounded-sm">
                    <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="text-xs uppercase mb-0.5 text-left">DevOps</div>
                  <div className="w-full bg-pipboy-shadow/30 h-1.5 rounded-sm">
                    <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="text-xs uppercase mb-0.5 text-left">Product Design</div>
                  <div className="w-full bg-pipboy-shadow/30 h-1.5 rounded-sm">
                    <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-grow"></div>
          </div>
        </div>
        
        <div className="md:col-span-3 border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10 h-full flex flex-col">
          <div className="text-pipboy-primary pip-text-glow text-base leading-relaxed flex-1 flex flex-col">
            <div className="flex items-center mb-3 border-b border-pipboy-shadow/30 pb-2">
              <div className="text-pipboy-amber uppercase font-bold">// CURRENT ASSIGNMENT</div>
            </div>
            <p className="mb-4 flex items-start">
              <span className="text-pipboy-amber mr-2">&gt;</span>
              <span>Gareth is the founding engineer at a London and San Francisco-based insurance startup building a risk selection and portfolio monitoring platform for underwriters. He leads the end-to-end design and development of tools that streamline underwriting, automate reporting, and surface insights for risk acceptance and pricing.</span>
            </p>
            
            <div className="flex items-center my-3 border-b border-pipboy-shadow/30 pb-2">
              <div className="text-pipboy-amber uppercase font-bold">// BACKGROUND</div>
              <div className="ml-auto text-xs text-pipboy-primary/70">[CLASSIFIED]</div>
            </div>
            <p className="mb-auto flex items-start">
              <span className="text-pipboy-amber mr-2">&gt;</span>
              <span>Previously, Gareth worked as a software engineer at Goldman Sachs in the Asset and Wealth Management division, where he contributed to both artificial intelligence and automated reporting initiatives. He also holds a part-time master's in Software Engineering from the University of Warwick and a degree in Mathematics from the University of Exeter.</span>
            </p>      
            <div className="mt-4 border border-pipboy-shadow/30 p-2 bg-pipboy-shadow/5 rounded text-center text-sm">
              <span className="text-pipboy-amber">SYSTEM NOTE:</span> Subject demonstrates exceptional problem-solving capabilities under pressure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSection;
