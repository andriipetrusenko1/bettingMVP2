"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  // ...other matches as you had them
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
  // Add the remaining mock matches here...
];

export default function MatchGrid() {
  const [betType, setBetType] = useState<"moneyline" | "spread" | "total">(
    "moneyline"
  );
  const [matches, setMatches] = useState(mockMatches);

  const handleAddToBetslip = (
    matchId: string,
    team: string,
    odds: number,
    betTypeSelected: string
  ) => {
    // Example placeholder logic for adding to betslip
    console.log(
      `Added to betslip: Match ${matchId}, Team ${team}, Odds ${odds}, BetType ${betTypeSelected}`
    );
    toast.success(
      `Added to betslip: ${team} (${betTypeSelected}) @ ${odds.toFixed(2)}`
    );
  };

  return (
    <>
      <Tabs
        value={betType}
        onValueChange={(value) =>
          setBetType(value as "moneyline" | "spread" | "total")
        }
        className="mb-4"
      >
        <TabsList>
          <TabsTrigger value="moneyline">Moneyline</TabsTrigger>
          <TabsTrigger value="spread">Spread</TabsTrigger>
          <TabsTrigger value="total">Total</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="matches-grid grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4">
            <CardContent>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={match.team1.logo}
                    alt={match.team1.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span className="font-semibold">{match.team1.name}</span>
                </div>
                <span className="font-bold">vs</span>
                <div className="flex items-center space-x-3">
                  <img
                    src={match.team2.logo}
                    alt={match.team2.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span className="font-semibold">{match.team2.name}</span>
                </div>
              </div>

              {betType === "moneyline" && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
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
                      variant="outline"
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
                    variant="outline"
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

              {betType === "spread" && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleAddToBetslip(
                        match.id,
                        match.team1.name,
                        match.odds.spread.team1.odds,
                        "spread"
                      )
                    }
                  >
                    {match.team1.name} {match.odds.spread.team1.value} (
                    {match.odds.spread.team1.odds})
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleAddToBetslip(
                        match.id,
                        match.team2.name,
                        match.odds.spread.team2.odds,
                        "spread"
                      )
                    }
                  >
                    {match.team2.name} {match.odds.spread.team2.value} (
                    {match.odds.spread.team2.odds})
                  </Button>
                </div>
              )}

              {betType === "total" && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleAddToBetslip(
                        match.id,
                        "Over",
                        match.odds.total.over.odds,
                        "total"
                      )
                    }
                  >
                    Over {match.odds.total.over.value} (
                    {match.odds.total.over.odds})
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleAddToBetslip(
                        match.id,
                        "Under",
                        match.odds.total.under.odds,
                        "total"
                      )
                    }
                  >
                    Under {match.odds.total.under.value} (
                    {match.odds.total.under.odds})
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
