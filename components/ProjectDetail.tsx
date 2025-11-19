
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Copy, Check, Terminal, Cpu, Palette, Camera, ShoppingBag, Maximize2 } from 'lucide-react';
import { ScribbleUnderline, ScribbleCircle, Tape, ScribbleArrow } from './Scribbles';

interface ProjectDetailProps {
  projectId: string;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close animation handler
  const handleClose = () => {
    setMounted(false);
    setTimeout(onClose, 300);
  };

  const renderContent = () => {
    switch (projectId) {
      case 'neon':
        return <NeonCommerceDetail />;
      case 'analogue':
        return <AnalogueArchiveDetail />;
      case 'ai':
        return <AITerminalDetail />;
      case 'branding':
        return <MonoBrandDetail />;
      case 'photo':
        return <PhotoLightTableDetail />;
      default:
        return <div className="p-10">Project not found</div>;
    }
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-off-white/90 backdrop-blur-xl" onClick={handleClose}></div>
      
      {/* Main Container - animates in */}
      <div className={`relative w-full h-full md:w-[95vw] md:h-[90vh] bg-white shadow-2xl overflow-hidden md:rounded-xl transition-all duration-500 transform ${mounted ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:rotate-90 transition-transform shadow-lg border-2 border-white group"
        >
          <X size={24} />
        </button>
        
        {renderContent()}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// SUB-COMPONENTS FOR EACH PROJECT TYPE
// ------------------------------------------------------------------

const NeonCommerceDetail = () => {
  return (
    <div className="w-full h-full bg-[#050505] text-white overflow-y-auto flex flex-col md:flex-row">
      {/* Sidebar / Controls */}
      <div className="w-full md:w-1/3 p-8 border-r border-white/10 flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dirty-lime to-transparent"></div>
        <div className="mb-12">
          <div className="flex items-center gap-2 text-dirty-lime mb-2 font-mono text-xs tracking-widest uppercase">
             <ShoppingBag size={14} /> Project.01
          </div>
          <h2 className="font-display text-6xl font-bold leading-none mb-4">NEON<br/>COMMERCE</h2>
          <p className="text-gray-400 font-sans leading-relaxed">
            A headless Shopify setup designed for high-performance drops, featuring real-time inventory sync and WebGL product previews.
          </p>
        </div>

        <div className="space-y-6 font-mono text-sm">
          <div className="bg-white/5 p-4 rounded border border-white/10 hover:border-dirty-lime transition-colors cursor-pointer group">
             <div className="text-xs text-gray-500 mb-1 group-hover:text-dirty-lime">Tech Stack</div>
             <div className="text-white">Next.js 14 + Shopify Storefront API</div>
          </div>
          <div className="bg-white/5 p-4 rounded border border-white/10 hover:border-dirty-lime transition-colors cursor-pointer group">
             <div className="text-xs text-gray-500 mb-1 group-hover:text-dirty-lime">Performance</div>
             <div className="flex items-center gap-3">
               <div className="w-full bg-gray-800 h-1 rounded-full"><div className="w-[98%] bg-dirty-lime h-full rounded-full"></div></div>
               <span>98/100</span>
             </div>
          </div>
        </div>

        <div className="mt-auto pt-12">
          <button className="w-full py-4 bg-dirty-lime text-black font-bold font-display text-xl hover:bg-white transition-colors uppercase flex items-center justify-center gap-2">
            Visit Live Site <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Interactive Visual Area */}
      <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
         <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>
         
         <div className="h-full flex items-center justify-center p-12">
            <div className="relative w-full max-w-2xl aspect-video border border-white/20 bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_50px_rgba(166,185,61,0.1)] group">
               {/* Fake Browser UI */}
               <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="ml-4 text-xs text-gray-600 font-mono">localhost:3000</div>
               </div>
               {/* Content */}
               <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-dirty-lime font-mono text-sm mb-4 animate-pulse">● LIVE DROP</div>
                  <img src="https://picsum.photos/600/400?random=50" className="w-3/4 rounded shadow-2xl border border-white/10 mb-6 hover:scale-105 transition-transform duration-500" />
                  <h3 className="text-2xl font-display font-bold">Cyberpunk Kicks v2</h3>
                  <p className="text-gray-400">$ 240.00 USD</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const AnalogueArchiveDetail = () => {
  return (
    <div className="w-full h-full bg-[#F0EFE9] text-soft-black overflow-y-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>
      
      <div className="max-w-5xl mx-auto p-8 md:p-16">
         {/* Header Note */}
         <div className="relative inline-block mb-16 rotate-1">
            <div className="bg-yellow-100 p-6 shadow-lg border border-yellow-200/50 transform -rotate-2">
               <Tape className="-top-3 left-1/2 -translate-x-1/2" />
               <h2 className="font-marker text-4xl md:text-6xl mb-2 text-gray-800">The Process Archive</h2>
               <p className="font-mono text-sm text-gray-600">Case Study: Brutalist Blog Theme</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div className="bg-white p-4 pb-12 shadow-md rotate-1 border border-gray-200 transition-transform hover:rotate-0 hover:scale-105 duration-300">
                  <img src="https://picsum.photos/600/400?random=20" className="w-full h-48 object-cover filter grayscale contrast-125" />
                  <p className="font-marker text-xl mt-4 text-center">Initial sketches</p>
               </div>
               
               <div className="prose prose-lg font-serif">
                  <p>
                     We wanted to move away from the "clean corporate" look. The web is messy. Creativity is messy. 
                     Why hide the structure?
                  </p>
                  <p>
                     We used <span className="bg-dirty-lime/30 px-1">CSS Grid</span> in unexpected ways to break the vertical rhythm.
                  </p>
               </div>
            </div>

            <div className="relative mt-12 md:mt-0">
               <div className="absolute top-0 right-0 w-64 h-64 bg-dirty-orange/10 rounded-full blur-3xl"></div>
               <ScribbleArrow className="absolute -top-10 -left-10 w-32 text-soft-black rotate-45" />
               
               <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <h3 className="font-display text-2xl font-bold mb-4 border-b-2 border-black pb-2">Design Rules</h3>
                  <ul className="list-disc pl-5 space-y-3 font-mono text-sm">
                     <li>No border-radius > 2px</li>
                     <li>Serif for body, Sans for headers</li>
                     <li>Overlapping elements allowed</li>
                     <li><span className="line-through text-gray-400">Perfect symmetry</span></li>
                  </ul>
               </div>

               <div className="mt-12 flex gap-4">
                  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs animate-spin-slow">
                     PURE<br/>CSS
                  </div>
                  <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-xs dashed">
                     NO<br/>JS
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const AITerminalDetail = () => {
  const [lines, setLines] = useState([
    "Initializing 'AI_Storyteller_v2'...",
    "Loading model: gemini-2.5-flash...",
    "Connected.",
    "Type a command or just watch the stream."
  ]);
  const [input, setInput] = useState("");

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
       const newLines = [...lines, `> ${input}`, `Processing '${input}'...`, "Output: [Simulated creative text response generated by the neural engine based on your input parameters...]"];
       setLines(newLines);
       setInput("");
    }
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] text-[#00ff00] font-mono p-4 md:p-12 overflow-hidden flex flex-col">
       <div className="border border-[#00ff00]/30 h-full rounded p-6 relative shadow-[0_0_20px_rgba(0,255,0,0.1)] flex flex-col">
          {/* CRT Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>
          <div className="absolute top-4 right-6 text-xs opacity-50">SYS.ADMIN // ROOT</div>
          
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 z-10 custom-scrollbar">
             {lines.map((line, i) => (
                <div key={i} className={`${line.startsWith('>') ? 'text-white' : 'text-[#00ff00]'}`}>
                   {line}
                </div>
             ))}
             <div className="animate-pulse">_</div>
          </div>

          <div className="border-t border-[#00ff00]/30 pt-4 flex items-center gap-2 z-10">
             <span className="text-dirty-lime">$</span>
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleCommand}
               className="bg-transparent outline-none flex-1 text-white placeholder-green-900"
               placeholder="Enter prompt..."
               autoFocus
             />
          </div>
       </div>
    </div>
  );
};

const MonoBrandDetail = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const colors = [
     { name: 'Onyx', hex: '#0F0F0F' },
     { name: 'Paper', hex: '#F5F5F0' },
     { name: 'Clay', hex: '#E0DCD3' },
     { name: 'Signal', hex: '#FF3333' },
  ];

  const copyColor = (hex: string) => {
     navigator.clipboard.writeText(hex);
     setCopied(hex);
     setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full h-full bg-white text-black overflow-y-auto">
       <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
          {/* Left: Visuals */}
          <div className="p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
             <div className="w-24 h-24 bg-black rounded-full mb-12 mx-auto lg:mx-0 animate-float"></div>
             <h1 className="font-display text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8">
                MONO<br/>TYPE.
             </h1>
             <p className="font-sans text-xl max-w-md text-gray-500">
                A radical reduction of visual noise. Identity system for FinTech startup "Zero".
             </p>
          </div>

          {/* Right: Guidelines */}
          <div className="p-12 md:p-24 bg-gray-50">
             <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
                <Palette size={20} /> Color System
             </h3>
             <div className="grid grid-cols-2 gap-4 mb-16">
                {colors.map((c) => (
                   <button 
                     key={c.hex}
                     onClick={() => copyColor(c.hex)}
                     className="group relative h-32 rounded-xl border border-gray-200 p-4 flex flex-col justify-between transition-all hover:scale-105 hover:shadow-xl"
                     style={{ backgroundColor: c.hex }}
                   >
                      <div className={`text-xs font-mono bg-white/20 backdrop-blur px-2 py-1 rounded self-start ${c.hex === '#0F0F0F' || c.hex === '#FF3333' ? 'text-white' : 'text-black'}`}>
                         {c.name}
                      </div>
                      <div className={`flex justify-between items-center ${c.hex === '#0F0F0F' || c.hex === '#FF3333' ? 'text-white' : 'text-black'}`}>
                         <span className="font-mono">{c.hex}</span>
                         {copied === c.hex ? <Check size={16} /> : <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </div>
                   </button>
                ))}
             </div>

             <h3 className="font-display text-2xl font-bold mb-8">Typography</h3>
             <div className="space-y-6 border-l-2 border-black pl-6">
                <div>
                   <span className="text-xs text-gray-400 font-mono block mb-1">Display</span>
                   <span className="text-4xl font-display font-bold">Space Grotesk Bold</span>
                </div>
                <div>
                   <span className="text-xs text-gray-400 font-mono block mb-1">Body</span>
                   <span className="text-xl font-sans">Inter Regular</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const PhotoLightTableDetail = () => {
   const photos = [101, 102, 103, 104, 106]; // Picsum IDs
   
   return (
      <div className="w-full h-full bg-[#222] overflow-hidden flex flex-col relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
         
         {/* Header */}
         <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 z-10 bg-[#222]/90 backdrop-blur">
            <h2 className="text-white font-display text-2xl flex items-center gap-3">
               <Camera className="text-dirty-orange" /> LIGHT TABLE
            </h2>
            <div className="font-mono text-xs text-gray-500">
               ISO 400 / 35MM / TOKYO
            </div>
         </div>

         {/* Scroll Area */}
         <div className="flex-1 overflow-x-auto flex items-center p-8 gap-8 custom-scrollbar">
            {photos.map((id, idx) => (
               <div key={id} className="flex-shrink-0 group relative">
                  {/* Film holes top/bottom */}
                  <div className="absolute -top-4 left-0 w-full h-4 bg-black flex justify-around items-center">
                     {[...Array(10)].map((_, i) => <div key={i} className="w-2 h-3 bg-white/20 rounded-sm"></div>)}
                  </div>
                  <div className="absolute -bottom-4 left-0 w-full h-4 bg-black flex justify-around items-center">
                     {[...Array(10)].map((_, i) => <div key={i} className="w-2 h-3 bg-white/20 rounded-sm"></div>)}
                  </div>

                  <div className="relative w-[300px] md:w-[500px] aspect-[2/3] bg-black border-8 border-black shadow-2xl overflow-hidden cursor-pointer transform group-hover:scale-[1.02] transition-transform">
                     <img src={`https://picsum.photos/seed/${id}/600/900`} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="absolute bottom-4 right-4 text-white/50 font-mono text-xs opacity-0 group-hover:opacity-100">
                        IMG_00{idx + 1}
                     </div>
                  </div>
               </div>
            ))}
            
            {/* End Spacer */}
            <div className="w-24 flex-shrink-0 text-white/20 font-mono text-sm writing-vertical rotate-180 text-center">
               END OF ROLL
            </div>
         </div>
      </div>
   );
};

export default ProjectDetail;
