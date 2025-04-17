import { ExternalLink, FileText, Star } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      name: "Tortoise Underwriting Platform",
      year: 2025,
      description: "A comprehensive platform enabling underwriters to assess, price, and manage generative AI liability risks with real-time data on incidents, regulations, and litigation. Includes advanced portfolio monitoring and accumulation control capabilities.",
      metrics: ["Insurtech", "Real-time risk assessment", "Patented methodology"]
    },
    {
      name: "AI Driven Application Support Workflow Automation",
      year: 2023,
      description: "Dissertation research project at Goldman Sachs exploring how LLMs can transform application support workflows in Asset and Wealth Management, creating intelligent automation systems that reduce manual intervention and improve operational efficiency.",
      metrics: ["AI Driven", "Workflow automation", "Asset Management"]
    },
    {
      name: "Silver Lining Gallery",
      year: 2020,
      description: "Online e-commerce platform developed to sell artwork benefiting the Make-A-Wish Foundation. Integrated PayPal Payments API for secure transactions and streamlined the donation process, becoming the official distributor for Make-A-Wish UK's Christmas cards.",
      metrics: ["Charity e-commerce", "PayPal API integration", "Non-profit"]
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2">
        <FileText className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">PROJECTS & ACHIEVEMENTS</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 h-[calc(100%-5rem)] py-4">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10 hover:bg-pipboy-shadow/20 transition-colors flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-pipboy-primary pip-text-glow">{project.name}</h3>
              <div className="bg-pipboy-shadow/30 px-2 py-0.5 rounded text-pipboy-amber text-xs">
                {project.year}
              </div>
            </div>
            
            <div className="overflow-hidden flex-grow">
              <p className="text-sm text-pipboy-primary/90 mb-3">{project.description}</p>
              
              <div className="border-t border-pipboy-shadow/30 pt-2">
                <div className="text-xs text-pipboy-amber uppercase mb-2">Key Features</div>
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
          </div>
        ))}
      </div>
      
      <div className="border border-pipboy-shadow/50 rounded p-3 bg-pipboy-shadow/10 mt-auto">
        <div className="text-center">
          <div className="text-sm text-pipboy-amber uppercase mb-1">Security Clearance Required</div>
          <div className="text-xs">
            Additional classified projects available on <a href="https://github.com/garethhaagman" target="_blank" rel="noopener noreferrer" className="text-pipboy-primary hover:underline inline-flex items-center">GitHub <ExternalLink className="w-3 h-3 ml-1" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
