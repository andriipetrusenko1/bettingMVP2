"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeInfo, Clock, Heart, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";

// Mock data
const mockMatches = [
  {
    id: "1",
    team1: { name: "Lakers", logo: "https://images.pexels.com/photos/9311546/pexels-photo-9311546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    team2: { name: "Celtics", logo: "https://images.pexels.com/photos/6404194/pexels-photo-6404194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    league: "NBA",
    sport: "basketball",
    date: "2025-05-15",
    time: "20:00",
    isLive: true,
    featured: true,
    odds: {
      moneyline: { team1: 2.10, draw: null, team2: 1.85 },
      spread: { team1: { value: -4.5, odds: 1.90 }, team2: { value: +4.5, odds: 1.90 } },
      total: { over: { value: 213.5, odds: 1.90 }, under: { value: 213.5, odds: 1.90 } }
    }
  },
  {
    id: "2",
    team1: { name: "Arsenal", logo: "https://images.pexels.com/photos/364308/pexels-photo-364308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    team2: { name: "Chelsea", logo: "https://images.pexels.com/photos/13596191/pexels-photo-13596191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    league: "Premier League",
    sport: "soccer",
    date: "2025-05-16",
    time: "15:30",
    isLive: false,
    featured: true,
    odds: {
      moneyline: { team1: 2.25, draw: 3.40, team2: 2.90 },
      spread: { team1: { value: -0.5, odds: 1.85 }, team2: { value: +0.5, odds: 1.95 } },
      total: { over: { value: 2.5, odds: 1.85 }, under: { value: 2.5, odds: 1.95 } }
    }
  },
  {
    id: "3",
    team1: { name: "Chiefs", logo: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    team2: { name: "Ravens", logo: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    league: "NFL",
    sport: "football",
    date: "2025-05-16",
    time: "18:30",
    isLive: false,
    featured: false,
    odds: {
      moneyline: { team1: 1.95, draw: null, team2: 1.85 },
      spread: { team1: { value: -3.5, odds: 1.90 }, team2: { value: +3.5, odds: 1.90 } },
      total: { over: { value: 48.5, odds: 1.90 }, under: { value: 48.5, odds: 1.90 } }
    }
  },
  {
    id: "4",
    team1: { name: "Yankees", logo: "https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    team2: { name: "Red Sox", logo: "https://images.pexels.com/photos/1326386/pexels-photo-1326386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    league: "MLB",
    sport: "baseball",
    date: "2025-05-17",
    time: "19:15",
    isLive: false,
    featured: false,
    odds: {
      moneyline: { team1: 1.75, draw: null, team2: 2.05 },
      spread: { team1: { value: -1.5, odds: 1.90 }, team2: { value: +1.5, odds: 1.90 } },
      total: { over: { value: 8.5, odds: 1.90 }, under: { value: 8.5, odds: 1.90 } }
    }
  },
  {
    id: "5",
    team1: { name: "Barcelona", logo: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    team2: { name: "Real Madrid", logo: "https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    league: "La Liga",
    sport: "soccer",
    date: "2025-05-17",
    time: "21:00",
    isLive: false,
    featured: true,
    odds: {
      moneyline: { team1: 2.10, draw: 3.25, team2: 3.00 },
      spread: { team1: { value: -0.5, odds: 1.80 }, team2: { value: +0.5, odds: 2.00 } },
      total: { over: { value: 2.5, odds: 1.90 }, under: { value: 2.5, odds: 1.90 } }
    }
  },
  {
    id: "6",
    team1: { name: "Warriors", logo: "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    team2: { name: "Nets", logo: "https://images.pexels.com/photos/2346/sport-high-united-states-of-america-ball.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    league: "NBA",
    sport: "basketball",
    date: "2025-05-18",
    time: "18:00",
    isLive: false,
    featured: false,
    odds: {
      moneyline: { team1: 1.65, draw: null, team2: 2.20 },
      spread: { team1: { value: -6.5, odds: 1.90 }, team2: { value: +6.5, odds: 1.90 } },
      total: { over: { value: 218.5, odds: 1.90 }, under: { value: 218.5, odds: 1.90 } }
    }
  }
];

export default function MatchGrid() {
  const [betType, setBetType] = useState('moneyline');
  const [matches, setMatches] = useState(mockMatches);
  
  const handleAddToBetslip = (matchId: string, team: string, odds: number, betTypeSelected: string) => {
    // For a real implementation, this would interact with a betslip state management
    toast.success(`Added to betslip: ${team} @ ${odds}`, {
      description: "Check your bet slip to confirm and place your bet.",
    });
  };
  
  const formatOdds = (odds: number) => {
    return odds.toFixed(2);
  };

  const toggleFavorite = (matchId: string) => {
    // In a real implementation, this would toggle a favorite in user preferences
    toast("Added to favorites", {
      description: "You can find this match in your favorites list.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="moneyline" value={betType} onValueChange={setBetType}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Bet Type</h2>
          
          <TabsList className="bg-[#252525]">
            <TabsTrigger value="moneyline" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
              Moneyline
            </TabsTrigger>
            <TabsTrigger value="spread" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
              Spread
            </TabsTrigger>
            <TabsTrigger value="total" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
              Total
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="grid grid-cols-1 gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="bg-[#1E1E1E] border-[#333333] hover:border-[#444444] transition-all overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:h-32">
                <div className="w-full md:w-1/2 p-4 flex items-center">
                  <div className="flex flex-1 items-center">
                    <div className="flex flex-col items-center justify-center w-1/3">
                      <div className="h-12 w-12 relative mb-2 bg-[#252525] rounded-full flex items-center justify-center">
                        <Image 
                          src={match.team1.logo}
                          alt={match.team1.name}
                          width={32}
                          height={32}
                          className="object-contain rounded-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-center">{match.team1.name}</span>
                    </div>
                    
                    <div className="w-1/3 flex flex-col items-center">
                      <span className="text-xs text-[#CCCCCC] mb-1">VS</span>
                      <Link href={`/matches/${match.id}`} className="text-[#00D4FF] text-xs hover:underline">
                        View Details
                      </Link>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-[#252525] py-0 h-5">
                          {match.league}
                        </Badge>
                        
                        {match.isLive && (
                          <Badge variant="outline" className="bg-[#FF4C4C]/10 text-[#FF4C4C] border-[#FF4C4C]/20 text-xs py-0 h-5">
                            <Zap className="h-3 w-3 mr-1" /> LIVE
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center w-1/3">
                      <div className="h-12 w-12 relative mb-2 bg-[#252525] rounded-full flex items-center justify-center">
                        <Image 
                          src={match.team2.logo}
                          alt={match.team2.name}
                          width={32}
                          height={32}
                          className="object-contain rounded-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-center">{match.team2.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-4 md:pl-0 border-t md:border-t-0 md:border-l border-[#333333] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-[#CCCCCC] gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{match.date} · {match.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:text-[#FF4C4C]"
                              onClick={() => toggleFavorite(match.id)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="text-xs">Add to favorites</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-[#00D4FF]">
                              <BadgeInfo className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="w-60">
                            <div className="space-y-2">
                              <p className="text-xs font-medium">Betting Information</p>
                              <p className="text-xs text-[#CCCCCC]">Moneyline: Bet on which team will win the match.</p>
                              <p className="text-xs text-[#CCCCCC]">Spread: Bet with a handicap applied to the favorite team.</p>
                              <p className="text-xs text-[#CCCCCC]">Total: Bet on the combined score of both teams.</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  {betType === 'moneyline' && (
                    <div className="grid grid-cols-3 gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                        onClick={() => handleAddToBetslip(match.id, match.team1.name, match.odds.moneyline.team1, 'moneyline')}
                      >
                        <div className="flex flex-col items-center w-full">
                          <span className="text-xs">{match.team1.name}</span>
                          <span className="text-sm font-bold">{formatOdds(match.odds.moneyline.team1)}</span>
                        </div>
                      </Button>
                      
                      {match.odds.moneyline.draw !== null ? (
                        <Button 
                          variant="outline" 
                          className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                          onClick={() => handleAddToBetslip(match.id, "Draw", match.odds.moneyline.draw, 'moneyline')}
                        >
                          <div className="flex flex-col items-center w-full">
                            <span className="text-xs">Draw</span>
                            <span className="text-sm font-bold">{formatOdds(match.odds.moneyline.draw)}</span>
                          </div>
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          disabled
                          className="opacity-50 cursor-not-allowed"
                        >
                          <div className="flex flex-col items-center w-full">
                            <span className="text-xs">Draw</span>
                            <span className="text-sm">N/A</span>
                          </div>
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                        onClick={() => handleAddToBetslip(match.id, match.team2.name, match.odds.moneyline.team2, 'moneyline')}
                      >
                        <div className="flex flex-col items-center w-full">
                          <span className="text-xs">{match.team2.name}</span>
                          <span className="text-sm font-bold">{formatOdds(match.odds.moneyline.team2)}</span>
                        </div>
                      </Button>
                    </div>
                  )}
                  
                  {betType === 'spread' && (
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                        onClick={() => handleAddToBetslip(
                          match.id, 
                          `${match.team1.name} ${match.odds.spread.team1.value}`, 
                          match.odds.spread.team1.odds, 
                          'spread'
                        )}
                      >
                        <div className="flex flex-col items-center w-full">
                          <span className="text-xs">{match.team1.name} {match.odds.spread.team1.value}</span>
                          <span className="text-sm font-bold">{formatOdds(match.odds.spread.team1.odds)}</span>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                        onClick={() => handleAddToBetslip(
                          match.id, 
                          `${match.team2.name} ${match.odds.spread.team2.value}`, 
                          match.odds.spread.team2.odds, 
                          'spread'
                        )}
                      >
                        <div className="flex flex-col items-center w-full">
                          <span className="text-xs">{match.team2.name} {match.odds.spread.team2.value}</span>
                          <span className="text-sm font-bold">{formatOdds(match.odds.spread.team2.odds)}</span>
                        </div>
                      </Button>
                    </div>
                  )}
                  
                  {betType === 'total' && (
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                        onClick={() => handleAddToBetslip(
                          match.id, 
                          `Over ${match.odds.total.over.value}`, 
                          match.odds.total.over.odds, 
                          'total'
                        )}
                      >
                        <div className="flex flex-col items-center w-full">
                          <span className="text-xs">Over {match.odds.total.over.value}</span>
                          <span className="text-sm font-bold">{formatOdds(match.odds.total.over.odds)}</span>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#7ED957]/10 hover:border-[#7ED957]/30 hover:text-[#7ED957]"
                        onClick={() => handleAddToBetslip(
                          match.id, 
                          `Under ${match.odds.total.under.value}`, 
                          match.odds.total.under.odds, 
                          'total'
                        )}
                      >
                        <div className="flex flex-col items-center w-full">
                          <span className="text-xs">Under {match.odds.total.under.value}</span>
                          <span className="text-sm font-bold">{formatOdds(match.odds.total.under.odds)}</span>
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}