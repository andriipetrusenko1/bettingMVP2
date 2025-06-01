"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeInfo, Clock, Heart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// Mock data
const mockMatches = [
  {
    id: "1",
    team1: {
      name: "Lakers",
      logo:
        "https://images.pexels.com/photos/9311546/pexels-photo-9311546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    team2: {
      name: "Celtics",
      logo:
        "https://images.pexels.com/photos/6404194/pexels-photo-6404194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    league: "NBA",
    sport: "basketball",
    date: "2025-05-15",
    time: "20:00",
    isLive: true,
    featured: true,
    odds: {
      moneyline: { team1: 2.1, draw: null, team2: 1.85 },
      spread: {
        team1: { value: -4.5, odds: 1.9 },
        team2: { value: +4.5, odds: 1.9 },
      },
      total: {
        over: { value: 213.5, odds: 1.9 },
        under: { value: 213.5, odds: 1.9 },
      },
    },
  },
  {
    id: "2",
    team1: {
      name: "Arsenal",
      logo:
        "https://images.pexels.com/photos/364308/pexels-photo-364308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    team2: {
      name: "Chelsea",
      logo:
        "https://images.pexels.com/photos/13596191/pexels-photo-13596191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    league: "Premier League",
    sport: "soccer",
    date: "2025-05-16",
    time: "15:30",
    isLive: false,
    featured: true,
    odds: {
      moneyline: { team1: 2.25, draw: 3.4, team2: 2.9 },
      spread: {
        team1: { value: -0.5, odds: 1.85 },
        team2: { value: +0.5, odds: 1.95 },
      },
      total: {
        over: { value: 2.5, odds: 1.85 },
        under: { value: 2.5, odds: 1.95 },
      },
    },
  },
  {
    id: "3",
    team1: {
      name: "Chiefs",
      logo:
        "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    team2: {
      name: "Ravens",
      logo:
        "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    league: "NFL",
    sport: "football",
    date: "2025-05-16",
    time: "18:30",
    isLive: false,
    featured: false,
    odds: {
      moneyline: { team1: 1.95, draw: null, team2: 1.85 },
      spread: {
        team1: { value: -3.5, odds: 1.9 },
        team2: { value: +3.5, odds: 1.9 },
      },
      total: {
        over: { value: 48.5, odds: 1.9 },
        under: { value: 48.5, odds: 1.9 },
      },
    },
  },
  {
    id: "4",
    team1: {
      name: "Yankees",
      logo:
        "https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    team2: {
      name: "Red Sox",
      logo:
        "https://images.pexels.com/photos/1326386/pexels-photo-1326386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    league: "MLB",
    sport: "baseball",
    date: "2025-05-17",
    time: "19:15",
    isLive: false,
    featured: false,
    odds: {
      moneyline: { team1: 1.75, draw: null, team2: 2.05 },
      spread: {
        team1: { value: -1.5, odds: 1.9 },
        team2: { value: +1.5, odds: 1.9 },
      },
      total: {
        over: { value: 8.5, odds: 1.9 },
        under: { value: 8.5, odds: 1.9 },
      },
    },
  },
  {
    id: "5",
    team1: {
      name: "Barcelona",
      logo:
        "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    team2: {
      name: "Real Madrid",
      logo:
        "https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    league: "La Liga",
    sport: "soccer",
    date: "2025-05-17",
    time: "21:00",
    isLive: false,
    featured: true,
    odds: {
      moneyline: { team1: 2.1, draw: 3.25, team2: 3.0 },
      spread: {
        team1: { value: -0.5, odds: 1.8 },
        team2: { value: +0.5, odds: 2.0 },
      },
      total: {
        over: { value: 2.5, odds: 1.9 },
        under: { value: 2.5, odds: 1.9 },
      },
    },
  },
  {
    id: "6",
    team1: {
      name: "Warriors",
      logo:
        "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    team2: {
      name: "Nets",
      logo:
        "https://images.pexels.com/photos/2346/sport-high-united-states-of-america-ball.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    league: "NBA",
    sport: "basketball",
    date: "2025-05-18",
    time: "18:00",
    isLive: false,
    featured: false,
    odds: {
      moneyline: { team1: 1.65, draw: null, team2: 2.2 },
      spread: {
        team1: { value: -6.5, odds: 1.9 },
        team2: { value: +6.5, odds: 1.9 },
      },
      total: {
        over: { value: 218.5, odds: 1.9 },
        under: { value: 218.5, odds: 1.9 },
      },
    },
  },
];

export default function MatchGrid() {
  const [betType, setBetType] = useState<"moneyline" | "spread" | "total">(
    "moneyline"
  );
  const [matches, setMatches] = useState(mockMatches);

  // Complete the function and close it properly
  const handleAddToBetslip = (
    matchId: string,
    team: string,
    odds: number,
    betTypeSelected: string
  ) => {
    // Example placeholder logic for adding to betslip
    console.log(`Added to betslip: Match ${matchId}, Team ${team}, Odds ${odds}, BetType ${betTypeSelected}`);
    // Could call toast or update state here
  };

  return (
    <div>
      {/* Your UI code here */}
      <Tabs
  value={betType}
  onValueChange={(value) => setBetType(value as "spread" | "moneyline" | "total")}
/>
        <TabsList>
          <TabsTrigger value="moneyline">Moneyline</TabsTrigger>
          <TabsTrigger value="spread">Spread</TabsTrigger>
          <TabsTrigger value="total">Total</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="matches-grid">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardContent>
              <div className="teams">
                <div>{match.team1.name}</div>
                <div>vs</div>
                <div>{match.team2.name}</div>
              </div>

              {/* Display odds based on betType */}
              {betType === "moneyline" && (
                <div>
                  <Button
                    onClick={() =>
                      handleAddToBetslip(
                        match.id,
                        match.team1.name,
                        match.odds.moneyline.team1!,
                        "moneyline"
                      )
                    }
                  >
                    {match.odds.moneyline.team1}
                  </Button>
                  {match.odds.moneyline.draw !== null && (
                    <Button
                      onClick={() =>
                        handleAddToBetslip(
                          match.id,
                          "Draw",
                          match.odds.moneyline.draw!,
                          "moneyline"
                        )
                      }
                    >
                      {match.odds.moneyline.draw}
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      handleAddToBetslip(
                        match.id,
                        match.team2.name,
                        match.odds.moneyline.team2!,
                        "moneyline"
                      )
                    }
                  >
                    {match.odds.moneyline.team2}
                  </Button>
                </div>
              )}

              {/* Similarly add Spread and Total UI here */}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
