"use client";

import React from "react";
import { 
  Bell, Wallet, MapPin, 
  Save, Banknote, Navigation 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10 min-h-screen pb-20 text-white">
      <header>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">System Settings</h1>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Configure your provider environment</p>
      </header>

      <div className="grid gap-8">
        
        {/* 1. LOGISTICS */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-[#1B91D7] flex items-center gap-2">
            <Navigation size={14} /> Logistics & Range
          </h2>
          <Card className="bg-[#0B101A] border-zinc-800 p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-zinc-400 text-[10px] font-black uppercase">Operating Base</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <Input defaultValue="Bryanston, Sandton" className="bg-zinc-950 border-zinc-800 pl-10 text-white font-bold h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-400 text-[10px] font-black uppercase">Travel Radius (KM)</Label>
                <Input type="number" defaultValue="15" className="bg-zinc-950 border-zinc-800 text-white font-bold h-11" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-white uppercase tracking-tighter">Auto-Accept Matches</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Instantly accept jobs within 5km of Bryanston</p>
              </div>
              <Switch className="data-[state=checked]:bg-[#1B91D7]" />
            </div>
          </Card>
        </section>

        {/* 2. PAYOUTS */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-[#1B91D7] flex items-center gap-2">
            <Wallet size={14} /> Payout & Finance
          </h2>
          <Card className="bg-[#0B101A] border-zinc-800 p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                  <Banknote size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Bank Account</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Capitec Bank •••• 4902</p>
                </div>
              </div>
              <Button variant="ghost" className="text-[10px] font-black uppercase text-zinc-500 hover:text-white">Update</Button>
            </div>
          </Card>
        </section>

        {/* 3. NOTIFICATIONS */}
        <section className="space-y-4 pb-12">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-[#1B91D7] flex items-center gap-2">
            <Bell size={14} /> Notification Logic
          </h2>
          <Card className="bg-[#0B101A] border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-white uppercase tracking-tighter">SMS Alerts</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Urgent job updates via SMS</p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-[#1B91D7]" />
            </div>
          </Card>
        </section>

      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 flex justify-end px-8 z-50">
        <Button className="bg-[#1B91D7] hover:bg-blue-500 text-white font-black uppercase tracking-widest px-8 h-11">
          <Save size={16} className="mr-2" /> Commit Changes
        </Button>
      </footer>
    </div>
  );
}