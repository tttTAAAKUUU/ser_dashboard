"use client";
import React from "react";
import { Clock, Tag, MapPin, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Define types locally to fix the "Module Not Found" error
export type AppointmentStatus =
  | "pending" | "confirmed" | "on_the_way" | "arrived" | "started" | "completed" | "cancelled";

export interface Appointment {
  id: number;
  serviceName: string;
  clientName: string;
  dateISO: string;
  price: number;
  durationMinutes: number;
  location: string;
  notes?: string;
  status: AppointmentStatus;
}

type Props = {
  appointment: Appointment;
  onProgress?: () => void;
  onCancel?: () => void;
  readOnly?: boolean;
};

const getStatusTheme = (s: AppointmentStatus) => {
  const themes: Record<AppointmentStatus, string> = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    on_the_way: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    arrived: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    started: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    completed: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return themes[s] || themes.pending;
};

const getActionLabel = (s: AppointmentStatus) => {
  switch (s) {
    case "pending": return "Confirm Job";
    case "confirmed": return "Start Driving";
    case "on_the_way": return "I've Arrived";
    case "arrived": return "Start Service";
    case "started": return "Finish Job";
    default: return "Next";
  }
};

export default function AppointmentCard({ appointment, onProgress, onCancel, readOnly }: Props) {
  const date = new Date(appointment.dateISO);
  
  return (
    <div className="bg-[#171F2E] border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg hover:border-blue-500/30 transition-all">
      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-tighter ${getStatusTheme(appointment.status)}`}>
            {appointment.status.replace("_", " ")}
          </span>
          <div className="text-right">
            <p className="text-xs font-bold text-white">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-[10px] text-slate-500">{date.toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg text-white leading-tight">{appointment.serviceName}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-blue-400">
            <User size={14} />
            <span className="font-medium">{appointment.clientName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock size={14} className="text-blue-500" /> {appointment.durationMinutes}m
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Tag size={14} className="text-blue-500" /> R{appointment.price}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 col-span-2">
            <MapPin size={14} className="text-blue-500 shrink-0" /> 
            <span className="truncate">{appointment.location}</span>
          </div>
        </div>
      </div>

      {!readOnly && (
        <div className="p-4 bg-slate-900/30 border-t border-slate-800 flex gap-2">
          <Button 
            onClick={onProgress} 
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 text-xs"
          >
            {getActionLabel(appointment.status)} <ChevronRight size={14} className="ml-1" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={onCancel} 
            className="px-3 h-9 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}