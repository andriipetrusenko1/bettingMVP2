"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search, User, Wallet, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Matches", href: "/matches" },
    { label: "Live Bets", href: "/live" },
    { label: "Promotions", href: "/promotions" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-[#121212]/90 backdrop-blur-md border-b border-[#2A2A2A]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center space-x-2 font-manrope font-bold text-xl"
            >
              <div className="h-8 w-8 bg-[#7ED957] rounded-md flex items-center justify-center text-black">
                BP
              </div>
              <span className="hidden md:inline-block">BetPro</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#7ED957]",
                    pathname === item.href
                      ? "text-[#7ED957]"
                      : "text-[#F5F5F5]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isSearchOpen ? (
              <div className="relative w-full max-w-[300px] md:max-w-[400px] animate-in fade-in-0 zoom-in-95">
                <Input
                  type="search"
                  placeholder="Search matches, teams, or leagues..."
                  className="bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                className="text-[#CCCCCC] hover:text-[#F5F5F5]"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#CCCCCC] hover:text-[#F5F5F5]"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                asChild
                className="text-[#CCCCCC] hover:text-[#F5F5F5]"
              >
                <Link href="/wallet">
                  <Wallet className="h-5 w-5 mr-2" />
                  <span>$0.00</span>
                </Link>
              </Button>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                className="bg-[#7ED957] hover:bg-[#6BC047] text-black"
                asChild
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1E1E1E] border-[#333333] p-0">
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}