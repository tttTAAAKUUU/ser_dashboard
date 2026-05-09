"use client";

import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "./AppointmentCard";

// ✅ Proper TypeScript props instead of 'any'
type CancelModalProps = {
  appointment: Appointment;
  onClose: () => void;
  onConfirm: (id: number, reason: string) => void;
};

export default function CancelModal({ appointment, onClose, onConfirm }: CancelModalProps) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleCancel = () => {
    const finalReason = customReason || reason;
    if (!reason && !customReason) return; // Prevent empty cancellations
    onConfirm(appointment.id, finalReason);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <div className="p-2 bg-red-500/10 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Cancel Job
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            You are about to cancel <span className="text-white font-semibold">{appointment.serviceName}</span> for <span className="text-white font-semibold">{appointment.clientName}</span>. This action cannot be undone.
          </p>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Reason for cancellation
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
            >
              <option value="">Select a reason...</option>
              <option value="personal">Personal Emergency</option>
              <option value="client_unavailable">Client unavailable</option>
              <option value="equipment_issue">Equipment issue</option>
              <option value="distance">Too far / Traffic</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            placeholder="Add specific details for the client..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600"
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            Go Back
          </Button>
          <Button
            onClick={handleCancel}
            disabled={!reason && !customReason}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}