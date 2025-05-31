"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, Zap } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

// Mock data for active bets
const activeBets = [
  {
    id: "1",
    match: {
      id: "match-1",
      team1: { name: "Lakers", logo: "https://images.pexels.com/photos/9311546/pexels-photo-9311546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      team2: { name: "Celtics", logo: "https://images.pexels.com/photos/6404194/pexels-photo-6404194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      score: { team1: 87, team2: 92 },
      isLive: true,
      time: "Q3 - 2:45"
    },
    selection: "Lakers",
    betType: "moneyline",
    stake: 50,
    odds: 2.10,
    potentialWin: 105.00,
    status: "active",
    placedOn: new Date().toISOString()
  },
  {
    id: "2",
    match: {
      id: "match-2",
      team1: { name: "Chiefs", logo: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      team2: { name: "Ravens", logo: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      score: null,
      isLive: false,
      time: "Starts in 2 days"
    },
    selection: "Ravens",
    betType: "spread",
    stake: 30,
    odds: 1.85,
    potentialWin: 55.50,
    status: "pending",
    placedOn: new Date().toISOString()
  },
  {
    id: "3",
    match: {
      id: "match-3",
      team1: { name: "Arsenal", logo: "https://images.pexels.com/photos/364308/pexels-photo-364308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      team2: { name: "Chelsea", logo: "https://images.pexels.com/photos/13596191/pexels-photo-13596191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      score: { team1: 0, team2: 1 },
      isLive: true,
      time: "70:24"
    },
    selection: "Over 2.5",
    betType: "total",
    stake: 25,
    odds: 1.90,
    potentialWin: 47.50,
    status: "active",
    placedOn: new Date().toISOString()
  }
];

export default function DashboardActiveBets() {
  const [filter, setFilter] = useState("all");
  
  // Filter bets based on selected filter
  const filteredBets = filter === "all" 
    ? activeBets 
    : filter === "live" 
    ? activeBets.filter(bet => bet.match.isLive) 
    : activeBets.filter(bet => !bet.match.isLive);
  
  const handleCashout = (betId: string) => {
    toast.success("Bet cashed out successfully!", {
      description: "Your balance has been updated.",
    });
  };
  
  return (
    <Card className="bg-[#1E1E1E] border-[#333333]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-manrope">Active Bets</CardTitle>
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-fit">
            <TabsList className="bg-[#252525]">
              <TabsTrigger value="all" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                All Bets
              </TabsTrigger>
              <TabsTrigger value="live" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                Live
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="text-xs data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                Upcoming
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredBets.length > 0 ? (
            filteredBets.map((bet) => (
              <div key={bet.id} className="bg-[#252525] rounded-lg p-4 border border-[#333333]">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="h-10 w-10 rounded-full bg-[#121212] flex items-center justify-center z-10">
                          <Image 
                            src={bet.match.team1.logo}
                            alt={bet.match.team1.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="h-10 w-10 rounded-full bg-[#121212] flex items-center justify-center">
                          <Image 
                            src={bet.match.team2.logo}
                            alt={bet.match.team2.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{bet.match.team1.name} vs {bet.match.team2.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {bet.match.isLive ? (
                            <Badge className="bg-[#FF4C4C] text-white text-xs py-0 h-5">
                              <Zap className="h-3 w-3 mr-1" /> LIVE
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-[#333333] text-xs py-0 h-5">
                              <Clock className="h-3 w-3 mr-1" /> Upcoming
                            </Badge>
                          )}
                          <span className="text-xs text-[#CCCCCC]">{bet.match.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {bet.match.isLive && bet.match.score && (
                    <div className="text-right">
                      <p className="text-sm text-[#CCCCCC]">Score</p>
                      <p className="text-base font-bold">{bet.match.score.team1} - {bet.match.score.team2}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <div>
                    <p className="text-[#CCCCCC]">Selection</p>
                    <p className="font-medium">{bet.selection}</p>
                  </div>
                  <div>
                    <p className="text-[#CCCCCC]">Type</p>
                    <p className="font-medium capitalize">{bet.betType}</p>
                  </div>
                  <div>
                    <p className="text-[#CCCCCC]">Stake</p>
                    <p className="font-medium">${bet.stake.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[#CCCCCC]">Odds</p>
                    <p className="font-medium text-[#7ED957]">{bet.odds.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[#CCCCCC]">To Win</p>
                    <p className="font-medium">${bet.potentialWin.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#333333]">
                  <Button variant="link" asChild className="text-[#00D4FF] p-0 h-auto">
                    <Link href={`/matches/${bet.match.id}`}>Match Details</Link>
                  </Button>
                  
                  {bet.match.isLive && (
                    <Button 
                      onClick={() => handleCashout(bet.id)}
                      className="bg-[#7ED957] hover:bg-[#6BC047] text-black"
                    >
                      Cash Out $40.00
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-[#333333] mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No active bets</h3>
              <p className="text-[#CCCCCC] mb-6">You don't have any {filter !== 'all' ? filter : ''} bets at the moment</p>
              <Button asChild className="bg-[#7ED957] hover:bg-[#6BC047] text-black">
                <Link href="/matches">Browse Matches</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}