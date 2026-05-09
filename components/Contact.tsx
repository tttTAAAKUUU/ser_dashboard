"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

type Props = {
  appointment?: { // Made optional with '?'
    id: number;
    serviceName: string;
    clientName: string;
    dateISO: string;
  } | null; // Allow null to prevent crashes
  onClose: () => void;
  onConfirm: () => void;
};

export default function CancelModal({ appointment, onClose, onConfirm }: Props) {
  // 1. Add a 'Guard Clause'
  // If appointment is missing, return null (don't render anything)
  if (!appointment) return null;

  // 2. Safe Date Parsing
  const date = new Date(appointment.dateISO);
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 text-white rounded-xl shadow-xl border border-white/10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-400">Cancel Appointment</h3>
            <p className="text-sm text-gray-300 mt-1">
              {appointment.serviceName} with {appointment.clientName}
            </p>
            <p className="text-xs text-gray-400 font-mono mt-1">
              {dateStr} • {timeStr}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircle size={24} />
          </button>
        </div>

        <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded-lg">
          <p className="text-sm text-red-200">
            <strong>Warning:</strong> Cancelling will trigger an automatic full refund to the client. This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-slate-700 text-white hover:bg-slate-800"
          >
            Keep Appointment
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white" 
            onClick={onConfirm}
          >
            Cancel & Refund
          </Button>
        </div>
      </div>
    </div>
  );
}