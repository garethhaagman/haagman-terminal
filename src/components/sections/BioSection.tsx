
import { Shield } from 'lucide-react';

const BioSection = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2">
        <Shield className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">PERSONNEL FILE</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10">
          <div className="text-center">
            <div className="text-xl uppercase pip-text-glow mb-2">Mark</div>
            <div className="text-lg uppercase text-pipboy-amber">"INSURU GURU"</div>
            <div className="mt-4 text-sm border-t border-pipboy-shadow/50 pt-2">
              <div className="flex justify-between">
                <span>CLASS:</span>
                <span>FOUNDER</span>
              </div>
              <div className="flex justify-between">
                <span>SPECIALTY:</span>
                <span>UNDERWRITER</span>
              </div>
              <div className="flex justify-between">
                <span>FACTION:</span>
                <span>DIGITAL-ASSET</span>
              </div>
              <div className="flex justify-between">
                <span>RANK:</span>
                <span>VANGUARD</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10">
          <div className="text-pipboy-primary pip-text-glow text-lg leading-relaxed">
            <p className="mb-4">
              For more than a decade, Mark has engineered first-of-their-kind risk solutions at the frontiers of insurance, blockchain security, and AI.
            </p>
            <p className="mb-4">
              From underwriting novel estate liabilities at Aviva, to safeguarding private keys for the world's largest crypto exchange, to founding a VC-backed stealth startup that quantifies emerging AI exposure, Mark combines actuarial rigour with hacker pragmatism.
            </p>
          </div>
        </div>
        
        <div className="md:col-span-3 border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl text-pipboy-amber uppercase">STATS</h3>
            <div className="text-pipboy-primary text-xs">CALIBRATED 2025</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-box">
              <div className="text-sm uppercase mb-1">Risk Analysis</div>
              <div className="w-full bg-pipboy-shadow/30 h-3 rounded-sm">
                <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="text-sm uppercase mb-1">Blockchain</div>
              <div className="w-full bg-pipboy-shadow/30 h-3 rounded-sm">
                <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="text-sm uppercase mb-1">AI Strategy</div>
              <div className="w-full bg-pipboy-shadow/30 h-3 rounded-sm">
                <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="text-sm uppercase mb-1">Underwriting</div>
              <div className="w-full bg-pipboy-shadow/30 h-3 rounded-sm">
                <div className="bg-pipboy-primary h-full rounded-sm" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSection;
