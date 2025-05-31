"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedMatch() {
  const [timeLeft, setTimeLeft] = useState("01:45:22");
  const [team1Odd, setTeam1Odd] = useState(2.10);
  const [team2Odd, setTeam2Odd] = useState(1.85);
  
  // Simulate changing odds
  useEffect(() => {
    const interval = setInterval(() => {
      setTeam1Odd(prev => {
        const change = (Math.random() - 0.5) * 0.05;
        return parseFloat((prev + change).toFixed(2));
      });
      
      setTeam2Odd(prev => {
        const change = (Math.random() - 0.5) * 0.05;
        return parseFloat((prev + change).toFixed(2));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulated countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const [hours, minutes, seconds] = prevTime.split(':').map(Number);
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        
        if (newHours < 0) {
          return "00:00:00";
        }
        
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#333333] shadow-lg transform transition-all hover:scale-[1.01] hover:shadow-xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
        <div className="relative h-40 md:h-48 bg-gradient-to-r from-[#1e1e1e] to-[#252525]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md flex items-center justify-between px-8">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto relative">
                  <Image 
                    src="https://images.pexels.com/photos/9311546/pexels-photo-9311546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Lakers" 
                    width={80} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
                <p className="font-bold mt-1">Lakers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">VS</p>
                <Badge variant="outline" className="bg-[#FF4C4C]/10 text-[#FF4C4C] border-[#FF4C4C]/20 mt-2">
                  <Zap className="h-3 w-3 mr-1" /> LIVE
                </Badge>
              </div>
              <div className="text-center">
                <div className="h-20 w-20 mx-auto relative">
                  <Image 
                    src="https://images.pexels.com/photos/6404194/pexels-photo-6404194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Celtics" 
                    width={80} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
                <p className="font-bold mt-1">Celtics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 relative z-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{timeLeft}</span>
          </div>
          <Badge variant="outline" className="bg-[#252525]">NBA Championship</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="relative overflow-hidden group"
            onClick={() => setTeam1Odd(prev => parseFloat((prev - 0.01).toFixed(2)))}
          >
            <div className="flex flex-col items-center w-full">
              <span className="text-sm">Lakers Win</span>
              <span className={`text-xl font-bold mt-1 text-[#7ED957] transition-transform duration-300 group-hover:scale-110`}>
                {team1Odd}
              </span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="relative overflow-hidden group"
            onClick={() => setTeam2Odd(prev => parseFloat((prev - 0.01).toFixed(2)))}
          >
            <div className="flex flex-col items-center w-full">
              <span className="text-sm">Celtics Win</span>
              <span className={`text-xl font-bold mt-1 text-[#7ED957] transition-transform duration-300 group-hover:scale-110`}>
                {team2Odd}
              </span>
            </div>
          </Button>
        </div>

        <Button asChild className="w-full mt-6 bg-[#7ED957] hover:bg-[#6BC047] text-black font-semibold">
          <Link href="/matches/lakers-vs-celtics">View All Bets</Link>
        </Button>
      </div>
    </div>
  );
}