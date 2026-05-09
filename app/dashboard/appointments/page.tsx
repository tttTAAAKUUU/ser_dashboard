"use client";

import React, { useState, useMemo } from "react";
// ✅ Import types from the component to avoid circular errors
import AppointmentCard, { Appointment, AppointmentStatus } from "@/components/AppointmentCard";
import CancelModal from "@/components/CancelModal";
import CompleteAndRateModal from "@/components/CompleteAndRateModal";

const initialAppointments: Appointment[] = [
  {
    id: 101,
    serviceName: "Deep Tissue Massage",
    clientName: "Lindiwe M",
    dateISO: "2025-11-20T10:00:00Z",
    price: 350,
    durationMinutes: 60,
    location: "45 Rose Ave, Sandton",
    status: "confirmed",
  },
  {
    id: 102,
    serviceName: "Braiding - Full Head",
    clientName: "Thabo K",
    dateISO: "2025-11-20T14:00:00Z",
    price: 450,
    durationMinutes: 120,
    location: "12 Market St, JHB",
    status: "pending",
  }
];

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [modalType, setModalType] = useState<"cancel" | "complete" | null>(null);

  const updateStatus = (id: number, newStatus: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleProgress = (appt: Appointment) => {
    const order: AppointmentStatus[] = ["pending", "confirmed", "on_the_way", "arrived", "started", "completed"];
    const nextIdx = order.indexOf(appt.status) + 1;
    const nextStatus = order[nextIdx];

    if (nextStatus === "completed") {
      setSelectedAppt(appt);
      setModalType("complete");
    } else if (nextStatus) {
      updateStatus(appt.id, nextStatus);
    }
  };

  const { upcoming, past } = useMemo(() => ({
    upcoming: appointments.filter(a => !["completed", "cancelled"].includes(a.status)),
    past: appointments.filter(a => ["completed", "cancelled"].includes(a.status))
  }), [appointments]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen text-white">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-slate-400 text-sm">Track your active bookings and history.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-blue-500 px-1">Active Jobs</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map(appt => (
            <AppointmentCard 
              key={appt.id} 
              appointment={appt} 
              onProgress={() => handleProgress(appt)} 
              onCancel={() => { setSelectedAppt(appt); setModalType("cancel"); }}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4 opacity-70">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 px-1">History</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {past.map(appt => <AppointmentCard key={appt.id} appointment={appt} readOnly />)}
        </div>
      </section>

      {modalType === "cancel" && selectedAppt && (
        <CancelModal 
          appointment={selectedAppt} 
          onClose={() => setModalType(null)} 
          onConfirm={() => { updateStatus(selectedAppt.id, "cancelled"); setModalType(null); }} 
        />
      )}

      {modalType === "complete" && selectedAppt && (
        <CompleteAndRateModal 
          appointment={selectedAppt} 
          onClose={() => setModalType(null)} 
          onSubmit={() => { updateStatus(selectedAppt.id, "completed"); setModalType(null); }} 
        />
      )}
    </div>
  );
}