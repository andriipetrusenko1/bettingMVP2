"use client";

import { useAIAssistant } from './ai-assistant-context';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';

export default function AIAssistantButton() {
  const { isOpen, toggleAssistant, closeAssistant, messages, addMessage } = useAIAssistant();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    addMessage(inputValue, true);
    setInputValue('');
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Focus input when assistant is opened
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages]);

  const popularQuestions = [
    "How do betting odds work?",
    "Explain spread betting",
    "What's a parlay bet?",
    "What's the best bet today?"
  ];

  return (
    <>
      <Button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#00D4FF] hover:bg-[#00B8DD] text-black shadow-lg z-50 flex items-center justify-center"
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      <Sheet open={isOpen} onOpenChange={closeAssistant}>
        <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg p-0 border-l border-[#333333] bg-[#1E1E1E]">
          <div className="flex flex-col h-full">
            <div className="border-b border-[#333333] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-[#00D4FF]/20 text-[#00D4FF]">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-base font-manrope">BetPro AI Assistant</h3>
                  <p className="text-[#CCCCCC] text-xs">Always here to help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={closeAssistant}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                <div className="col-span-3 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} gap-2`}
                      >
                        {!message.isUser && (
                          <Avatar className="h-8 w-8 bg-[#00D4FF]/20 text-[#00D4FF] flex-shrink-0">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.isUser
                              ? 'bg-[#2A332A] rounded-tr-none text-white'
                              : 'bg-[#252525] rounded-tl-none text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.isUser && (
                          <Avatar className="h-8 w-8 bg-[#7ED957]/20 text-[#7ED957] flex-shrink-0">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-[#333333]">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about odds, strategies, or bets..."
                        className="bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                      />
                      <Button type="submit" className="bg-[#7ED957] hover:bg-[#6BC047] text-black">
                        Send
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="hidden md:block col-span-2 bg-[#252525] p-6 border-l border-[#333333] overflow-y-auto">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[#CCCCCC] mb-3">POPULAR QUESTIONS</h4>
                      <div className="space-y-2">
                        {popularQuestions.map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-2 bg-[#1E1E1E] border-[#333333] hover:border-[#7ED957]/50 hover:bg-[#7ED957]/10"
                            onClick={() => {
                              addMessage(question, true);
                            }}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-[#CCCCCC] mb-3">TIPS & GUIDES</h4>
                      <div className="bg-[#1E1E1E] border border-[#333333] rounded-lg p-4">
                        <h5 className="font-semibold text-sm mb-2">Understanding Value Bets</h5>
                        <p className="text-xs text-[#CCCCCC] mb-3">
                          A value bet is when the probability of an outcome is higher than the odds suggest.
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-[#00D4FF]"
                          onClick={() => {
                            addMessage("How do I find value bets?", true);
                          }}
                        >
                          Learn more
                        </Button>
                      </div>

                      <div className="bg-[#1E1E1E] border border-[#333333] rounded-lg p-4">
                        <h5 className="font-semibold text-sm mb-2">Bankroll Management</h5>
                        <p className="text-xs text-[#CCCCCC] mb-3">
                          Proper bankroll management is key to long-term betting success.
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-[#00D4FF]"
                          onClick={() => {
                            addMessage("What is proper bankroll management?", true);
                          }}
                        >
                          Learn more
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}