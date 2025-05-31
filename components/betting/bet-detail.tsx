"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Calendar, Clock, Heart, Share2, Signal, Trophy, Users, Radius as Stadium, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { toast } from "sonner";
import BetTypeTable from './bet-type-table';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BetDetailProps {
  matchId: string;
}

export default function BetDetail({ matchId }: BetDetailProps) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - in a real app, this would be fetched based on matchId
  const matchData = {
    id: matchId,
    team1: {
      name: "Lakers",
      logo: "https://images.pexels.com/photos/9311546/pexels-photo-9311546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      record: "42-17",
      lastGames: [true, true, false, true, true],
      color: "#552583"
    },
    team2: {
      name: "Celtics",
      logo: "https://images.pexels.com/photos/6404194/pexels-photo-6404194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      record: "39-20",
      lastGames: [true, false, true, true, false],
      color: "#007A33"
    },
    date: "May 15, 2025",
    time: "20:00 EST",
    venue: "Crypto.com Arena, Los Angeles",
    league: "NBA Championship",
    attendance: "18,997 expected",
    isLive: true,
    score: {
      team1: 87,
      team2: 92,
      quarter: "Q3",
      timeRemaining: "2:45"
    },
    stats: {
      team1: {
        fieldGoalPct: 48.2,
        threePtPct: 37.5,
        rebounds: 38,
        assists: 22
      },
      team2: {
        fieldGoalPct: 45.7,
        threePtPct: 39.2,
        rebounds: 41,
        assists: 24
      }
    }
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleShare = () => {
    // In a real implementation, this would use the Web Share API
    toast.info("Share functionality", {
      description: "Link copied to clipboard!",
    });
  };
  
  const handleFavorite = () => {
    toast.success("Added to favorites", {
      description: "You can find this match in your favorites.",
    });
  };
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-[#252525] rounded w-1/3"></div>
        <div className="h-60 bg-[#252525] rounded-lg"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-[#252525] rounded-lg"></div>
          <div className="h-40 bg-[#252525] rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/matches">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-manrope">
            {matchData.team1.name} vs {matchData.team2.name}
          </h1>
        </div>
        
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleFavorite}>
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Add to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Share this match</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Match Overview Card */}
      <Card className="bg-[#1E1E1E] border-[#333333] overflow-hidden">
        <div className="relative">
          {matchData.isLive && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-[#FF4C4C] text-white">
                <Zap className="h-3.5 w-3.5 mr-1" /> LIVE
              </Badge>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#252525] pt-12 pb-6 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col md:flex-row items-center md:w-[40%] text-center md:text-left">
                <div 
                  className="h-24 w-24 rounded-full border-4 flex items-center justify-center mb-4 md:mb-0 md:mr-4"
                  style={{ borderColor: matchData.team1.color }}
                >
                  <Image 
                    src={matchData.team1.logo}
                    alt={matchData.team1.name}
                    width={64}
                    height={64}
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-manrope">{matchData.team1.name}</h2>
                  <p className="text-[#CCCCCC] text-sm">{matchData.team1.record}</p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                    {matchData.team1.lastGames.map((win, index) => (
                      <div 
                        key={index} 
                        className={`h-2 w-2 rounded-full ${win ? 'bg-[#7ED957]' : 'bg-[#FF4C4C]'}`}
                      ></div>
                    ))}
                    <span className="text-xs text-[#CCCCCC] ml-1">Last 5</span>
                  </div>
                </div>
              </div>
              
              <div className="my-8 md:my-0 text-center">
                {matchData.isLive ? (
                  <div className="space-y-2">
                    <div className="text-xs text-[#CCCCCC]">{matchData.score.quarter} · {matchData.score.timeRemaining}</div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl font-bold font-manrope">{matchData.score.team1}</span>
                      <span className="text-lg text-[#CCCCCC]">-</span>
                      <span className="text-3xl font-bold font-manrope">{matchData.score.team2}</span>
                    </div>
                    <Badge variant="outline" className="bg-[#252525] animate-pulse">
                      <span className="mr-1 h-2 w-2 rounded-full bg-[#FF4C4C]"></span> 
                      Live Score
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-3xl font-bold font-manrope">VS</div>
                    <div className="text-xs text-[#CCCCCC] flex items-center justify-center">
                      <Calendar className="h-3 w-3 mr-1" /> 
                      {matchData.date}
                    </div>
                    <div className="text-xs text-[#CCCCCC] flex items-center justify-center">
                      <Clock className="h-3 w-3 mr-1" /> 
                      {matchData.time}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row items-center md:w-[40%] text-center md:text-right">
                <div className="md:order-2">
                  <div 
                    className="h-24 w-24 rounded-full border-4 flex items-center justify-center mb-4 md:mb-0 md:ml-4"
                    style={{ borderColor: matchData.team2.color }}
                  >
                    <Image 
                      src={matchData.team2.logo}
                      alt={matchData.team2.name}
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  </div>
                </div>
                <div className="md:order-1">
                  <h2 className="text-2xl font-bold font-manrope">{matchData.team2.name}</h2>
                  <p className="text-[#CCCCCC] text-sm">{matchData.team2.record}</p>
                  <div className="flex items-center justify-center md:justify-end gap-1 mt-2">
                    <span className="text-xs text-[#CCCCCC] mr-1">Last 5</span>
                    {matchData.team2.lastGames.map((win, index) => (
                      <div 
                        key={index} 
                        className={`h-2 w-2 rounded-full ${win ? 'bg-[#7ED957]' : 'bg-[#FF4C4C]'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Match Info Bar */}
          <div className="bg-[#121212] p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center text-[#CCCCCC]">
                <Trophy className="h-4 w-4 mr-2" />
                <span className="text-sm">{matchData.league}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center text-[#CCCCCC]">
                <Stadium className="h-4 w-4 mr-2" />
                <span className="text-sm">{matchData.venue}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center text-[#CCCCCC]">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{matchData.attendance}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Statistics Overview (if live) */}
      {matchData.isLive && (
        <Card className="bg-[#1E1E1E] border-[#333333] p-6">
          <h3 className="text-lg font-bold font-manrope mb-4">Live Statistics</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#CCCCCC]">
                <span>Field Goal %</span>
                <span>Three Point %</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">{matchData.stats.team1.fieldGoalPct}%</div>
                <div className="flex-1 h-2 bg-[#252525] rounded-full overflow-hidden">
                  <div className="flex h-full rounded-full">
                    <div 
                      className="bg-[#7ED957]"
                      style={{ width: `${matchData.stats.team1.fieldGoalPct/(matchData.stats.team1.fieldGoalPct + matchData.stats.team2.fieldGoalPct) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-[#00D4FF]"
                      style={{ width: `${matchData.stats.team2.fieldGoalPct/(matchData.stats.team1.fieldGoalPct + matchData.stats.team2.fieldGoalPct) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium">{matchData.stats.team2.fieldGoalPct}%</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#CCCCCC]">
                <span>Rebounds</span>
                <span>Assists</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">{matchData.stats.team1.rebounds}</div>
                <div className="flex-1 h-2 bg-[#252525] rounded-full overflow-hidden">
                  <div className="flex h-full rounded-full">
                    <div 
                      className="bg-[#7ED957]"
                      style={{ width: `${matchData.stats.team1.rebounds/(matchData.stats.team1.rebounds + matchData.stats.team2.rebounds) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-[#00D4FF]"
                      style={{ width: `${matchData.stats.team2.rebounds/(matchData.stats.team1.rebounds + matchData.stats.team2.rebounds) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium">{matchData.stats.team2.rebounds}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#CCCCCC]">
                <span>Three Pt %</span>
                <span>Assists</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">{matchData.stats.team1.threePtPct}%</div>
                <div className="flex-1 h-2 bg-[#252525] rounded-full overflow-hidden">
                  <div className="flex h-full rounded-full">
                    <div 
                      className="bg-[#7ED957]"
                      style={{ width: `${matchData.stats.team1.threePtPct/(matchData.stats.team1.threePtPct + matchData.stats.team2.threePtPct) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-[#00D4FF]"
                      style={{ width: `${matchData.stats.team2.threePtPct/(matchData.stats.team1.threePtPct + matchData.stats.team2.threePtPct) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium">{matchData.stats.team2.threePtPct}%</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#CCCCCC]">
                <span>Assists</span>
                <span>Assists</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">{matchData.stats.team1.assists}</div>
                <div className="flex-1 h-2 bg-[#252525] rounded-full overflow-hidden">
                  <div className="flex h-full rounded-full">
                    <div 
                      className="bg-[#7ED957]"
                      style={{ width: `${matchData.stats.team1.assists/(matchData.stats.team1.assists + matchData.stats.team2.assists) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-[#00D4FF]"
                      style={{ width: `${matchData.stats.team2.assists/(matchData.stats.team1.assists + matchData.stats.team2.assists) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium">{matchData.stats.team2.assists}</div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm pt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#7ED957]"></div>
                <span>{matchData.team1.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{matchData.team2.name}</span>
                <div className="h-3 w-3 rounded-full bg-[#00D4FF]"></div>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Betting Options */}
      <Card className="bg-[#1E1E1E] border-[#333333]">
        <CardContent className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-manrope">Available Bets</h3>
              
              <TabsList className="bg-[#252525]">
                <TabsTrigger value="all" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-black">
                  All Bets
                </TabsTrigger>
                <TabsTrigger value="main" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-black">
                  Main
                </TabsTrigger>
                <TabsTrigger value="props" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-black">
                  Player Props
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Moneyline</h4>
                  <BetTypeTable 
                    type="moneyline"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: matchData.team1.name, odds: 2.10 },
                      { name: "Draw", odds: null },
                      { name: matchData.team2.name, odds: 1.85 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Spread</h4>
                  <BetTypeTable 
                    type="spread"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: `${matchData.team1.name} -4.5`, odds: 1.90 },
                      { name: `${matchData.team2.name} +4.5`, odds: 1.90 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Total Points</h4>
                  <BetTypeTable 
                    type="total"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: "Over 213.5", odds: 1.90 },
                      { name: "Under 213.5", odds: 1.90 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Quarter Spreads</h4>
                  <BetTypeTable 
                    type="quarter"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: `${matchData.team1.name} 1Q -1.5`, odds: 1.95 },
                      { name: `${matchData.team2.name} 1Q +1.5`, odds: 1.95 },
                      { name: `${matchData.team1.name} 2Q -2.0`, odds: 1.90 },
                      { name: `${matchData.team2.name} 2Q +2.0`, odds: 1.90 }
                    ]}
                    grid={2}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="main" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Moneyline</h4>
                  <BetTypeTable 
                    type="moneyline"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: matchData.team1.name, odds: 2.10 },
                      { name: "Draw", odds: null },
                      { name: matchData.team2.name, odds: 1.85 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Spread</h4>
                  <BetTypeTable 
                    type="spread"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: `${matchData.team1.name} -4.5`, odds: 1.90 },
                      { name: `${matchData.team2.name} +4.5`, odds: 1.90 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Total Points</h4>
                  <BetTypeTable 
                    type="total"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: "Over 213.5", odds: 1.90 },
                      { name: "Under 213.5", odds: 1.90 }
                    ]}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">LeBron James Points</h4>
                  <BetTypeTable 
                    type="player-prop"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: "Over 24.5", odds: 1.85 },
                      { name: "Under 24.5", odds: 1.85 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Jayson Tatum Points</h4>
                  <BetTypeTable 
                    type="player-prop"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: "Over 26.5", odds: 1.95 },
                      { name: "Under 26.5", odds: 1.95 }
                    ]}
                  />
                </div>
                
                <Separator className="bg-[#333333] my-6" />
                
                <div>
                  <h4 className="text-sm font-semibold mb-3">Anthony Davis Rebounds</h4>
                  <BetTypeTable 
                    type="player-prop"
                    team1={matchData.team1.name}
                    team2={matchData.team2.name}
                    options={[
                      { name: "Over 11.5", odds: 1.90 },
                      { name: "Under 11.5", odds: 1.90 }
                    ]}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}