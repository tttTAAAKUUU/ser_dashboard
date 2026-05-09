"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Star, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function PastRequestCard({ serviceName, clientName, rating, price, date, time }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-zinc-950 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all">
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#1B91D7]">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white leading-tight">{serviceName}</h4>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{clientName} • {date}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
          <div className="text-center">
            <p className="text-xs font-black text-white">R{price}</p>
            <div className="flex items-center gap-0.5 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} fill={i < rating ? "currentColor" : "none"} stroke="currentColor" />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(true)}
              className="h-9 px-4 border-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 text-[10px] font-black uppercase tracking-widest"
            >
              <AlertCircle size={14} className="mr-2" /> Query
            </Button>
          </div>
        </div>
      </div>

      {/* Query Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-black uppercase italic tracking-widest text-[#1B91D7] flex items-center gap-2">
              <MessageSquare size={16} /> Report/Query Job
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-[10px] text-zinc-500 font-bold leading-relaxed">
              SUBMITTING A QUERY FOR: <span className="text-white uppercase">{serviceName}</span> WITH {clientName.toUpperCase()}
            </p>
            <Textarea 
              placeholder="Describe the issue (e.g., Payment dispute, damage, or feedback)..."
              className="bg-zinc-900 border-zinc-800 min-h-[120px] text-sm focus:border-red-500/50"
            />
            <div className="flex gap-2">
              <Button onClick={() => setIsOpen(false)} variant="ghost" className="flex-1 text-zinc-500 text-[10px] font-black uppercase">Cancel</Button>
              <Button className="flex-1 bg-[#1B91D7] text-white text-[10px] font-black uppercase tracking-widest">Submit Query</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}