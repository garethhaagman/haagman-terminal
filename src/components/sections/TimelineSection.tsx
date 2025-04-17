import { Clock, Calendar, ExternalLink } from 'lucide-react';

const TimelineSection = () => {
  // Define career timeline
  const careerTimeline = [
    {
      period: "2024 - Present",
      company: "Testudo Global Inc",
      companyUrl: "https://testudo.co",
      role: "Founding Engineer",
      description: "Building a new category of insurance products covering enterprises against AI liabilities."
    },
    {
      period: "2022 - 2024",
      company: "Goldman Sachs",
      companyUrl: "https://goldmansachs.com",
      role: "Software Engineer",
      description: "Full-stack software engineering role at Goldman Sachs in London, working on enterprise-scale financial systems. Contributed to pioneering AI projects in asset management, portfolio management, and client reporting."
    },
    {
      period: "2021",
      company: "The University of Edinburgh",
      companyUrl: "https://ed.ac.uk",
      role: "AI Research Internship",
      description: "Developed machine learning models for residential building classification in Zimbabwe using high-resolution satellite imagery. Implemented Vision Transformer architecture for building segmentation and created algorithms to extract and classify roof materials from 50cm spatial resolution satellite data, supporting sustainable development goals through geospatial analysis."
    },
    {
      period: "2020 - 2021",
      company: "Silver Lining Gallery",
      companyUrl: "https://silverlininggallery.com",
      role: "Founder",
      description: "Co-founded a non-profit startup selling artwork in aid of Make-A-Wish UK, developing the platform that was the sole distributor of Make-A-Wish UK's official Christmas cards in 2020."
    }
  ];
  
  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <div className="flex items-center gap-2 border-b border-pipboy-shadow pb-1 mb-2">
        <Calendar className="w-6 h-6" />
        <h2 className="text-xl font-bold text-pipboy-primary pip-text-glow">CAREER TIMELINE</h2>
      </div>
      
      <div className="grid grid-rows-4 gap-2 flex-1 overflow-hidden">
        {careerTimeline.map((entry, index) => (
          <div key={index} className="border border-pipboy-shadow/50 rounded py-2 px-4 bg-pipboy-shadow/10 hover:bg-pipboy-shadow/20 transition-colors flex flex-col">
            <div className="flex justify-between items-center">
              <div className="text-pipboy-amber text-base font-bold">{entry.period}</div>
              <div className="flex items-center">
                <a 
                  href={entry.companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pipboy-primary pip-text-glow text-sm hover:underline flex items-center"
                >
                  {entry.company}
                  <ExternalLink className="w-3 h-3 ml-1 inline" />
                </a>
              </div>
            </div>
            
            <div className="font-bold text-sm">{entry.role}</div>
            <p className="text-pipboy-primary/90 text-xs line-clamp-3">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
