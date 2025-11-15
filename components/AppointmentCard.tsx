// components/AppointmentCard.tsx
"use client";

import React from "react";
import { Appointment, AppointmentStatus } from "@/app/dashboard/appointments/page";
import { Calendar, Clock, MapPin, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  appointment: Appointment;
  onProgress?: () => void; // move to next status
  onSetStatus?: (s: AppointmentStatus) => void;
  onCancel?: () => void;
  readOnly?: boolean; // no actions
};

const statusLabel = (s: AppointmentStatus) => {
  if (!s) return "";
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function AppointmentCard({
  appointment,
  onProgress,
  onSetStatus,
  onCancel,
  readOnly = false,
}: Props) {
  const date = new Date(appointment.dateISO);
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const canProgress = !readOnly && appointment.status !== "completed" && appointment.status !== "cancelled";

  return (
    <div className="bg-slate-800 border border-gray-700 rounded-lg p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-white font-semibold">{appointment.serviceName}</h3>
            <p className="text-sm text-gray-300">{appointment.clientName}</p>
          </div>
          <div className="text-right">
            <span className="block text-sm text-gray-400">{dateStr}</span>
            <span className="block text-sm text-gray-200">{timeStr}</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-300 space-y-2">
          <div className="flex items-center gap-2">
            <Clock size={14} /> <span>{appointment.durationMinutes} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={14} /> <span>R{appointment.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> <span className="truncate">{appointment.location}</span>
          </div>
          {appointment.notes && (
            <div className="pt-2 text-xs text-gray-400">Notes: {appointment.notes}</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              appointment.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : appointment.status === "confirmed"
                ? "bg-blue-100 text-blue-700"
                : appointment.status === "on_the_way"
                ? "bg-indigo-100 text-indigo-700"
                : appointment.status === "arrived"
                ? "bg-purple-100 text-purple-700"
                : appointment.status === "started"
                ? "bg-teal-100 text-teal-700"
                : appointment.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {statusLabel(appointment.status)}
          </span>

          {!readOnly && (
            <div className="flex gap-2">
              {/* Progress button moves to next step */}
              <Button size="sm" onClick={onProgress} className="bg-indigo-600 hover:bg-indigo-700">
                {appointment.status === "completed" ? "Completed" : "Next"}
              </Button>

              <Button size="sm" variant="ghost" onClick={onCancel} className="border border-red-600 text-red-500">
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Quick set status (for testing / manual override) */}
        {!readOnly && onSetStatus && (
          <div className="flex flex-wrap gap-2 mt-2">
            {["pending","confirmed","on_the_way","arrived","started","completed"].map((s) => (
              <button
                key={s}
                onClick={() => onSetStatus(s as AppointmentStatus)}
                className={`text-xs px-2 py-1 rounded-md border text-gray-200 ${
                  appointment.status === s ? "bg-gray-700 border-gray-600" : "bg-transparent border-gray-600"
                }`}
              >
                {statusLabel(s as AppointmentStatus)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
