"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, X, PlusCircle, Wallet, ShoppingBag, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type Bet = {
  id: string;
  match: string;
  selection: string;
  odds: number;
  stake: number;
  type: string;
};

export default function BetSlip() {
  const [bets, setBets] = useState<Bet[]>([
    {
      id: '1',
      match: 'Lakers vs Celtics',
      selection: 'Lakers',
      odds: 2.10,
      stake: 50,
      type: 'moneyline',
    }
  ]);
  
  const [isParlay, setIsParlay] = useState(false);
  const [totalStake, setTotalStake] = useState(() => {
    return bets.reduce((sum, bet) => sum + bet.stake, 0);
  });
  
  useEffect(() => {
    if (!isParlay) {
      setTotalStake(bets.reduce((sum, bet) => sum + bet.stake, 0));
    }
  }, [bets, isParlay]);
  
  const updateStake = (id: string, value: number) => {
    setBets(bets.map(bet => 
      bet.id === id ? { ...bet, stake: value } : bet
    ));
  };
  
  const removeBet = (id: string) => {
    setBets(bets.filter(bet => bet.id !== id));
    toast.info("Bet removed from slip");
  };
  
  const clearBetslip = () => {
    setBets([]);
    toast.info("Bet slip cleared");
  };
  
  const placeBet = () => {
    if (bets.length === 0) {
      toast.error("Your bet slip is empty");
      return;
    }
    
    if (!isParlay && bets.some(bet => bet.stake <= 0)) {
      toast.error("Please enter a stake amount for all bets");
      return;
    }
    
    if (isParlay && totalStake <= 0) {
      toast.error("Please enter a parlay stake amount");
      return;
    }
    
    // In a real app, this would submit to an API
    toast.success("Bet placed successfully!", {
      description: "You can view your active bets in your profile.",
    });
    
    // Clear the bet slip after successful placement
    setBets([]);
  };
  
  const calculateTotalPotentialWinnings = () => {
    if (isParlay) {
      const parlayOdds = bets.reduce((total, bet) => total * bet.odds, 1);
      return parseFloat((totalStake * parlayOdds).toFixed(2));
    } else {
      return bets.reduce((total, bet) => total + bet.stake * bet.odds, 0);
    }
  };
  
  const totalPotentialWinnings = calculateTotalPotentialWinnings();
  
  return (
    <Card className="bg-[#1E1E1E] border-[#333333] sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold font-manrope">Bet Slip</CardTitle>
          <Badge variant="outline" className="bg-[#252525]">
            {bets.length} {bets.length === 1 ? 'Selection' : 'Selections'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {bets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="h-12 w-12 text-[#333333] mb-4" />
            <p className="text-sm text-[#CCCCCC]">Your bet slip is empty</p>
            <Button 
              variant="link" 
              asChild
              className="text-[#00D4FF] mt-2"
            >
              <Link href="/matches">Browse Matches</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="parlay-mode"
                  checked={isParlay}
                  onCheckedChange={setIsParlay}
                />
                <Label htmlFor="parlay-mode" className="text-sm font-medium">Parlay Mode</Label>
              </div>
              
              {bets.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-[#CCCCCC] hover:text-white"
                  onClick={clearBetslip}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {bets.map((bet) => (
                <div 
                  key={bet.id}
                  className="bg-[#252525] rounded-lg p-3 border border-[#333333] relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeBet(bet.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-[#CCCCCC]">{bet.match}</p>
                      <p className="text-sm font-medium mt-1">{bet.selection}</p>
                      <Badge variant="outline" className="mt-2 text-xs bg-[#121212]">
                        {bet.type === 'moneyline' ? 'Moneyline' : bet.type === 'spread' ? 'Spread' : 'Total'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-[#7ED957] font-bold">{bet.odds.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {!isParlay && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#CCCCCC]">Stake:</span>
                        <Input
                          type="number"
                          value={bet.stake}
                          onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                          className="h-8 text-sm bg-[#1E1E1E] border-[#333333]"
                          min="0"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[#CCCCCC]">Potential Win:</span>
                        <span className="text-sm font-medium">${(bet.stake * bet.odds).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {isParlay && bets.length > 0 && (
              <div className="bg-[#252525] rounded-lg p-4 border border-[#333333]">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium">Parlay Odds</p>
                  <p className="text-[#7ED957] font-bold">
                    {bets.reduce((total, bet) => total * bet.odds, 1).toFixed(2)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#CCCCCC]">Total Stake:</span>
                    <Input
                      type="number"
                      value={totalStake}
                      onChange={(e) => setTotalStake(parseFloat(e.target.value) || 0)}
                      className="h-8 text-sm bg-[#1E1E1E] border-[#333333]"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <Separator className="bg-[#333333]" />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Stake:</span>
                <span className="font-medium">${isParlay ? totalStake.toFixed(2) : bets.reduce((sum, bet) => sum + bet.stake, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Potential Winnings:</span>
                <span className="text-[#7ED957] font-bold">${totalPotentialWinnings.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      {bets.length > 0 && (
        <CardFooter className="flex flex-col gap-2 pt-2">
          <Button
            onClick={placeBet}
            className="w-full bg-[#7ED957] hover:bg-[#6BC047] text-black font-semibold"
          >
            Place {isParlay ? "Parlay" : ""} Bet
          </Button>
          <div className="flex justify-center items-center text-xs text-[#CCCCCC] gap-1">
            <RefreshCw className="h-3 w-3" /> Odds refresh automatically
          </div>
        </CardFooter>
      )}
    </Card>
  );
}