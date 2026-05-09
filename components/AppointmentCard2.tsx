"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Image as ImageIcon, MapPin, Calendar, Star, CheckCircle2, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Defined the type locally or import it if shared
type RequestProps = {
  title: string;
  name: string;
  date: string;
  time: string;
  description: string;
  address: string;
  area: string;
  price: number;
  stars: number;
  showAcceptButton?: boolean;
  serviceDetails?: {
    shortDescription: string;
    requirements: string[];
    imageUrl?: string;
  };
};

export function RequestCard({
  title,
  name,
  date,
  time,
  description,
  address,
  area,
  price,
  stars,
  showAcceptButton = true,
  serviceDetails = {
    shortDescription: "Professional hair service at client’s location.",
    requirements: ["2x Hairpiece packs", "Shampoo", "Conditioner", "Blow dryer", "Clippers"],
    imageUrl: "/placeholder-service.jpg",
  },
}: RequestProps) {
  const [modal, setModal] = useState<"info" | "image" | "confirm" | null>(null);

  // Memoize date to avoid re-calculating on every render
  const formattedDate = useMemo(() => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? date : d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  }, [date]);

  const closeModal = () => setModal(null);

  return (
    <>
      <Card className="bg-[#171F2E] border-slate-800 text-white shadow-xl hover:border-blue-500/40 transition-all duration-300 overflow-hidden">
        <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold tracking-tight">{title}</CardTitle>
                <div className="flex gap-1">
                  <button onClick={() => setModal("info")} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-blue-400 transition-colors">
                    <Info size={14} />
                  </button>
                  <button onClick={() => setModal("image")} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-blue-400 transition-colors">
                    <ImageIcon size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-500" /> {formattedDate} @ {time}</span>
                <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-500" /> {area}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-blue-400">R{price}</div>
              <div className="flex items-center justify-end gap-1 text-[10px] text-yellow-500 font-bold uppercase">
                <Star size={10} className="fill-current" /> {stars}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
              <User size={10} /> Client: {name}
            </div>
            <p className="text-sm text-slate-300 line-clamp-2 bg-slate-900/40 p-2.5 rounded-md border border-white/5 italic">
              "{description}"
            </p>
          </div>

          {showAcceptButton && (
            <Button 
              onClick={() => setModal("confirm")}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
            >
              Accept Job Request
            </Button>
          )}
        </CardContent>
      </Card>

      {/* --- Modals --- */}
      
      {/* Info Modal */}
      <Dialog open={modal === "info"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#0F172A] text-white border-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 border-b border-white/10 pb-2 text-blue-400">
              <Info size={18} /> Service Requirements
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-400 leading-relaxed">{serviceDetails.shortDescription}</p>
            <div className="grid grid-cols-2 gap-2">
              {serviceDetails.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs bg-slate-800/50 p-2 rounded-lg border border-white/5 text-slate-200">
                  <CheckCircle2 size={12} className="text-green-500" /> {req}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={modal === "image"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#0F172A] text-white border-slate-800 p-2 max-w-sm">
          <img 
            src={serviceDetails.imageUrl} 
            alt="Reference" 
            className="w-full aspect-square object-cover rounded-md" 
          />
          <p className="p-3 text-center text-xs font-bold uppercase tracking-widest text-slate-500">Style Reference</p>
        </DialogContent>
      </Dialog>

      {/* Acceptance Modal */}
      <Dialog open={modal === "confirm"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#0F172A] text-white border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Confirm Acceptance</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-full text-blue-500 mb-2">
               <Calendar size={32} />
            </div>
            <p className="text-sm text-slate-400 px-4">
              You are committing to arrive at <span className="text-white font-bold">{address}</span> on <span className="text-white font-bold">{formattedDate}</span> at <span className="text-white font-bold">{time}</span>.
            </p>
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-tighter bg-red-500/10 py-1 rounded">
              Warning: Cancellations after acceptance affect your rating.
            </p>
          </div>
          <DialogFooter className="flex-row gap-2 sm:justify-center">
            <Button variant="ghost" onClick={closeModal} className="flex-1 text-slate-500">Back</Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold">Confirm Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}