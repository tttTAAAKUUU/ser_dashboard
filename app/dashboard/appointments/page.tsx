"use client";
import React, { useState, useMemo } from "react";
import AppointmentCard from "@/components/AppointmentCard";

const initialAppointments = [
  {
    id: 101,
    serviceName: "Full House Clean",
    category: "domestic",
    houseSize: "3 Bed, 2 Bath",
    clientName: "Lindiwe M",
    dateISO: "2026-05-20T10:00:00Z",
    price: 650,
    location: "45 Rose Ave, Bryanston",
    status: "confirmed",
    requirements: ["Vacuum", "Mop", "All-purpose cleaner", "Microfiber cloths"]
  },
  {
    id: 102,
    serviceName: "Knotless Braids",
    category: "grooming",
    clientName: "Thabo K",
    dateISO: "2026-05-20T14:00:00Z",
    price: 850,
    location: "12 Market St, Sandton",
    status: "pending",
    requirements: ["Comb set", "Shine 'n Jam", "Edge control", "Blow dryer"]
  }
];

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleProgress = (appt: any) => {
    const order = ["pending", "confirmed", "on_the_way", "arrived", "started", "completed"];
    const nextStatus = order[order.indexOf(appt.status) + 1];
    if (nextStatus) {
       setAppointments(prev => prev.map(a => a.id === appt.id ? { ...a, status: nextStatus } : a));
    }
  };

  const { upcoming, past } = useMemo(() => ({
    upcoming: appointments.filter(a => !["completed", "cancelled"].includes(a.status)),
    past: appointments.filter(a => ["completed", "cancelled"].includes(a.status))
  }), [appointments]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen">
      <header>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Daily Schedule</h1>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Active & Previous Jobs</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map(appt => (
          <AppointmentCard 
            key={appt.id} 
            appointment={appt} 
            onProgress={() => handleProgress(appt)} 
          />
        ))}
      </div>

      {past.length > 0 && (
        <section className="pt-8 border-t border-zinc-800">
           <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4">Shift History</h2>
           <div className="grid gap-4 md:grid-cols-3 opacity-60 grayscale">
             {past.map(appt => <AppointmentCard key={appt.id} appointment={appt} readOnly />)}
           </div>
        </section>
      )}
    </div>
  );
}