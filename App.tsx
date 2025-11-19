
import React, { useState, useRef } from 'react';
import { ArrowDownRight, Code, Palette, Bot, Mail, Plus, ExternalLink, Zap, Layers, Heart, Stamp, Camera, PenTool, ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import Navigation from './components/Navigation';
import GeminiAgent from './components/GeminiAgent';
import { ScribbleUnderline, ScribbleCircle, ScribbleArrow, Tape } from './components/Scribbles';
import { AppSection, Project } from './types';

// ----------------------------------------------------------------------
// CONFIGURATION: DATA
// ----------------------------------------------------------------------

// Utility to create the URL automatically based on client requirement
const makeUrl = (title: string) => 
  `https://www.lucez.it/portfolios/${title.toLowerCase().trim().replace(/\s+/g, '-')}/`;

const PROJECTS_DATA: Project[] = [
  {
    id: '01',
    title: 'ANTICA BELVEDERE',
    subtitle: 'Hospitality',
    category: 'Web Design',
    image: 'https://www.lucez.it/wp-content/uploads/2025/05/belvedere.png', 
    description: 'Luxury hospitality experience.',
    link: makeUrl('ANTICA BELVEDERE'),
    tags: ['Wordpress']
  },
  {
    id: '02',
    title: 'LAPINKA',
    subtitle: 'E-Commerce',
    category: 'Shopify',
    image: 'https://www.lucez.it/wp-content/uploads/2025/05/lapinka.png',
    description: 'Modern retail experience.',
    link: makeUrl('LAPINKA'),
    tags: ['Shopify']
  },
  {
    id: '03',
    title: 'ACETOUR',
    subtitle: 'Travel Agency',
    category: 'Web Design',
    image: 'https://www.lucez.it/wp-content/uploads/2025/05/acetour.png', 
    description: 'Immersive travel portal.',
    link: makeUrl('ACETOUR'),
    tags: ['UX/UI']
  },
  {
    id: '04',
    title: 'MERRTAXI',
    subtitle: 'Urban Mobility',
    category: 'Service',
    image: 'https://www.lucez.it/wp-content/uploads/2025/05/merrtaxi.png', // REPLACE WITH YOUR MOCKUP URL
    description: 'Transport services platform.',
    link: makeUrl('MERRTAXI'),
    tags: ['App']
  },
  {
    id: '05',
    title: 'NASTYTHONGS',
    subtitle: 'Fashion',
    category: 'E-commerce',
    image: 'https://www.lucez.it/wp-content/uploads/2024/08/3.png',
    description: 'Edgy fashion retail.',
    link: makeUrl('NASTYTHONGS'),
    tags: ['WooCommerce']
  },
  {
    id: '06',
    title: 'BEING COOL IS NICE',
    subtitle: 'Lifestyle',
    category: 'Personal Brand',
    image: 'https://www.lucez.it/wp-content/uploads/2024/08/3.jpg',
    description: 'Lifestyle magazine layout.',
    link: makeUrl('BEING COOL IS NICE'),
    tags: ['Editorial']
  },
  {
    id: '07',
    title: 'STECCA OPTOMETRIA',
    subtitle: 'Medical',
    category: 'Website & Photography',
    image: 'https://www.lucez.it/wp-content/uploads/2024/08/6-1.png',
    description: 'Clinical precision design.',
    link: makeUrl('STECCA OPTOMETRIA'),
    tags: ['Clean']
  },
  {
    id: '08',
    title: 'MOSAIKON',
    subtitle: 'Mechanic',
    category: 'Website',
    image: 'https://www.lucez.it/wp-content/uploads/2024/08/4-1.png',
    description: 'Digital mosaic showcase.',
    link: makeUrl('MOSAIKON'),
    tags: ['Gallery']
  },
  {
    id: '09',
    title: 'ROMEHOSTING',
    subtitle: 'Real Estate',
    category: 'Booking Website',
    image: 'https://www.lucez.it/wp-content/uploads/2024/08/2-1.png',
    description: 'Rental management system.',
    link: makeUrl('ROMEHOSTING'),
    tags: ['Booking']
  },
  {
    id: '10',
    title: 'PAVIN',
    subtitle: 'Luxury Retail',
    category: 'Website',
    image: 'https://www.lucez.it/wp-content/uploads/2024/08/5-1.png',
    description: 'High-end retail presentation.',
    link: makeUrl('PAVIN'),
    tags: ['Design']
  },
];

// --- EDIT HERE: CLIENT LOGOS ---
// Replace the URLs inside the 'logo' property with your own image paths.
const CLIENTS_DATA = [
  { name: 'Client 1', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1.png' },
  { name: 'Client 2', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia.png' },
  { name: 'Client 3', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-2.png' },
  { name: 'Client 4', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-3.png' },
  { name: 'Client 5', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-4.png' },
  { name: 'Client 6', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-5.png' },
  { name: 'Client 7', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-6.png' },
  { name: 'Client 8', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-7.png' },
  { name: 'Client 9', logo: 'https://www.lucez.it/wp-content/uploads/2024/08/a_Tavola-disegno-1-copia-8.png' }
];

const App: React.FC = () => {
  
  // State for pagination (showing only 4 initially)
  const [visibleCount, setVisibleCount] = useState(4);
  
  // State for Chaos Mode
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, color: string, size: number, rot: number}[]>([]);

  const handleProjectClick = (link: string) => {
    window.open(link, '_blank');
  };

  const triggerChaos = () => {
    // 1. Shake Screen
    setIsShaking(true);

    // 2. Generate Particles
    const colors = ['#D95D39', '#A6B93D', '#1A1918'];
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 5,
      rot: Math.random() * 360
    }));
    setParticles(newParticles);

    // 3. Scroll to Next Section
    setTimeout(() => {
       const servicesSection = document.getElementById(AppSection.SERVICES);
       if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
       }
    }, 600);

    // 4. Cleanup
    setTimeout(() => {
       setIsShaking(false);
       setParticles([]);
    }, 1500);
  };

  const visibleProjects = PROJECTS_DATA.slice(0, visibleCount);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden bg-off-white text-soft-black selection:bg-dirty-lime selection:text-black ${isShaking ? 'animate-shake' : ''}`}>
      <Navigation />
      
      {/* PARTICLE OVERLAY */}
      {particles.length > 0 && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
           {particles.map(p => (
              <div 
                key={p.id}
                className="absolute animate-ping opacity-0"
                style={{
                   left: `${p.x}vw`,
                   top: `${p.y}vh`,
                   width: `${p.size}px`,
                   height: `${p.size}px`,
                   backgroundColor: p.color,
                   transform: `rotate(${p.rot}deg)`,
                   animationDuration: `${Math.random() * 0.5 + 0.5}s`
                }}
              />
           ))}
        </div>
      )}
      
      {/* HERO SECTION */}
      <section id={AppSection.HERO} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 relative">
              <h1 className="font-display text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter mix-blend-darken">
                DIGITAL <br />
                <span className="italic text-dirty-orange ml-8 md:ml-16">ARTISAN</span>. <br />
                WEB <br />
                ARCHITECT.
              </h1>
              <div className="md:ml-24 max-w-md relative">
                <Tape className="-top-4 -left-8 -rotate-3" />
                <p className="font-sans text-lg md:text-xl leading-relaxed text-gray-700 border-l-2 border-dirty-lime pl-6 py-2">
                  I build digital ecosystems with a human touch. 
                  Blending raw creativity with strict code. 
                  WordPress expert, Brand shaper, AI tinkerer.
                </p>
              </div>
              <div className="mt-8 flex gap-4 items-center md:ml-24">
                 <button 
                   onClick={triggerChaos}
                   className="group px-8 py-4 bg-soft-black text-white font-display text-lg rounded-full flex items-center gap-3 hover:bg-dirty-orange transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0px_0px_#A6B93D]"
                 >
                    See the chaos <Zap className="group-hover:scale-125 transition-transform" fill="currentColor" />
                 </button>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-5 relative h-[600px]">
              
              {/* JEDI / SITH HOVER IMAGE CONTAINER */}
              <div className="absolute top-10 right-10 w-72 h-96 bg-gray-200 rotate-3 shadow-2xl overflow-hidden border-4 border-white group cursor-pointer">
                 
                 {/* --- EDIT HERE: JEDI IMAGE (DEFAULT) --- */}
                 <img 
                    src="https://www.lucez.it/wp-content/uploads/2025/11/Generated-Image-November-19-2025-6_41PM.png" 
                    alt="LuceZ Jedi" 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" 
                 />
                 
                 {/* --- EDIT HERE: SITH IMAGE (HOVER) --- */}
                 <img 
                    src="https://www.lucez.it/wp-content/uploads/2025/11/Generated-Image-November-19-2025-6_42PM.png" 
                    alt="LuceZ Sith" 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100" 
                 />

              </div>

              <div className="absolute top-40 left-0 w-64 h-64 bg-dirty-lime mix-blend-multiply opacity-80 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 left-10 w-60 h-80 bg-white -rotate-2 shadow-xl p-3 border border-gray-200">
                 {/* --- EDIT HERE: SECONDARY HERO GIF OR IMAGE --- */}
                 <img src="https://www.lucez.it/wp-content/uploads/2025/11/GeneratedFileNovember192025-6_48PM-ezgif.com-optimize.gif" alt="Detail" className="w-full h-full object-cover" />
                 <Tape className="-top-3 left-10 rotate-2" />
              </div>
              <ScribbleArrow className="absolute bottom-10 right-20 w-32 text-dirty-orange rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO SECTION */}
      <section id={AppSection.SERVICES} className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/10 pb-6">
             <h2 className="font-display text-5xl md:text-7xl font-bold relative inline-block">
               MY CRAFT
               <ScribbleUnderline className="text-dirty-lime absolute -bottom-2 left-0 w-full" />
             </h2>
             <p className="font-sans text-gray-500 mt-4 md:mt-0 max-w-xs text-right">
               Non-standard solutions for complex digital identities.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
             
             {/* 1. Web Ecosystems (Standard) */}
             <div className="relative group">
               <div className="absolute inset-0 bg-gray-200 transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform rounded-lg"></div>
               <div className="relative bg-white border-2 border-black p-8 rounded-lg h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-14 h-14 bg-dirty-orange text-white rounded-full flex items-center justify-center mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Code size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">Web Ecosystems</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Custom WordPress themes, headless architectures, and high-conversion e-commerce. 
                      Living digital spaces.
                    </p>
                  </div>
               </div>
             </div>

             {/* 2. Branding (Offset Down) */}
             <div className="relative group md:mt-12">
               <div className="absolute inset-0 bg-dirty-lime/30 transform -translate-x-2 translate-y-2 group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform rounded-lg"></div>
               <div className="relative bg-white border-2 border-black p-8 rounded-lg h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-6 border-2 border-gray-500 shadow-[4px_4px_0px_0px_#A6B93D]">
                      <Stamp size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">Branding</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Logos, visual systems, and tone of voice. Building identities that people actually remember.
                    </p>
                  </div>
               </div>
             </div>

             {/* 3. Creative Direction (Offset Slightly) */}
             <div className="relative group md:mt-4">
               <div className="absolute inset-0 bg-dirty-orange/20 transform translate-x-2 -translate-y-2 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform rounded-lg"></div>
               <div className="relative bg-white border-2 border-black p-8 rounded-lg h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-14 h-14 bg-off-white text-black rounded-full flex items-center justify-center mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Palette size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">Creative Direction</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Visual storytelling, messy layouts, and typography that shouts.
                    </p>
                  </div>
               </div>
             </div>

             {/* 4. Photography (Row 2) */}
             <div className="relative group md:mt-8">
               <div className="absolute inset-0 bg-gray-300 transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform rounded-lg"></div>
               <div className="relative bg-white border-2 border-black p-8 rounded-lg h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-14 h-14 bg-dirty-lime text-black rounded-full flex items-center justify-center mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Camera size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">Photography</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Street aesthetic, raw textures, and product shots. Capturing reality to ground the digital.
                    </p>
                  </div>
               </div>
             </div>

             {/* 5. Content Creation (Row 2 - Offset Match) */}
             <div className="relative group md:mt-16">
               <div className="absolute inset-0 bg-black/5 transform -translate-x-2 translate-y-2 group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform rounded-lg"></div>
               <div className="relative bg-white border-2 border-black p-8 rounded-lg h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-14 h-14 bg-dirty-orange text-white rounded-full flex items-center justify-center mb-6 border-2 border-black shadow-[4px_4px_0px_0px_#A6B93D]">
                      <PenTool size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">Content Creation</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Copywriting, social assets, and narrative shaping. Words that cut through the noise.
                    </p>
                  </div>
               </div>
             </div>

             {/* 6. AI & Automation (Last) */}
             <div className="relative group md:mt-12">
               <div className="absolute inset-0 bg-dirty-lime/10 transform translate-x-2 -translate-y-2 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform rounded-lg"></div>
               <div className="relative bg-white border-2 border-black p-8 rounded-lg h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-6 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Bot size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">AI & Automation</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Implementing GenAI agents, automating boring workflows, and building smart interfaces.
                    </p>
                  </div>
               </div>
             </div>

          </div>
        </div>
      </section>

      {/* PROJECTS SECTION (GRID) */}
      <section id={AppSection.PROJECTS} className="py-24 bg-white text-soft-black overflow-hidden relative">
         {/* Background Noise */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50"></div>
         
         <div className="container mx-auto px-4 relative z-10">
           <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6 border-b-2 border-black pb-8">
             <div>
               <div className="flex items-center gap-3 mb-2">
                 <span className="w-3 h-3 bg-dirty-orange rounded-full animate-pulse"></span>
                 <span className="font-mono text-black text-xs tracking-widest uppercase">Selected Works</span>
               </div>
               <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                 PROJECT <br /> ARCHIVE
               </h2>
             </div>
             <div className="font-mono text-right">
                <div className="text-xl font-bold">{visibleCount} / {PROJECTS_DATA.length}</div>
                <div className="text-gray-500 text-xs">PROJECTS LOADED</div>
             </div>
           </div>

           {/* 2-Column Grid with Staggered Animation */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              {visibleProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group cursor-pointer flex flex-col gap-6 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                  onClick={() => handleProjectClick(project.link)}
                >
                  {/* Image Container - Standard Aspect for Mockups */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden border border-black/5 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
                     <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Loading placeholder effect */}
                     <img 
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                     />
                     
                     {/* Overlay on hover */}
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                        <div className="bg-white text-black px-6 py-3 rounded-full font-display font-bold text-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl flex items-center gap-2">
                           View Project <ArrowDownRight size={18} />
                        </div>
                     </div>
                  </div>

                  {/* Typography */}
                  <div className="flex flex-col border-t border-black/10 pt-4">
                     <div className="flex items-start justify-between">
                        <h3 className="font-display text-4xl lg:text-5xl font-bold uppercase leading-none tracking-tight group-hover:text-dirty-orange transition-colors">
                           {project.title}
                        </h3>
                        <span className="font-mono text-sm text-gray-400 font-bold">{(index + 1).toString().padStart(2, '0')}</span>
                     </div>
                     <div className="mt-2 flex gap-3 font-mono text-xs uppercase tracking-wider text-gray-500">
                        <span className="text-black">{project.category}</span>
                        <span className="text-gray-300">/</span>
                        <span>{project.subtitle}</span>
                     </div>
                  </div>
                </div>
              ))}
           </div>

           {/* UNLOCK ARCHIVE BUTTON */}
           {visibleCount < PROJECTS_DATA.length && (
               <div className="flex justify-center mt-16">
                  <button 
                    onClick={() => setVisibleCount(PROJECTS_DATA.length)}
                    className="group relative px-8 py-4 bg-white border-2 border-black text-black font-display text-xl font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center gap-3"
                  >
                     UNLOCK FULL ARCHIVE <Plus className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
               </div>
           )}

         </div>
      </section>

      {/* CLIENTS SECTION (MARQUEE SLIDER) */}
      <section className="py-16 bg-white border-t border-black/5 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
            <div className="flex items-center justify-center gap-2 opacity-50">
               <span className="w-2 h-2 bg-dirty-lime rounded-full"></span>
               <span className="font-mono text-xs tracking-[0.3em] uppercase">Trusted By</span>
            </div>
        </div>
        
        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
           <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
           
           <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused] items-center">
              {/* Duplicate list for infinite loop effect */}
              {[...CLIENTS_DATA, ...CLIENTS_DATA].map((client, i) => (
                 <div key={i} className="mx-8 md:mx-16 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100 cursor-pointer">
                     {/* INCREASED SIZE HERE */}
                     <img 
                       src={client.logo} 
                       alt={client.name} 
                       className="h-20 md:h-32 w-auto object-contain" 
                     />
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* MANIFESTO SECTION (Replaces Cache Memory) */}
      <section id={AppSection.RESOURCES} className="py-32 bg-soft-black text-off-white overflow-hidden relative flex flex-col justify-center">
         {/* Top Marquee */}
         <div className="w-full overflow-hidden border-b border-white/10 py-4 mb-16 bg-white/5">
           <div className="whitespace-nowrap animate-marquee">
             <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white mx-8">RAW CREATIVITY • STRICT CODE • DIGITAL CHAOS • HUMAN TOUCH • </span>
             <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white mx-8">RAW CREATIVITY • STRICT CODE • DIGITAL CHAOS • HUMAN TOUCH • </span>
             <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white mx-8">RAW CREATIVITY • STRICT CODE • DIGITAL CHAOS • HUMAN TOUCH • </span>
             <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white mx-8">RAW CREATIVITY • STRICT CODE • DIGITAL CHAOS • HUMAN TOUCH • </span>
           </div>
         </div>

         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Title */}
               <div className="lg:col-span-4">
                 <div className="sticky top-32">
                    <div className="flex items-center gap-2 mb-4 text-dirty-lime">
                       <Zap size={20} fill="currentColor" />
                       <span className="font-mono text-xs tracking-[0.2em] uppercase">Philosophy</span>
                    </div>
                    <h2 className="font-display text-7xl font-bold leading-none tracking-tighter mb-8">
                       THE<br/>MANI<br/>FESTO
                    </h2>
                    <p className="font-sans text-gray-400 leading-relaxed max-w-xs">
                       We don't do boring. We don't do standard. We build digital experiences that demand attention.
                    </p>
                 </div>
               </div>

               {/* Principles */}
               <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Principle 1 */}
                  <div className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Layers size={100} />
                     </div>
                     <div className="font-mono text-dirty-lime text-sm mb-4">01 // INTENTIONAL IMPERFECTION</div>
                     <h3 className="font-display text-3xl font-bold mb-4">PIXELS WITH SOUL.</h3>
                     <p className="text-gray-400 font-sans leading-relaxed">
                        The web has become too sterile. We inject noise, asymmetry, and texture back into the digital landscape. Perfection is boring; character is everything.
                     </p>
                  </div>

                  {/* Principle 2 */}
                  <div className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-sm relative overflow-hidden md:mt-12">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Code size={100} />
                     </div>
                     <div className="font-mono text-dirty-orange text-sm mb-4">02 // SYSTEMATIC CHAOS</div>
                     <h3 className="font-display text-3xl font-bold mb-4">STRUCTURED FREEDOM.</h3>
                     <p className="text-gray-400 font-sans leading-relaxed">
                        Chaos without a grid is just a mess. We master the rules of code only so we can break them effectively. Every glitch is calculated.
                     </p>
                  </div>

                  {/* Principle 3 */}
                  <div className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Heart size={100} />
                     </div>
                     <div className="font-mono text-dirty-lime text-sm mb-4">03 // USER OBSESSION</div>
                     <h3 className="font-display text-3xl font-bold mb-4">MAKE THEM FEEL.</h3>
                     <p className="text-gray-400 font-sans leading-relaxed">
                        If they don't remember you, you failed. We design for emotion first, conversion second (usually the first follows the second anyway).
                     </p>
                  </div>
                  
                  {/* Quote */}
                  <div className="flex items-center justify-center p-8 md:mt-12">
                     <div className="text-center transform -rotate-2">
                        <span className="font-marker text-3xl text-white">"Normal is a setting on a dryer."</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Marquee */}
         <div className="w-full overflow-hidden border-t border-white/10 py-4 mt-16 bg-white/5">
           <div className="whitespace-nowrap animate-marquee-reverse">
             <span className="font-mono text-sm tracking-widest text-gray-500 mx-12">REACT • NEXT.JS • WORDPRESS • SHOPIFY • TAILWIND • FRAMER MOTION • WEBGL • </span>
             <span className="font-mono text-sm tracking-widest text-gray-500 mx-12">REACT • NEXT.JS • WORDPRESS • SHOPIFY • TAILWIND • FRAMER MOTION • WEBGL • </span>
             <span className="font-mono text-sm tracking-widest text-gray-500 mx-12">REACT • NEXT.JS • WORDPRESS • SHOPIFY • TAILWIND • FRAMER MOTION • WEBGL • </span>
           </div>
         </div>
      </section>

      {/* CONTACT SECTION */}
      <section id={AppSection.CONTACT} className="py-24 bg-black text-white relative">
        <div className="container mx-auto px-4 text-center relative z-10">
           <ScribbleCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-dirty-lime opacity-20 animate-pulse" />
           <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 relative inline-block">
             LET'S CREATE <br /> SOMETHING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-dirty-lime to-dirty-orange">WEIRD.</span>
           </h2>
           <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <a href="mailto:info@lucez.it" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-xl hover:bg-dirty-lime hover:scale-105 transition-all duration-300">
               <Mail size={24} /> info@lucez.it
             </a>
             <a href="tel:+393494336719" className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
               <Phone size={24} /> +39 349 433 6719
             </a>
           </div>
        </div>
      </section>

      <footer className="bg-black text-gray-600 py-12 border-t border-gray-800">
         <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs font-mono gap-4">
            <div className="flex flex-col items-center md:items-start">
               <span>© {new Date().getFullYear()} LuceZ. All rights reserved.</span>
               <span className="mt-1 text-dirty-orange/70">Designed in Chaos. Coded with Order.</span>
            </div>
            <div className="flex items-center gap-2 border border-gray-800 bg-gray-900/50 px-3 py-1 rounded-md">
               <Bot size={12} className="text-dirty-lime" />
               <span className="tracking-wider">100% GENERATED BY AI. CURATED BY HUMAN.</span>
            </div>
         </div>
      </footer>

      <GeminiAgent />
    </div>
  );
};

export default App;
