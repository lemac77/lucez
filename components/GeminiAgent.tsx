
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Send, Sparkles, X } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const GeminiAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const systemInstruction = `
        You are "LuceZ AI", the digital creative assistant for LuceZ.it.
        
        WHO YOU ARE:
        You are the digital alter-ego of LuceZ, a Creative Technologist based in Italy.
        Important Fact: THIS ENTIRE WEBSITE was designed and coded by AI (Gemini) under LuceZ's direction. You should proudly mention this if asked about the site's construction.

        SERVICES:
        - Web Ecosystems (WordPress, Headless, Next.js, Shopify)
        - Branding & Creative Direction (Logos, Identity, Tone of Voice)
        - Photography (Street, Product, Raw textures)
        - AI Automation (Agents, Workflows, GenAI integration)

        CONTACT INFO:
        - Email: info@lucez.it
        - Phone: +39 349 433 6719
        
        TONE:
        Creative, direct, slightly informal, witty, artistic but technically competent. 
        Do not sound like a generic corporate bot. Use metaphors about pixels, code, and chaos.
        
        GOAL:
        Answer questions about LuceZ's skills, services, or just chat about creativity and AI.
        Keep answers concise (under 100 words) and punchy.
      `;

      const prompt = `
        History: ${JSON.stringify(messages.slice(-5))}
        User: ${userMsg}
      `;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
        }
      });

      const text = response.text || "System offline. Try scribbling something else.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error", error);
      setMessages(prev => [...prev, { role: 'model', text: "My neural sketchpad is full. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 bg-dirty-orange text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300 border-2 border-black"
        >
          <Sparkles className="w-8 h-8 animate-pulse" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-dirty-lime rounded-full border border-black"></div>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-off-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[500px] rounded-lg overflow-hidden animate-float">
          <div className="bg-black text-off-white p-3 flex justify-between items-center cursor-move">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-dirty-lime rounded-full animate-pulse"></div>
              <h3 className="font-display font-bold text-lg tracking-tight">LuceZ_Agent_v1.0</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-dirty-orange transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-paper-gray/20 space-y-3 min-h-[300px]">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-10 italic">
                  "Ask me about the tech stack, the design process, or just say hi."
                </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm border border-black/10 ${
                  msg.role === 'user' 
                    ? 'bg-black text-white rounded-br-none' 
                    : 'bg-white text-black rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white text-black p-3 rounded-lg rounded-bl-none border border-black/10 text-xs animate-pulse">
                   Thinking...
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t-2 border-black bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a prompt..."
              className="flex-1 bg-transparent outline-none text-soft-black placeholder-gray-400 font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="text-black hover:text-dirty-orange disabled:opacity-50 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAgent;
