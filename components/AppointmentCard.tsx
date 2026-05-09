"use client";
import React, { useState } from "react";
import { 
  Clock, MapPin, ChevronRight, User, Info, 
  MessageSquare, Scissors, Car, Dumbbell, Home 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const categoryConfig: any = {
  grooming: { icon: Scissors, color: "text-blue-500", bg: "bg-blue-500/10", label: "Grooming" },
  carwash: { icon: Car, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Carwash" },
  fitness: { icon: Dumbbell, color: "text-orange-500", bg: "bg-orange-500/10", label: "Fitness" },
  domestic: { icon: Home, color: "text-purple-500", bg: "bg-purple-500/10", label: "Domestic" },
};

const getStatusTheme = (s: string) => {
  const themes: any = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    on_the_way: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    arrived: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    started: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    completed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return themes[s] || themes.pending;
};

export default function AppointmentCard({ appointment, onProgress, onCancel, readOnly }: any) {
  const [showEquipment, setShowEquipment] = useState(false);
  const config = categoryConfig[appointment.category] || categoryConfig.grooming;
  const date = new Date(appointment.dateISO);

  return (
    <div className="bg-[#0B101A] border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl hover:border-zinc-700 transition-all">
      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <span className={cn("text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter", getStatusTheme(appointment.status))}>
            {appointment.status.replace("_", " ")}
          </span>
          <div className="flex items-center gap-2">
             <button 
                onClick={() => setShowEquipment(true)}
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
             >
               <Info size={14} />
             </button>
             <div className="text-right">
                <p className="text-xs font-black text-white">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">{date.toLocaleDateString()}</p>
             </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
             <config.icon size={14} className={config.color} />
             <h3 className="font-bold text-base text-white leading-tight">{appointment.serviceName}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-blue-400">
              <User size={14} />
              <span className="font-bold">{appointment.clientName}</span>
            </div>
            <p className="text-lg font-black text-white">R{appointment.price}</p>
          </div>
        </div>

        {/* Metadata section (House size etc) */}
        {appointment.category === "domestic" && appointment.houseSize && (
          <div className="bg-zinc-900/50 px-2 py-1 rounded text-[10px] font-bold text-purple-400 border border-purple-500/10 w-fit">
            SIZE: {appointment.houseSize}
          </div>
        )}

        <div className="space-y-2 pt-2 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <MapPin size={13} className="text-zinc-600 shrink-0" /> 
            <span className="truncate">{appointment.location}</span>
          </div>
        </div>
      </div>

      {!readOnly && (
        <div className="p-3 bg-zinc-900/30 border-t border-zinc-800 flex gap-2">
          <Button 
            onClick={onProgress} 
            className="flex-1 bg-[#1B91D7] hover:bg-blue-500 text-white font-black h-10 text-[10px] uppercase tracking-widest"
          >
            Update Status <ChevronRight size={14} className="ml-1" />
          </Button>
          <Button 
            variant="ghost" 
            className="w-10 h-10 p-0 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#1B91D7]"
          >
            <MessageSquare size={18} />
          </Button>
        </div>
      )}

      {/* Equipment Modal */}
      <Dialog open={showEquipment} onOpenChange={setShowEquipment}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-black uppercase tracking-[0.2em] text-[#1B91D7]">Required Equipment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-2">
               {appointment.requirements?.map((item: string, i: number) => (
                 <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {item}
                 </div>
               ))}
            </div>
            <p className="text-[10px] text-zinc-500 italic">Please ensure all tools are sanitized before the Bryanston site visit.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}