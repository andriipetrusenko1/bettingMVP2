"use client";

import { Home, Trophy, Zap, Wallet, Settings, LogOut, User, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function MobileNav() {
  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Matches", href: "/matches" },
    { icon: Zap, label: "Live Bets", href: "/live" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 font-manrope font-bold text-xl">
          <div className="h-8 w-8 bg-[#7ED957] rounded-md flex items-center justify-center text-black">
            BP
          </div>
          <span>BetPro</span>
        </Link>
      </div>
      
      <nav className="px-2 space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-[#F5F5F5] hover:bg-[#252525] rounded-md transition-colors"
          >
            <item.icon className="h-5 w-5 text-[#CCCCCC]" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <Separator className="my-6 bg-[#333333]" />
      
      <div className="px-6 mt-auto space-y-4">
        <Button className="w-full bg-[#7ED957] hover:bg-[#6BC047] text-black font-medium" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  );
}