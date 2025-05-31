import MatchFilters from "@/components/matches/match-filters";
import MatchGrid from "@/components/matches/match-grid";
import BetSlip from "@/components/betting/bet-slip";

export default function MatchesPage() {
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold font-manrope mb-6">Browse Matches</h1>
            
            <MatchFilters />
            
            <div className="mt-8">
              <MatchGrid />
            </div>
          </div>
          
          <div className="w-full md:w-1/4 md:mt-14">
            <BetSlip />
          </div>
        </div>
      </div>
    </div>
  );
}