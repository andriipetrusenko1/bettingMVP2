"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, Search, XCircle } from "lucide-react";

// Mock data for bet history
const betHistoryData = [
  {
    id: "1",
    date: "May 14, 2025",
    match: "Lakers vs Celtics",
    selection: "Lakers",
    betType: "Moneyline",
    odds: 2.10,
    stake: 50.00,
    result: "win",
    payout: 105.00,
    profit: 55.00
  },
  {
    id: "2",
    date: "May 13, 2025",
    match: "Chiefs vs Ravens",
    selection: "Ravens",
    betType: "Spread +3.5",
    odds: 1.85,
    stake: 30.00,
    result: "loss",
    payout: 0,
    profit: -30.00
  },
  {
    id: "3",
    date: "May 10, 2025",
    match: "Arsenal vs Chelsea",
    selection: "Draw",
    betType: "Moneyline",
    odds: 3.40,
    stake: 25.00,
    result: "win",
    payout: 85.00,
    profit: 60.00
  },
  {
    id: "4",
    date: "May 9, 2025",
    match: "Yankees vs Red Sox",
    selection: "Over 8.5",
    betType: "Total",
    odds: 1.90,
    stake: 40.00,
    result: "win",
    payout: 76.00,
    profit: 36.00
  },
  {
    id: "5",
    date: "May 8, 2025",
    match: "Warriors vs Nets",
    selection: "Warriors -6.5",
    betType: "Spread",
    odds: 1.95,
    stake: 35.00,
    result: "loss",
    payout: 0,
    profit: -35.00
  },
  {
    id: "6",
    date: "May 7, 2025",
    match: "Barcelona vs Real Madrid",
    selection: "Barcelona",
    betType: "Moneyline",
    odds: 2.20,
    stake: 50.00,
    result: "win",
    payout: 110.00,
    profit: 60.00
  },
  {
    id: "7",
    date: "May 5, 2025",
    match: "Man City vs Liverpool",
    selection: "Under 2.5",
    betType: "Total",
    odds: 2.05,
    stake: 30.00,
    result: "loss",
    payout: 0,
    profit: -30.00
  }
];

export default function DashboardBetHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultFilter, setResultFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  
  // Apply filters to bet history data
  const filteredBets = betHistoryData.filter(bet => {
    const matchesSearch = searchTerm === "" || 
                         bet.match.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.selection.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesResult = resultFilter === "all" || bet.result === resultFilter;
    
    // Date filter would be more complex in a real implementation
    const matchesDate = dateFilter === "all";
    
    return matchesSearch && matchesResult && matchesDate;
  });
  
  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  // Calculate stats
  const totalBets = filteredBets.length;
  const wins = filteredBets.filter(bet => bet.result === "win").length;
  const losses = filteredBets.filter(bet => bet.result === "loss").length;
  const winRate = totalBets > 0 ? Math.round((wins / totalBets) * 100) : 0;
  const totalProfit = filteredBets.reduce((sum, bet) => sum + bet.profit, 0);
  
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E1E] border-[#333333]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#CCCCCC]">Total Bets</p>
                <p className="text-2xl font-bold mt-1">{totalBets}</p>
              </div>
              <div className="h-10 w-10 bg-[#252525] rounded-full flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-[#CCCCCC]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E1E] border-[#333333]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#CCCCCC]">Win Rate</p>
                <p className="text-2xl font-bold mt-1">{winRate}%</p>
              </div>
              <div className="h-10 w-10 bg-[#252525] rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-[#7ED957]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E1E] border-[#333333]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#CCCCCC]">Wins/Losses</p>
                <p className="text-2xl font-bold mt-1">{wins}/{losses}</p>
              </div>
              <div className="h-10 w-10 bg-[#252525] rounded-full flex items-center justify-center">
                <div className="flex -space-x-1">
                  <CheckCircle className="h-5 w-5 text-[#7ED957]" />
                  <XCircle className="h-5 w-5 text-[#FF4C4C]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E1E] border-[#333333]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#CCCCCC]">Total Profit</p>
                <p className={`text-2xl font-bold mt-1 ${totalProfit >= 0 ? 'text-[#7ED957]' : 'text-[#FF4C4C]'}`}>
                  {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}
                </p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                totalProfit >= 0 ? 'bg-[#7ED957]/20 text-[#7ED957]' : 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.5 9C9.5 8.17 10.17 7.5 11 7.5C11.83 7.5 12.5 8.17 12.5 9C12.5 9.83 11.83 10.5 11 10.5C10.17 10.5 9.5 9.83 9.5 9ZM14.5 16V15C14.5 13.9 11.5 13 11 13C10.5 13 7.5 13.9 7.5 15V16H14.5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* History Table with Filters */}
      <Card className="bg-[#1E1E1E] border-[#333333]">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-manrope">Bet History</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={loading}
              className="h-8"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#CCCCCC]" />
              <Input 
                placeholder="Search by match or selection..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={resultFilter} onValueChange={setResultFilter}>
                <SelectTrigger className="w-36 bg-[#252525] border-[#333333]">
                  <SelectValue placeholder="Result" />
                </SelectTrigger>
                <SelectContent className="bg-[#252525] border-[#333333]">
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="win">Wins Only</SelectItem>
                  <SelectItem value="loss">Losses Only</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-36 bg-[#252525] border-[#333333]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent className="bg-[#252525] border-[#333333]">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border border-[#333333] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#252525]">
                <TableRow className="hover:bg-[#2A2A2A] border-[#333333]">
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead>Selection</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead>Stake</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead className="text-right">Profit/Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBets.length > 0 ? (
                  filteredBets.map((bet) => (
                    <TableRow key={bet.id} className="hover:bg-[#1A1A1A] border-[#333333]">
                      <TableCell className="text-xs text-[#CCCCCC]">{bet.date}</TableCell>
                      <TableCell>{bet.match}</TableCell>
                      <TableCell>{bet.selection}</TableCell>
                      <TableCell>{bet.betType}</TableCell>
                      <TableCell>{bet.odds.toFixed(2)}</TableCell>
                      <TableCell>${bet.stake.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            bet.result === "win"
                              ? "bg-[#7ED957]/20 text-[#7ED957] border-[#7ED957]/30"
                              : "bg-[#FF4C4C]/20 text-[#FF4C4C] border-[#FF4C4C]/30"
                          }
                        >
                          {bet.result === "win" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {bet.result === "win" ? "Win" : "Loss"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            bet.profit >= 0 ? "text-[#7ED957]" : "text-[#FF4C4C]"
                          }
                        >
                          {bet.profit >= 0 ? "+" : ""}${Math.abs(bet.profit).toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="text-[#CCCCCC]">No betting history found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredBets.length > 7 && (
            <div className="flex justify-center mt-4">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}