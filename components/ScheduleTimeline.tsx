"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar as CalendarIcon, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; // ✅ Fixed: Added proper import
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";

const mockSchedule = [
  { id: 101, time: "09:00", label: "Deep Tissue Massage", client: "Lindiwe M", status: "confirmed", color: "bg-blue-500", duration: "60m" },
  { id: 102, time: "11:30", label: "Box Braids", client: "Thabo K", status: "pending", color: "bg-purple-500", duration: "120m" },
  { id: 103, time: "15:00", label: "Personal Training", client: "John D", status: "arrived", color: "bg-emerald-500", duration: "45m" },
];

export default function ScheduleTimeline() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents opening the job modal when clicking chat
    setIsChatOpen(true);
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white shadow-2xl">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase italic tracking-widest text-[#1B91D7]">Daily Schedule</h3>
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
            <CalendarIcon size={12} className="text-[#1B91D7]" /> 21 June 2026
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-800 ml-4 space-y-6 pb-4">
          {mockSchedule.map((job) => (
            <div 
              key={job.id} 
              className="relative pl-8 group cursor-pointer" 
              onClick={() => setSelectedJob(job)}
            >
              {/* Timeline Dot */}
              <div className={cn(
                "absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-zinc-950 transition-transform group-hover:scale-125",
                job.color
              )} />
              
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl group-hover:border-[#1B91D7] group-hover:bg-zinc-900/50 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-1.5">
                      <Clock size={12} className="text-[#1B91D7]" /> {job.time} <span className="text-zinc-700">|</span> {job.duration}
                    </p>
                    <h4 className="text-sm font-bold tracking-tight">{job.label}</h4>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">{job.client}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={openChat}
                      className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-[#1B91D7] hover:text-white text-zinc-400 transition-colors"
                    >
                      <MessageCircle size={16} />
                    </Button>
                    <span className={cn(
                      "text-[8px] font-black uppercase px-2.5 py-1 rounded-md border",
                      job.color.replace('bg-', 'text-'), 
                      job.color.replace('bg-', 'border-'),
                      "bg-opacity-10"
                    )}>
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail Modal */}
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="bg-zinc-950 border-zinc-800 p-0 overflow-hidden max-w-lg">
             {selectedJob && (
               <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xs font-black uppercase italic tracking-widest text-[#1B91D7]">Job Specification</p>
                  </div>
                  <AppointmentCard 
                    appointment={{
                        id: selectedJob.id,
                        serviceName: selectedJob.label,
                        clientName: selectedJob.client,
                        dateISO: new Date().toISOString(),
                        price: 450,
                        durationMinutes: 60,
                        location: "Bryanston, Sandton",
                        status: selectedJob.status
                    }} 
                    readOnly 
                  />
               </div>
             )}
          </DialogContent>
        </Dialog>

        {/* Fake Chat Modal */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md h-[500px] flex flex-col p-0">
            <DialogHeader className="p-4 border-b border-zinc-800">
              <DialogTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Chat with Client
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                <p className="text-xs font-bold text-zinc-400 mb-1 uppercase">Client</p>
                <p className="text-sm">Hi! Are you still on track for our 11:30 appointment?</p>
              </div>
              <div className="bg-[#1B91D7] p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-right">
                <p className="text-[10px] font-bold text-white/70 mb-1 uppercase">You</p>
                <p className="text-sm">Yes, I'm just finishing up my previous job. See you soon!</p>
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 bg-zinc-950">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#1B91D7]"
                />
                <Button className="bg-[#1B91D7] hover:bg-[#1572A8]">Send</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
}