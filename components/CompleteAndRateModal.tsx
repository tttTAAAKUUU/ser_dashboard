// components/CompleteAndRateModal.tsx
"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  appointment: {
    id: number;
    serviceName: string;
    clientName: string;
    dateISO: string;
  };
  onClose: () => void;
  onSubmit: (rating: { stars: number; tip?: number; comment?: string }) => void;
};

export default function CompleteAndRateModal({ appointment, onClose, onSubmit }: Props) {
  const [stars, setStars] = useState<number>(5);
  const [tip, setTip] = useState<number | "">("");
  const [comment, setComment] = useState<string>("");

  const date = new Date(appointment.dateISO);
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-slate-900 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Complete & Rate</h3>
            <p className="text-sm text-gray-300 mt-1">
              {appointment.serviceName} with {appointment.clientName}
            </p>
            <p className="text-xs text-gray-400">{dateStr} • {timeStr}</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-300 mb-2">Rate the client</label>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map((n) => (
              <Star
                key={n}
                size={28}
                className={`cursor-pointer ${stars >= n ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                onClick={() => setStars(n)}
              />
            ))}
          </div>

          <label className="block text-sm text-gray-300 mt-4 mb-1">Tip (optional)</label>
          <input
            type="number"
            min={0}
            step={1}
            value={tip}
            onChange={(e) => setTip(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="R0"
            className="w-full bg-slate-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          />

          <label className="block text-sm text-gray-300 mt-4 mb-1">Comment (optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Write a short note about the client..."
            className="w-full bg-slate-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="mt-6 flex gap-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            className="flex-1 bg-green-600"
            onClick={() => onSubmit({ stars, tip: tip === "" ? undefined : tip, comment })}
          >
            Submit & Mark Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
