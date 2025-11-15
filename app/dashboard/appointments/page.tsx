// app/dashboard/provider/appointments/page.tsx
"use client";

import React, { useState } from "react";
import AppointmentCard from "@/components/AppointmentCard";
import CancelModal from "@/components/CancelModal";
import CompleteAndRateModal from "@/components/CompleteAndRateModal";
import { Button } from "@/components/ui/button";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "on_the_way"
  | "arrived"
  | "started"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: number;
  serviceName: string;
  clientName: string;
  clientId?: number | string;
  dateISO: string; // ISO string
  price: number;
  durationMinutes: number;
  location: string;
  notes?: string;
  status: AppointmentStatus;
  // provider-side-only metadata
  providerNotes?: string;
  // optional rating left by provider about client (after completion)
  providerRating?: {
    stars: number;
    tip?: number;
    comment?: string;
  } | null;
};

const initialAppointments: Appointment[] = [
  {
    id: 101,
    serviceName: "Deep Tissue Massage",
    clientName: "Lindiwe M",
    clientId: 501,
    dateISO: "2025-11-20T10:00:00Z",
    price: 350,
    durationMinutes: 60,
    location: "Client home — 45 Rose Ave",
    notes: "Prefers deep pressure, history of shoulder pain",
    status: "confirmed",
  },
  {
    id: 102,
    serviceName: "Braiding - Full Head",
    clientName: "Thabo K",
    clientId: 502,
    dateISO: "2025-11-20T14:00:00Z",
    price: 450,
    durationMinutes: 120,
    location: "In-store — 12 Market St",
    notes: "Bring extra hairpieces",
    status: "pending",
  },
  {
    id: 103,
    serviceName: "Men's Haircut",
    clientName: "Nomsa Z",
    clientId: 503,
    dateISO: "2025-11-12T09:00:00Z",
    price: 120,
    durationMinutes: 30,
    location: "In-store — Downtown Salon",
    notes: "Style: low fade",
    status: "completed",
    providerRating: { stars: 5, tip: 20, comment: "Great client, punctual" },
  },
];

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(
    initialAppointments
  );

  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const updateStatus = (id: number, newStatus: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleStartProgression = (appt: Appointment) => {
    // move to next logical status
    const order: Appointment["status"][] = [
      "pending",
      "confirmed",
      "on_the_way",
      "arrived",
      "started",
      "completed",
    ];
    const idx = order.indexOf(appt.status);
    const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : appt.status;
    if (next === "completed") {
      // open complete modal for rating & tip
      setSelected(appt);
      setShowCompleteModal(true);
    } else {
      updateStatus(appt.id, next);
    }
  };

  const handleSetStatus = (id: number, status: Appointment["status"]) => {
    updateStatus(id, status);
  };

  const handleCancel = (appt: Appointment) => {
    setSelected(appt);
    setShowCancelModal(true);
  };

  const confirmCancel = (id: number) => {
    // in real app you'd call API to cancel and process refund logic
    updateStatus(id, "cancelled");
    setShowCancelModal(false);
    setSelected(null);
  };

  const submitCompletion = (id: number, rating: { stars: number; tip?: number; comment?: string }) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "completed", providerRating: rating } : a
      )
    );
    setShowCompleteModal(false);
    setSelected(null);
  };

  const upcoming = appointments.filter((a) => a.status !== "completed" && a.status !== "cancelled");
  const past = appointments.filter((a) => a.status === "completed" || a.status === "cancelled");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-white">Your Appointments</h1>

      <section>
        <h2 className="text-lg font-medium text-gray-200 mb-3">Upcoming</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.length === 0 && (
            <div className="text-gray-400">No upcoming appointments</div>
          )}
          {upcoming.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onProgress={() => handleStartProgression(appt)}
              onSetStatus={(s) => handleSetStatus(appt.id, s)}
              onCancel={() => handleCancel(appt)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-gray-200 mt-6 mb-3">Past</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {past.length === 0 && <div className="text-gray-400">No past appointments yet</div>}
          {past.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              // progression is disabled for completed/cancelled
              onProgress={() => {}}
              onSetStatus={() => {}}
              onCancel={() => {}}
              readOnly
            />
          ))}
        </div>
      </section>

      {showCancelModal && selected && (
        <CancelModal
          appointment={selected}
          onClose={() => {
            setShowCancelModal(false);
            setSelected(null);
          }}
          onConfirm={() => confirmCancel(selected.id)}
        />
      )}

      {showCompleteModal && selected && (
        <CompleteAndRateModal
          appointment={selected}
          onClose={() => {
            setShowCompleteModal(false);
            setSelected(null);
          }}
          onSubmit={(rating) => submitCompletion(selected.id, rating)}
        />
      )}
    </div>
  );
}
