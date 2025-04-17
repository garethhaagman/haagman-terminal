
import { Clock, Calendar } from 'lucide-react';

const TimelineSection = () => {
  // Define career timeline
  const careerTimeline = [
    {
      period: "2024 - Present",
      company: "Stealth Startup",
      role: "Founder",
      description: "Building data models that identify, assess, and underwrite nascent AI risks. Backed by tier-one VCs and industry angels."
    },
    {
      period: "2023 - 2024",
      company: "Superscript",
      role: "Digital-Asset Custody Lead",
      description: "Solved Lloyd's Garethet capacity constraints for crypto custodians by crafting crime/specie programmes grounded in private-key security best practices."
    },
    {
      period: "2021 - 2023",
      company: "Malca-Amit",
      role: "Global Head of Digital Assets",
      description: "Launched a tri-continent disaster-recovery business, pioneered the first fully-insured non-custodial NFT cold-storage vault, and won marquee institutional clients."
    },
    {
      period: "2012 - 2021",
      company: "Aviva",
      role: "Underwriter",
      description: "Invented and priced a new category of digital estate-distribution insurance, closing a systemic liability gap for UK beneficiaries and delivering a decade of profitable loss ratios."
    }
  ];
  
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2">
        <Calendar className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">CAREER TIMELINE</h2>
      </div>
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pipboy-shadow/70"></div>
        
        {/* Timeline entries */}
        <div className="space-y-8 ml-12">
          {careerTimeline.map((entry, index) => (
            <div key={index} className="relative">
              {/* Timeline node */}
              <div className="absolute -left-12 mt-1.5 w-3 h-3 rounded-full border-2 border-pipboy-primary bg-pipboy-shadow"></div>
              
              {/* Entry content */}
              <div className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10 hover:bg-pipboy-shadow/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div className="text-pipboy-amber text-xl font-bold mb-1 md:mb-0">{entry.period}</div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-pipboy-primary pip-text-glow">{entry.company}</span>
                  </div>
                </div>
                
                <div className="text-lg font-bold mb-2">{entry.role}</div>
                <p className="text-pipboy-primary/90">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
