"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Professional Bettor",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "The AI assistant has completely transformed how I approach betting. It gives me insights that I wouldn't have considered on my own. My win rate has increased by 35% since I started using this platform."
  },
  {
    id: 2,
    name: "Samantha Williams",
    role: "Sports Enthusiast",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    text: "As someone new to sports betting, this platform has been incredible. The interface is intuitive, and I love how it explains betting terms. The AI helped me understand spreads and odds like no other resource could."
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Fantasy Sports Player",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "The real-time updates and AI insights have completely changed my betting strategy. I've won 3 major parlays thanks to the platform's recommendations. The dark mode is easy on the eyes too!"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Weekend Bettor",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "I love how the platform remembers my betting preferences and suggests matches I might be interested in. The mobile experience is flawless, and withdrawals are processed quickly."
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Sports Analyst",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    text: "As someone who analyzes sports for a living, I appreciate the depth of data available. The charts and visualizations help me make more informed decisions. Great platform overall."
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = 3; // Number of visible testimonials at once on desktop
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % (testimonials.length - (visibleTestimonials - 1)));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % (testimonials.length - (visibleTestimonials - 1)));
  };
  
  // Get current visible testimonials
  const currentTestimonials = testimonials.slice(activeIndex, activeIndex + visibleTestimonials);
  
  return (
    <div className="relative">
      <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          size="icon"
          variant="ghost"
          onClick={prevTestimonial}
          disabled={activeIndex === 0}
          className="h-10 w-10 rounded-full bg-[#1E1E1E] hover:bg-[#252525] border border-[#333333] shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-[#1E1E1E] border-[#333333] hover:border-[#444444] transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-[#7ED957]">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-[#CCCCCC]">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#7ED957] fill-[#7ED957]' : 'text-[#333333]'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#CCCCCC] text-sm flex-grow">{testimonial.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          size="icon"
          variant="ghost"
          onClick={nextTestimonial}
          disabled={activeIndex >= testimonials.length - visibleTestimonials}
          className="h-10 w-10 rounded-full bg-[#1E1E1E] hover:bg-[#252525] border border-[#333333] shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Mobile pagination indicators */}
      <div className="flex justify-center mt-6 gap-2 md:hidden">
        {testimonials.map((_, index) => (
          <Button 
            key={index}
            variant="ghost" 
            size="icon"
            className={`w-2 h-2 rounded-full p-0 ${activeIndex === index ? 'bg-[#7ED957]' : 'bg-[#333333]'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      
      {/* Mobile navigation buttons */}
      <div className="flex justify-center gap-4 mt-6 md:hidden">
        <Button 
          size="sm"
          variant="outline"
          onClick={prevTestimonial}
          disabled={activeIndex === 0}
          className="h-9 w-9 rounded-full p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          size="sm"
          variant="outline"
          onClick={nextTestimonial}
          disabled={activeIndex >= testimonials.length - 1}
          className="h-9 w-9 rounded-full p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}