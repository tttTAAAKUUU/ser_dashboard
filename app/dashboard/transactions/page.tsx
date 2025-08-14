"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { PastRequestCard } from "@/components/PastRequestCard";

const mockRequests = [
  {
    id: "1",
    serviceName: "Box Braids",
    clientName: "Lebo Mokoena",
    rating: 5,
    price: 650,
    date: "2025-06-05",
    time: "10:00 AM",
  },
  {
    id: "2",
    serviceName: "Gel Manicure",
    clientName: "Thando Dlamini",
    rating: 4,
    price: 300,
    date: "2025-06-10",
    time: "2:30 PM",
  },
  {
    id: "3",
    serviceName: "Fitness Coaching",
    clientName: "Sipho Nkosi",
    rating: 5,
    price: 800,
    date: "2025-06-14",
    time: "6:00 PM",
  },
  {
    id: "4",
    serviceName: "Haircut",
    clientName: "Nomsa Radebe",
    rating: 3,
    price: 150,
    date: "2025-06-16",
    time: "1:15 PM",
  },
  {
    id: "5",
    serviceName: "Makeup",
    clientName: "Zanele Khumalo",
    rating: 5,
    price: 1200,
    date: "2025-06-18",
    time: "11:00 AM",
  },
];

export default function PastRequestsPage() {
  const [daysFilter, setDaysFilter] = useState("7");
  const [amountFilter, setAmountFilter] = useState("1000");

  return (
    <div className="p-6 max-w-6xl mx-auto text-white space-y-8">
      <h1 className="text-2xl font-bold">Past Requests</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Days Back</label>
          <Select value={daysFilter} onValueChange={setDaysFilter}>
            <SelectTrigger className="bg-gray-800 border border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 21 }, (_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  Last {i + 1} day{i === 0 ? "" : "s"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Max Amount (R)</label>
          <Select value={amountFilter} onValueChange={setAmountFilter}>
            <SelectTrigger className="bg-gray-800 border border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Array(7)].map((_, i) => {
                const amount = (i + 1) * 500;
                return (
                  <SelectItem key={amount} value={`${amount}`}>
                    R{amount}
                  </SelectItem>
                );
              })}
              <SelectItem value="3000">R3000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {mockRequests.map((request) => (
          <PastRequestCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
}
