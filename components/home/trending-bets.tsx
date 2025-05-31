"use client";

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, ChevronLeft, ChevronRight, Clock, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const trendingMatches = [
  {
    id: 1,
    team1: { name: 'Arsenal', logo: 'https://images.pexels.com/photos/364308/pexels-photo-364308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    team2: { name: 'Chelsea', logo: 'https://images.pexels.com/photos/13596191/pexels-photo-13596191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    league: 'Premier League',
    time: 'Today, 20:45',
    odds: { team1: 2.25, draw: 3.40, team2: 2.90 },
    highlighted: true
  },
  {
    id: 2,
    team1: { name: 'Chiefs', logo: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    team2: { name: 'Ravens', logo: 'https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    league: 'NFL',
    time: 'Tomorrow, 18:30',
    odds: { team1: 1.95, draw: null, team2: 1.85 },
    highlighted: false
  },
  {
    id: 3,
    team1: { name: 'Bulls', logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    team2: { name: 'Nets', logo: 'https://images.pexels.com/photos/2346/sport-high-united-states-of-america-ball.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    league: 'NBA',
    time: 'Today, 22:00',
    odds: { team1: 2.40, draw: null, team2: 1.60 },
    highlighted: false
  },
  {
    id: 4,
    team1: { name: 'Barcelona', logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    team2: { name: 'Real Madrid', logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    league: 'La Liga',
    time: 'Sun, 21:00',
    odds: { team1: 2.10, draw: 3.25, team2: 3.00 },
    highlighted: true
  },
  {
    id: 5,
    team1: { name: 'Yankees', logo: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    team2: { name: 'Red Sox', logo: 'https://images.pexels.com/photos/1326386/pexels-photo-1326386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    league: 'MLB',
    time: 'Sat, 19:15',
    odds: { team1: 1.75, draw: null, team2: 2.05 },
    highlighted: false
  },
];

export default function TrendingBets() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = 320; // Approximate card width + gap
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-[#1E1E1E] hover:bg-[#252525] border border-[#333333] shadow-md"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-1 -mx-1 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trendingMatches.map((match) => (
          <Card 
            key={match.id}
            className={`flex-shrink-0 w-full sm:w-[320px] bg-[#1E1E1E] border-[#333333] hover:border-[#444444] transition-all duration-200 overflow-hidden ${
              match.highlighted ? 'ring-1 ring-[#7ED957]/20' : ''
            }`}
          >
            <CardContent className="p-4">
              {match.highlighted && (
                <div className="flex items-center gap-1 text-xs text-[#7ED957] mb-2">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  <span>Popular Match</span>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-3">
                <Badge variant="outline" className="bg-[#252525] text-xs">
                  {match.league}
                </Badge>
                <div className="flex items-center text-xs text-[#CCCCCC]">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{match.time}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-5">
                <div className="flex flex-col items-center text-center w-[40%]">
                  <div className="h-12 w-12 relative mb-2 bg-[#252525] rounded-full flex items-center justify-center">
                    <Image 
                      src={match.team1.logo}
                      alt={match.team1.name}
                      width={32}
                      height={32}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium truncate w-full">
                    {match.team1.name}
                  </span>
                </div>
                
                <div className="w-[20%] flex flex-col items-center">
                  <div className="bg-[#252525] h-8 w-8 rounded-full flex items-center justify-center mb-2">
                    <Trophy className="h-4 w-4 text-[#00D4FF]" />
                  </div>
                  <span className="text-xs text-[#CCCCCC]">VS</span>
                </div>
                
                <div className="flex flex-col items-center text-center w-[40%]">
                  <div className="h-12 w-12 relative mb-2 bg-[#252525] rounded-full flex items-center justify-center">
                    <Image 
                      src={match.team2.logo}
                      alt={match.team2.name}
                      width={32}
                      height={32}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium truncate w-full">
                    {match.team2.name}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957] transition-colors"
                >
                  <div className="flex flex-col items-center w-full">
                    <span className="text-xs">1</span>
                    <span className="text-sm font-bold">{match.odds.team1}</span>
                  </div>
                </Button>
                
                {match.odds.draw !== null ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957] transition-colors"
                  >
                    <div className="flex flex-col items-center w-full">
                      <span className="text-xs">X</span>
                      <span className="text-sm font-bold">{match.odds.draw}</span>
                    </div>
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled
                    className="opacity-50 cursor-not-allowed"
                  >
                    <div className="flex flex-col items-center w-full">
                      <span className="text-xs">X</span>
                      <span className="text-sm">-</span>
                    </div>
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957] transition-colors"
                >
                  <div className="flex flex-col items-center w-full">
                    <span className="text-xs">2</span>
                    <span className="text-sm font-bold">{match.odds.team2}</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-[#1E1E1E] hover:bg-[#252525] border border-[#333333] shadow-md"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}