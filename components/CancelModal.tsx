"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function CancelModal({ appointment, onClose }: any) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleCancel = () => {
    const finalReason = customReason || reason;
    console.log("Cancelling appointment:", appointment, "Reason:", finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Cancel {appointment?.serviceName} Appointment
        </h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to cancel this appointment?
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for cancellation
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
        >
          <option value="">Select reason...</option>
          <option value="personal">Personal</option>
          <option value="client unavailable">Client unavailable</option>
          <option value="equipment issue">Equipment issue</option>
        </select>

        <textarea
          placeholder="Optional: add more details..."
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
          rows={3}
        />

        <button
          onClick={handleCancel}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Confirm Cancel
        </button>
      </div>
    </div>
  );
}
