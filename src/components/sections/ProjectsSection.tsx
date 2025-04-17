
import { FileText, Star } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      name: "AI Risk Scoring Engine",
      year: 2025,
      description: "Uses synthetic-data stress tests to quantify LLM prompt-injection fallout.",
      metrics: ["Advanced algorithm", "Real-time risk assessment", "Patented methodology"]
    },
    {
      name: "Insured NFT Cold Vault",
      year: 2022,
      description: "0 recorded thefts; $500m AUM protected.",
      metrics: ["Industry first", "100% security record", "Institutional-grade protection"]
    },
    {
      name: "EstateSecure™ Policy Suite",
      year: 2015,
      description: "45k policies sold; 98% claims-free.",
      metrics: ["Garethet innovation", "High retention rate", "Award-winning product"]
    }
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2">
        <FileText className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">PROJECTS & ACHIEVEMENTS</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10 hover:bg-pipboy-shadow/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-pipboy-primary pip-text-glow">{project.name}</h3>
              <div className="bg-pipboy-shadow/30 px-2 py-0.5 rounded text-pipboy-amber text-xs">
                {project.year}
              </div>
            </div>
            
            <p className="mb-4 text-pipboy-primary/90">{project.description}</p>
            
            <div className="border-t border-pipboy-shadow/30 pt-3">
              <div className="text-xs text-pipboy-amber uppercase mb-2">Key Metrics</div>
              <ul className="space-y-1">
                {project.metrics.map((metric, i) => (
                  <li key={i} className="flex items-center">
                    <Star className="w-3 h-3 mr-2 text-pipboy-amber" />
                    <span className="text-sm">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10 mt-auto">
        <div className="text-center">
          <div className="text-sm text-pipboy-amber uppercase mb-1">Security Clearance Required</div>
          <div className="text-xs">Additional classified projects available upon request</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
