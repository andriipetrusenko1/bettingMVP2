import BetDetail from "@/components/betting/bet-detail";
import BetSlip from "@/components/betting/bet-slip";

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <BetDetail matchId={params.id} />
          </div>
          
          <div className="w-full md:w-1/4">
            <BetSlip />
          </div>
        </div>
      </div>
    </div>
  );
}