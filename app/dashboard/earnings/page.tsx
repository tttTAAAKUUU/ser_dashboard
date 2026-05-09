"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Wallet, ArrowUpRight, Download } from "lucide-react";
import SalesChart from "@/components/SalesChart"; // Keep your existing chart here

export default function EarningsPage() {
  return (
    <div className="p-6 space-y-8 bg-zinc-950 min-h-screen text-white font-poppins">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-[#1B91D7]">Earnings Report</h1>
          <p className="text-xs font-black uppercase text-zinc-500">Financial overview and payout status</p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-800 transition-all">
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <Wallet className="text-[#1B91D7] mb-4" size={24} />
            <p className="text-[10px] font-black uppercase text-zinc-500">Available for Payout</p>
            <h2 className="text-3xl font-black italic tracking-tighter mt-1 text-white">R2,150.00</h2>
            <button className="w-full mt-4 bg-[#1B91D7] text-white py-2 rounded-lg text-[10px] font-black uppercase">Withdraw Now</button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <TrendingUp className="text-emerald-500 mb-4" size={24} />
            <p className="text-[10px] font-black uppercase text-zinc-500">Gross Revenue (MTD)</p>
            <h2 className="text-3xl font-black italic tracking-tighter mt-1 text-white">R8,400.00</h2>
            <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold mt-2">
              <ArrowUpRight size={12} /> +14% increase
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <CheckCircle size={24} className="text-amber-500 mb-4" />
            <p className="text-[10px] font-black uppercase text-zinc-500">Completed Jobs</p>
            <h2 className="text-3xl font-black italic tracking-tighter mt-1 text-white">42</h2>
            <p className="text-[10px] text-zinc-500 uppercase font-bold mt-2">Across all domains</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <h3 className="text-sm font-black uppercase italic tracking-widest text-[#1B91D7] mb-6">Revenue Growth</h3>
        <SalesChart />
      </div>
    </div>
  );
}

const CheckCircle = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);