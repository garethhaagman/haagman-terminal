import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BioSection from './sections/BioSection';
import TimelineSection from './sections/TimelineSection';
import ProjectsSection from './sections/ProjectsSection';
import MediaSection from './sections/MediaSection';
import ContactSection from './sections/ContactSection';
import HaagmanGame from './HaagmanGame';
import { useSoundEffects } from './SoundEffects';
import { useIsMobile } from '@/hooks/use-mobile';

const TerminalInterface = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [isGameOpen, setIsGameOpen] = useState(false);
  const { playClickSound } = useSoundEffects();
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    playClickSound();
    setActiveTab(value);
  };

  // Handle Easter egg activation
  const handleEasterEggClick = () => {
    playClickSound();
    setIsGameOpen(true);
  };

  // Render the HAAG-MAN v1.0 header with clickable "A"
  const renderLogo = () => {
    return (
      <div className="text-pipboy-primary text-xl">
        H
        <span className="text-pipboy-primary">A</span>
        <span 
          className="text-pipboy-primary cursor-pointer hover:text-pipboy-amber transition-colors"
          onClick={handleEasterEggClick}
          title="???"
        >A</span>
        G-MAN v1.0
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 bg-pipboy-background border-b-2 border-pipboy-shadow flex items-center justify-between px-4">
        <div className="text-pipboy-amber text-xl">HAAG-MAN TERMINAL™</div>
        {renderLogo()}
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
            <TabsContent value="status" className="h-full m-0 animate-fade-in">
              <BioSection />
            </TabsContent>
            <TabsContent value="data" className="h-full m-0 animate-fade-in">
              <TimelineSection />
            </TabsContent>
            <TabsContent value="files" className="h-full m-0 animate-fade-in">
              <ProjectsSection />
            </TabsContent>
            <TabsContent value="radio" className="h-full m-0 animate-fade-in">
              <MediaSection />
            </TabsContent>
            <TabsContent value="comms" className="h-full m-0 animate-fade-in">
              <ContactSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Game Dialog */}
      <Dialog open={isGameOpen} onOpenChange={setIsGameOpen}>
        <DialogContent className={`bg-pipboy-background border-pipboy-primary text-pipboy-primary ${isMobile ? 'max-h-[90vh] h-auto max-w-full w-[95%] my-2' : 'max-w-3xl'}`}>
          <HaagmanGame />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TerminalInterface;
