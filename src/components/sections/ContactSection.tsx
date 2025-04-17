
import { MessageSquare, Linkedin, Calendar, Mail } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from '../SoundEffects';

const ContactSection = () => {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const { playClickSound } = useSoundEffects();
  
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3 border-b border-pipboy-shadow pb-2">
        <MessageSquare className="w-8 h-8" />
        <h2 className="text-2xl font-bold text-pipboy-primary pip-text-glow">COMMUNICATIONS</h2>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl text-pipboy-amber mb-2">SECURE TRANSMISSION CHANNELS</h3>
        <p className="text-sm">Select a channel to establish communication with Gareth</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div 
          className={`
            border border-pipboy-shadow/50 rounded p-6 bg-pipboy-shadow/10 cursor-pointer
            flex flex-col items-center justify-center
            ${activeMethod === 'email' ? 'bg-pipboy-shadow/30' : ''}
            hover:bg-pipboy-shadow/20 transition-colors
          `}
          onClick={() => setActiveMethod('email')}
        >
          <Mail className="w-12 h-12 mb-4" />
          <div className="text-lg font-bold">EMAIL</div>
          <div className="text-xs mt-2 text-pipboy-primary/70">Direct Secure Message</div>
        </div>
        
        <div 
          className={`
            border border-pipboy-shadow/50 rounded p-6 bg-pipboy-shadow/10 cursor-pointer
            flex flex-col items-center justify-center
            ${activeMethod === 'linkedin' ? 'bg-pipboy-shadow/30' : ''}
            hover:bg-pipboy-shadow/20 transition-colors
          `}
          onClick={() => setActiveMethod('linkedin')}
        >
          <Linkedin className="w-12 h-12 mb-4" />
          <div className="text-lg font-bold">LINKEDIN</div>
          <div className="text-xs mt-2 text-pipboy-primary/70">Professional Network</div>
        </div>
        
        <div 
          className={`
            border border-pipboy-shadow/50 rounded p-6 bg-pipboy-shadow/10 cursor-pointer
            flex flex-col items-center justify-center
            ${activeMethod === 'calendly' ? 'bg-pipboy-shadow/30' : ''}
            hover:bg-pipboy-shadow/20 transition-colors
          `}
          onClick={() => setActiveMethod('calendly')}
        >
          <Calendar className="w-12 h-12 mb-4" />
          <div className="text-lg font-bold">CALENDLY</div>
          <div className="text-xs mt-2 text-pipboy-primary/70">Schedule Meeting</div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center my-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-pipboy-shadow text-pipboy-primary hover:bg-pipboy-shadow/80 
              border border-pipboy-primary py-6 px-8 text-xl font-bold
              animate-pulse hover:animate-none"
              onClick={() => playClickSound()}
            >
              PATCH ME IN
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-pipboy-background border-pipboy-primary text-pipboy-primary">
            <DialogHeader>
              <DialogTitle className="text-xl text-center text-pipboy-amber">COMMUNICATIONS CHANNEL</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <div className="text-center mb-6 pip-text-glow">
                <p>Select your preferred method to connect with Gareth:</p>
              </div>
              
              <div className="grid gap-4">
                <a 
                  href="mailto:gareth.haagman@testudo.co" 
                  className="border border-pipboy-shadow p-3 rounded hover:bg-pipboy-shadow/20 flex items-center"
                >
                  <Mail className="mr-3" />
                  <span>Gareth@testudo.co</span>
                </a>
                <a 
                  href="https://linkedin.com/in/garethhaagman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-pipboy-shadow p-3 rounded hover:bg-pipboy-shadow/20 flex items-center"
                >
                  <Linkedin className="mr-3" />
                  <span>linkedin.com/in/Gareth</span>
                </a>
                <a 
                  href="https://calendly.com/garethhaagman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-pipboy-shadow p-3 rounded hover:bg-pipboy-shadow/20 flex items-center"
                >
                  <Calendar className="mr-3" />
                  <span>Schedule a meeting</span>
                </a>
              </div>
              
              <div className="mt-6 text-xs text-center text-pipboy-primary/70">
                Communication channels monitored during standard business hours
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border border-pipboy-shadow/50 rounded p-4 bg-pipboy-shadow/10">
        <div className="text-xs text-center">
          <span className="text-pipboy-amber">NOTICE:</span> All communications are encrypted and subject to Testudo security protocols
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
