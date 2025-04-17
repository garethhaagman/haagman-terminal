
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BioSection from './sections/BioSection';
import TimelineSection from './sections/TimelineSection';
import ProjectsSection from './sections/ProjectsSection';
import MediaSection from './sections/MediaSection';
import ContactSection from './sections/ContactSection';
import { useSoundEffects } from './SoundEffects';

const TerminalInterface = () => {
  const [activeTab, setActiveTab] = useState('status');
  const { playClickSound } = useSoundEffects();

  const handleTabChange = (value: string) => {
    playClickSound();
    setActiveTab(value);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 bg-pipboy-background border-b-2 border-pipboy-shadow flex items-center justify-between px-4">
        <div className="text-pipboy-amber text-xl">HAAG-MAN TERMINAL™</div>
        <div className="text-pipboy-primary text-xl">HAAG-MAN v1.0</div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <Tabs 
          defaultValue="status" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="h-full flex flex-col"
        >
          <TabsList className="w-full justify-between border-b border-pipboy-shadow bg-pipboy-background">
            <TabsTrigger 
              value="status" 
              className="data-[state=active]:text-pipboy-primary data-[state=active]:bg-pipboy-shadow/20 text-pipboy-primary/70 flex-1"
            >
              STATUS
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="data-[state=active]:text-pipboy-primary data-[state=active]:bg-pipboy-shadow/20 text-pipboy-primary/70 flex-1"
            >
              DATA
            </TabsTrigger>
            <TabsTrigger 
              value="files" 
              className="data-[state=active]:text-pipboy-primary data-[state=active]:bg-pipboy-shadow/20 text-pipboy-primary/70 flex-1"
            >
              FILES
            </TabsTrigger>
            <TabsTrigger 
              value="radio" 
              className="data-[state=active]:text-pipboy-primary data-[state=active]:bg-pipboy-shadow/20 text-pipboy-primary/70 flex-1"
            >
              RADIO
            </TabsTrigger>
            <TabsTrigger 
              value="comms" 
              className="data-[state=active]:text-pipboy-primary data-[state=active]:bg-pipboy-shadow/20 text-pipboy-primary/70 flex-1"
            >
              COMMS
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="status" className="h-full m-0 animate-slide-in">
              <BioSection />
            </TabsContent>
            <TabsContent value="data" className="h-full m-0 animate-slide-in">
              <TimelineSection />
            </TabsContent>
            <TabsContent value="files" className="h-full m-0 animate-slide-in">
              <ProjectsSection />
            </TabsContent>
            <TabsContent value="radio" className="h-full m-0 animate-slide-in">
              <MediaSection />
            </TabsContent>
            <TabsContent value="comms" className="h-full m-0 animate-slide-in">
              <ContactSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TerminalInterface;
