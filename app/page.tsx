import { Button } from "@/components/ui/button";
import FeaturedMatch from "@/components/home/featured-match";
import TrendingBets from "@/components/home/trending-bets";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#121212] to-[#1a1a1a] pt-10 pb-16 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="font-manrope font-bold text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#7ED957] to-[#00D4FF]">
                Smart Bets.<br />Smarter Insights.
              </h1>
              <p className="text-[#CCCCCC] font-open-sans text-lg md:text-xl max-w-xl">
                Experience betting reimagined with our AI-powered platform that gives you the edge. Real-time odds, personalized insights, and secure transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-[#7ED957] hover:bg-[#6BC047] text-black font-semibold">
                  <Link href="/matches">Start Betting</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-[#7ED957] text-[#7ED957] hover:bg-[#7ED957]/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <FeaturedMatch />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Bets */}
      <section className="py-12 bg-[#121212]">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-manrope">Trending Bets</h2>
            <Button variant="ghost" asChild className="text-[#7ED957]">
              <Link href="/matches">View All</Link>
            </Button>
          </div>
          <TrendingBets />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#1E1E1E]">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-4">How It Works</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">Three simple steps to start your betting journey with us</p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* AI Assistant Promo */}
      <section className="py-16 bg-gradient-to-br from-[#121212] to-[#1a1a1a]">
        <div className="container px-4 mx-auto">
          <div className="bg-[#1E1E1E]/80 border border-[#333333] rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-3/5 space-y-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-[#00D4FF]" />
                  <h3 className="text-[#00D4FF] font-semibold">AI-POWERED</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-manrope">Your Personal Betting Assistant</h2>
                <p className="text-[#CCCCCC] text-lg">Get real-time insights, odds explanations, and personalized recommendations. Our AI assistant helps you make smarter betting decisions.</p>
                <Button className="bg-[#00D4FF] hover:bg-[#00B8DD] text-black">Ask BetPro AI</Button>
              </div>
              <div className="w-full md:w-2/5 bg-[#18181A] border border-[#333333] rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]">AI</div>
                    <div className="bg-[#252525] rounded-lg rounded-tl-none p-3 text-sm">
                      How can I help you with your bets today?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-[#2A332A] rounded-lg rounded-tr-none p-3 text-sm">
                      Explain how spread betting works
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#7ED957]/20 flex items-center justify-center text-[#7ED957]">You</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]">AI</div>
                    <div className="bg-[#252525] rounded-lg rounded-tl-none p-3 text-sm">
                      Spread betting is when you wager on the margin of victory. A -7.5 spread means the team needs to win by at least 8 points for your bet to win...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#121212]">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-4">What Bettors Say</h2>
            <p className="text-[#CCCCCC] max-w-2xl mx-auto">Join thousands of satisfied users who trust our platform</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E1E1E]">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope">Ready to Elevate Your Betting Game?</h2>
            <p className="text-[#CCCCCC] text-lg">Join thousands of smart bettors who've transformed their strategy with BetPro</p>
            <Button asChild size="lg" className="mt-4 bg-[#7ED957] hover:bg-[#6BC047] text-black font-semibold">
              <Link href="/matches">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}