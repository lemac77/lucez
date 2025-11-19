import React from 'react';

export interface Project {
  id: string;
  title: string;
  subtitle?: string; 
  category: string;
  image: string;
  description: string;
  link: string; // External URL is now mandatory based on requirements
  tags?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon?: React.ReactNode;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Prompt' | 'Code' | 'Thought';
  content: string;
}

export enum AppSection {
  HERO = 'hero',
  ABOUT = 'about',
  SERVICES = 'services',
  PROJECTS = 'projects',
  RESOURCES = 'resources',
  CONTACT = 'contact',
  AI_AGENT = 'ai_agent'
}