import React from 'react';

export const ScribbleUnderline = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 9" className={`w-full ${className}`} preserveAspectRatio="none">
    <path d="M2.00025 7.00001C35.9168 2.02348 118.077 -3.3357 197.478 5.22293" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const ScribbleCircle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22,50 C20,20 80,10 80,50 C80,90 20,80 22,50 Z M20,52 C18,85 82,85 82,52" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ScribbleArrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M10,25 Q50,5 90,25 M80,15 L90,25 L80,35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Tape = ({ className = "", rotate = "rotate-2" }: { className?: string, rotate?: string }) => (
  <div className={`absolute h-8 w-24 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm ${rotate} ${className}`} style={{ clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)' }}></div>
);