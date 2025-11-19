import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AppSection } from '../types';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: AppSection.HERO, label: 'Home' },
    { id: AppSection.SERVICES, label: 'What I Do' },
    { id: AppSection.PROJECTS, label: 'Projects' },
    { id: AppSection.RESOURCES, label: 'Manifesto' },
    { id: AppSection.ABOUT, label: 'About' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo / Brand */}
          <button onClick={() => scrollTo(AppSection.HERO)} className="font-display font-bold text-2xl md:text-3xl tracking-tighter relative group">
            luce<span className="text-dirty-orange">z</span>.it
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-dirty-lime transition-all group-hover:w-full"></span>
          </button>

          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-8 items-center bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-black/5 shadow-sm transition-all duration-500 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-0'}`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-sans text-sm font-medium uppercase tracking-wider hover:text-dirty-orange transition-colors relative"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo(AppSection.CONTACT)} className="ml-4 px-5 py-2 bg-soft-black text-off-white font-display font-medium rounded-full hover:bg-dirty-orange transition-colors -rotate-2 hover:rotate-0">
              Let's Talk
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden z-50" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-off-white flex flex-col justify-center items-center space-y-8 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-display text-4xl font-bold hover:text-dirty-orange hover:italic transition-all"
            >
              {link.label}
            </button>
          ))}
           <button onClick={() => scrollTo(AppSection.CONTACT)} className="mt-8 px-8 py-4 bg-soft-black text-off-white font-display text-xl rounded-full">
              Contact Me
            </button>
        </div>
      )}
    </>
  );
};

export default Navigation;