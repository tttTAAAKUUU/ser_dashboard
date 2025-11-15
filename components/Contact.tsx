// components/CancelModal.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

type Props = {
  appointment: {
    id: number;
    serviceName: string;
    clientName: string;
    dateISO: string;
  };
  onClose: () => void;
  onConfirm: () => void;
};

export default function CancelModal({ appointment, onClose, onConfirm }: Props) {
  const date = new Date(appointment.dateISO);
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-slate-900 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Cancel Appointment</h3>
            <p className="text-sm text-gray-300 mt-1">{appointment.serviceName} with {appointment.clientName}</p>
            <p className="text-xs text-gray-400">{dateStr} • {timeStr}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <XCircle />
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <p>
            Cancelling this appointment will require the system to issue a full refund to the client. Are you sure you want to proceed?
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">No, keep appointment</Button>
          <Button className="flex-1 bg-red-600" onClick={onConfirm}>Yes, cancel & refund</Button>
        </div>
      </div>
    </div>
  );
}
