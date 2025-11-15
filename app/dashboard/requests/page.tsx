"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RequestCard } from "@/components/RequestCard";

// Mock logged-in provider specialization (replace with real data later)
const providerSpecialization = "hair";

// Mock client requests
const mockRequests = [
  {
    id: "1",
    title: "Box Braids",
    category: "hair",
    name: "Lebo Mokoena",
    date: "2025-06-15",
    time: "10:00 AM",
    description: "Full head braids with extensions.",
    address: "123 Main St",
    area: "Soweto",
    distance: 5, // km
    price: 650,
    stars: 5,
  },
  {
    id: "2",
    title: "Personal Training Session",
    category: "fitness",
    name: "Sipho Nkosi",
    date: "2025-06-16",
    time: "7:00 AM",
    description: "1-hour morning workout session.",
    address: "Sandton City",
    area: "Sandton",
    distance: 8,
    price: 400,
    stars: 4,
  },
  {
    id: "3",
    title: "Haircut + Beard Trim",
    category: "hair",
    name: "Thabo Dube",
    date: "2025-06-17",
    time: "12:00 PM",
    description: "Fade haircut and beard trim.",
    address: "Midrand Central",
    area: "Midrand",
    distance: 12,
    price: 250,
    stars: 4,
  },
  {
    id: "4",
    title: "Hair Coloring",
    category: "hair",
    name: "Zanele Khumalo",
    date: "2025-06-18",
    time: "2:00 PM",
    description: "Root touch-up and highlights.",
    address: "Rosebank",
    area: "Johannesburg",
    distance: 6,
    price: 900,
    stars: 5,
  },
];

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDistance, setMaxDistance] = useState("20");
  const [maxPrice, setMaxPrice] = useState("2000");

  // Filter + sort logic
  const filteredRequests = useMemo(() => {
    return mockRequests
      .filter((req) => req.category === providerSpecialization)
      .filter(
        (req) =>
          req.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((req) => req.distance <= Number(maxDistance))
      .filter((req) => req.price <= Number(maxPrice))
      .sort((a, b) => b.stars - a.stars);
  }, [searchTerm, maxDistance, maxPrice]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white space-y-8 font-poppins">
      <h1 className="text-2xl font-bold text-white">Available Requests</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search by area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Search by Area</label>
          <Input
            placeholder="Type location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Filter by distance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Max Distance (km)</label>
          <Select value={maxDistance} onValueChange={setMaxDistance}>
            <SelectTrigger className="bg-gray-800 border border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30].map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} km
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter by price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Max Price (R)</label>
          <Select value={maxPrice} onValueChange={setMaxPrice}>
            <SelectTrigger className="bg-gray-800 border border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[500, 1000, 1500, 2000, 3000].map((p) => (
                <SelectItem key={p} value={String(p)}>
                  R{p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <RequestCard
              key={req.id}
              title={req.title}
              name={req.name}
              date={req.date}
              time={req.time}
              description={req.description}
              address={req.address}
              area={req.area}
              price={req.price}
              stars={req.stars}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center pt-8">
            No matching requests found.
          </p>
        )}
      </div>
    </div>
  );
}
