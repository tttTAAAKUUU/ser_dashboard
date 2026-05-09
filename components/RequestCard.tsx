"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Star, Scissors, Car, Dumbbell, Home, ImageIcon, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryConfig: any = {
  grooming: { icon: Scissors, color: "text-blue-500", bg: "bg-blue-500/10", label: "Grooming", mode: "bid" },
  carwash: { icon: Car, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Carwash", mode: "fixed" },
  fitness: { icon: Dumbbell, color: "text-orange-500", bg: "bg-orange-500/10", label: "Fitness", mode: "bid" },
  domestic: { icon: Home, color: "text-purple-500", bg: "bg-purple-500/10", label: "Domestic", mode: "fixed" },
};

export function RequestCard({ req }: { req: any }) {
  const [isBidOpen, setIsBidOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  const config = categoryConfig[req.category] || categoryConfig.grooming;
  const Icon = config.icon;

  return (
    <>
      <Card className="bg-[#0B101A] border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all border-l-4" 
            style={{ borderLeftColor: `var(--${config.color.split('-')[1]}-500)` }}>
        <div className="p-5 flex flex-col md:flex-row gap-6">
          
          {/* Reference Image with Click-to-Enlarge */}
          {req.category === "grooming" && req.refImage && (
            <div 
              className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden border border-zinc-800 shrink-0 cursor-zoom-in group"
              onClick={() => setIsImageOpen(true)}
            >
              <img src={req.refImage} alt="Reference" className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <ImageIcon size={20} className="text-white" />
              </div>
            </div>
          )}

          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded", config.bg, config.color)}>
                    {config.label}
                  </span>
                  <h3 className="font-bold text-lg text-white">{req.title}</h3>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase font-black flex items-center gap-2">
                  <MapPin size={12} className="text-blue-400" /> {req.area} • {req.distance}km away
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-white">R{req.price}</p>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">
                  {config.mode === "fixed" ? "Fixed Price" : "Est. Budget"}
                </p>
              </div>
            </div>

            {req.category === "domestic" && req.houseSize && (
              <div className="bg-zinc-900 border border-zinc-800 w-fit px-3 py-1.5 rounded-md flex items-center gap-2">
                <Home size={14} className="text-purple-400" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase">Size: {req.houseSize}</span>
              </div>
            )}

            <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
              <p className="text-[10px] text-zinc-500 font-black uppercase mb-1 tracking-widest">Client Instructions</p>
              <p className="text-xs text-zinc-300 italic leading-relaxed">"{req.description}"</p>
            </div>
          </div>

          <div className="flex flex-col justify-end items-end min-w-[140px] border-l border-zinc-800 pl-4">
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-black">{req.stars}</span>
            </div>
            
            <Button 
              onClick={() => setIsBidOpen(true)}
              className={cn(
                "w-full font-black uppercase text-[11px] tracking-widest h-12",
                config.mode === "bid" ? "bg-white text-black hover:bg-zinc-200" : "bg-blue-600 hover:bg-blue-500 text-white"
              )}
            >
              {config.mode === "bid" ? "Submit Bid" : "Accept Job"}
            </Button>
          </div>
        </div>
      </Card>

      {/* 1. Image Enlargement Modal */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="bg-transparent border-none p-0 max-w-3xl shadow-none flex items-center justify-center">
          <div className="relative group">
            <img src={req.refImage} alt="Large Reference" className="rounded-xl border border-zinc-800 max-h-[80vh] w-auto" />
            <button 
              onClick={() => setIsImageOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-1 hover:bg-zinc-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Bid Submission Modal */}
      <Dialog open={isBidOpen} onOpenChange={setIsBidOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">
              {config.mode === "bid" ? "Place Your Bid" : "Confirm Acceptance"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Proposed Price (ZAR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">R</span>
                <Input 
                  type="number" 
                  defaultValue={req.price}
                  className="bg-zinc-900 border-zinc-800 pl-8 focus:border-blue-500 text-lg font-bold" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Message to Client</label>
              <Textarea 
                placeholder="Briefly explain your experience or why you're a fit..." 
                className="bg-zinc-900 border-zinc-800 min-h-[100px] focus:border-blue-500"
              />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-500 font-black uppercase tracking-widest py-6">
              Confirm & Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}