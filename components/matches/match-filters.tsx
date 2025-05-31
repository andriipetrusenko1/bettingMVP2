"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronDown, FilterX, Search } from "lucide-react";
import { format } from "date-fns";

export default function MatchFilters() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  
  const sports = [
    { id: "all", name: "All Sports" },
    { id: "football", name: "Football" },
    { id: "basketball", name: "Basketball" },
    { id: "baseball", name: "Baseball" },
    { id: "hockey", name: "Hockey" },
    { id: "soccer", name: "Soccer" }
  ];
  
  const leagues = [
    { id: "nfl", name: "NFL", sport: "football" },
    { id: "ncaaf", name: "NCAAF", sport: "football" },
    { id: "nba", name: "NBA", sport: "basketball" },
    { id: "ncaab", name: "NCAAB", sport: "basketball" },
    { id: "mlb", name: "MLB", sport: "baseball" },
    { id: "nhl", name: "NHL", sport: "hockey" },
    { id: "premier", name: "Premier League", sport: "soccer" },
    { id: "laliga", name: "La Liga", sport: "soccer" },
    { id: "bundesliga", name: "Bundesliga", sport: "soccer" },
    { id: "seriea", name: "Serie A", sport: "soccer" },
    { id: "ligue1", name: "Ligue 1", sport: "soccer" }
  ];

  const filteredLeagues = selectedSport === "all" 
    ? leagues 
    : leagues.filter(league => league.sport === selectedSport);

  const toggleLeague = (leagueId: string) => {
    if (selectedLeagues.includes(leagueId)) {
      setSelectedLeagues(selectedLeagues.filter(id => id !== leagueId));
    } else {
      setSelectedLeagues([...selectedLeagues, leagueId]);
    }
  };

  const clearFilters = () => {
    setSelectedSport("all");
    setSelectedLeagues([]);
    setDate(new Date());
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={selectedSport} onValueChange={setSelectedSport} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-manrope">Sports</h2>
          
          {(selectedSport !== "all" || selectedLeagues.length > 0) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs"
            >
              <FilterX className="h-3.5 w-3.5 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
        
        <TabsList className="bg-[#252525] p-1 h-auto flex flex-nowrap overflow-x-auto space-x-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {sports.map(sport => (
            <TabsTrigger
              key={sport.id}
              value={sport.id}
              className="py-2 px-4 data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212] whitespace-nowrap"
            >
              {sport.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#252525] border-[#333333]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="bg-[#252525] text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="w-full sm:w-2/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#CCCCCC]" />
            <Input 
              placeholder="Search by team, match, or league..." 
              className="pl-10 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Leagues</h3>
          <Button variant="link" size="sm" className="text-xs text-[#00D4FF] h-auto p-0" onClick={() => setSelectedLeagues([])}>
            Clear
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filteredLeagues.map(league => (
            <Badge
              key={league.id}
              variant="outline"
              className={`cursor-pointer hover:bg-[#252525] transition-colors ${
                selectedLeagues.includes(league.id) 
                  ? 'bg-[#7ED957]/10 text-[#7ED957] border-[#7ED957]/30' 
                  : 'bg-[#1E1E1E] border-[#333333]'
              }`}
              onClick={() => toggleLeague(league.id)}
            >
              {league.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}