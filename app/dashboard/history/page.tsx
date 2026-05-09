"use client";
import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { PastRequestCard } from "@/components/PastRequestCard";

export default function PastRequestsPage() {
  const [daysFilter, setDaysFilter] = useState("7");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Job History</h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Completed Transactions</p>
        </div>
        <Select value={daysFilter} onValueChange={setDaysFilter}>
          <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-800 h-9 text-[10px] font-black uppercase">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <div className="space-y-3">
        {/* Mocking the mapping from the data above */}
        <PastRequestCard serviceName="Box Braids" clientName="Lebo Mokoena" rating={5} price={650} date="2026-05-05" />
        <PastRequestCard serviceName="Gel Manicure" clientName="Thando Dlamini" rating={4} price={300} date="2026-05-04" />
        <PastRequestCard serviceName="Fitness Coaching" clientName="Sipho Nkosi" rating={5} price={800} date="2026-05-01" />
      </div>
    </div>
  );
}