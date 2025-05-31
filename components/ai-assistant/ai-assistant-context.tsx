"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

type AIAssistantContextType = {
  isOpen: boolean;
  toggleAssistant: () => void;
  closeAssistant: () => void;
  messages: Message[];
  addMessage: (message: string, isUser: boolean) => void;
};

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI betting assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const toggleAssistant = () => setIsOpen((prev) => !prev);
  const closeAssistant = () => setIsOpen(false);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response if this is a user message
    if (isUser) {
      setTimeout(() => {
        let response;
        if (content.toLowerCase().includes('odds')) {
          response = "Odds represent the probability of an outcome. For example, odds of 2.00 mean a 50% chance. If you bet $100 and win, you'd get $200 back (your $100 stake plus $100 profit).";
        } else if (content.toLowerCase().includes('spread')) {
          response = "Spread betting involves a handicap. For example, if Team A has a -7.5 spread against Team B, Team A must win by at least 8 points for a bet on them to pay out.";
        } else if (content.toLowerCase().includes('parlay') || content.toLowerCase().includes('accumulator')) {
          response = "A parlay (or accumulator) combines multiple bets into one. All selections must win for the bet to pay out. The odds are multiplied, increasing potential returns but also risk.";
        } else if (content.toLowerCase().includes('best') || content.toLowerCase().includes('recommend')) {
          response = "Based on recent performance data, Arsenal vs Chelsea might be your best bet today. Arsenal has been in strong form at home with a 75% win rate this season.";
        } else {
          response = "I'm happy to help with your betting questions. You can ask me about odds explanations, betting strategies, or specific matches you're interested in.";
        }
        
        addMessage(response, false);
      }, 1500);
    }
  };

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        toggleAssistant,
        closeAssistant,
        messages,
        addMessage,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};