import { ArrowRight, Search, ShieldCheck, Wallet } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Find Your Match",
      description: "Browse thousands of events across major sports leagues. Filter by date, sport, or league to find your perfect bet.",
      color: "#00D4FF"
    },
    {
      icon: Wallet,
      title: "Place Your Bet",
      description: "Select your odds, enter your stake, and confirm your bet. Our platform processes bets instantly with real-time odds.",
      color: "#7ED957"
    },
    {
      icon: ShieldCheck,
      title: "Collect Winnings",
      description: "When you win, earnings are immediately credited to your account. Withdraw using your preferred payment method.",
      color: "#FF4C4C"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="bg-[#121212] border border-[#333333] rounded-xl p-6 h-full flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
            <div 
              className="h-12 w-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${step.color}20` }}
            >
              <step.icon className="h-6 w-6" style={{ color: step.color }} />
            </div>
            
            <h3 className="text-xl font-bold mb-3 font-manrope">{step.title}</h3>
            <p className="text-[#CCCCCC] text-sm leading-relaxed">{step.description}</p>
            
            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute top-12 right-[-30px] z-10">
                <ArrowRight className="h-6 w-6 text-[#333333]" />
              </div>
            )}
          </div>
          
          <div className="absolute -z-10 inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl" style={{ backgroundColor: `${step.color}10` }}></div>
        </div>
      ))}
    </div>
  );
}