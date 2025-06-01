"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Badge } from "../ui/badge";

interface BetOption {
  name: string;
  odds: number | null;
}

interface BetTypeTableProps {
  type: string;
  team1: string;
  team2: string;
  options: BetOption[];
  grid?: number;
}

export default function BetTypeTable({
  type,
  team1,
  team2,
  options,
  grid = 3
}: BetTypeTableProps) {
  const handleAddToBetslip = (selection: string, odds: number) => {
    toast.success(`Added to betslip: ${selection} @ ${odds}`, {
      description: "Check your bet slip to confirm and place your bet."
    });
  };

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[grid] || 'grid-cols-2';

  return (
    <div className={`grid ${gridClass} gap-3`}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`bg-[#252525] rounded-lg p-3 border border-[#333333] ${
            option.odds === null ? 'opacity-60' : 'hover:border-[#7ED957]/30'
          } transition-all`}
        >
          <div className="flex justify-between items-center">
            <div>
