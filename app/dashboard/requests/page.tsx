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
import { RequestCard } from "@/components/RequestCard"; // Ensure this matches your component name
import { Search, SlidersHorizontal, RotateCcw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Updated Interface to support category-specific fields
interface ServiceRequest {
  id: string;
  title: string;
  category: "grooming" | "carwash" | "fitness" | "domestic";
  area: string;
  distance: number;
  price: number;
  stars: number;
  description: string;
  houseSize?: string; // Domestic only
  refImage?: string;   // Grooming only
}

const mockRequests: ServiceRequest[] = [
  {
    id: "1",
    title: "Knotless Braids",
    category: "grooming",
    area: "Bryanston",
    distance: 2.4,
    price: 850,
    stars: 4.9,
    description: "Medium size, waist length. Please bring your own products.",
    refImage: "https://images.unsplash.com/photo-1646245139744-bb5004387c69?q=80&w=300",
  },
  {
    id: "2",
    title: "Full Valet + Engine Clean",
    category: "carwash",
    area: "Sandton",
    distance: 5.1,
    price: 450,
    stars: 4.8,
    description: "SUV parked in basement. Access to water and power provided.",
  },
  {
    id: "3",
    title: "Deep Home Cleaning",
    category: "domestic",
    area: "Morningside",
    distance: 3.8,
    price: 600,
    stars: 4.7,
    houseSize: "3 Bed, 2 Bath",
    description: "Need carpets vacuumed and windows cleaned.",
  },
  {
    id: "4",
    title: "1-on-1 HIIT Session",
    category: "fitness",
    area: "River Club",
    distance: 1.2,
    price: 350,
    stars: 5.0,
    description: "Focusing on core and cardio. Home gym available.",
  },
];

export default function RequestsPage() {
  const [filters, setFilters] = useState({
    search: "",
    distance: "10",
  });

  const resetFilters = () => setFilters({ search: "", distance: "10" });

  const filteredRequests = useMemo(() => {
    return mockRequests
      .filter((req) =>
        `${req.area} ${req.title}`.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((req) => req.distance <= Number(filters.distance))
      .sort((a, b) => b.stars - a.stars);
  }, [filters]);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white space-y-6 font-poppins min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Job Board</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Local Opportunities</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase font-black text-zinc-600 tracking-widest">Provider Status</p>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 justify-end">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Online
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
            <SlidersHorizontal className="w-3 h-3" /> Preference Filters
          </div>
          <button 
            onClick={resetFilters} 
            className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <Input
              placeholder="Search by area or service type..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="bg-zinc-950 border-zinc-800 pl-10 text-white focus:border-blue-500 h-11"
            />
          </div>

          <Select 
            value={filters.distance} 
            onValueChange={(v) => setFilters({ ...filters, distance: v })}
          >
            <SelectTrigger className="bg-zinc-950 border-zinc-800 h-11 text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-500" />
                <SelectValue placeholder="Distance" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
              {[2, 5, 10, 20, 50].map((d) => (
                <SelectItem key={d} value={String(d)}>Within {d}km</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result List */}
      <div className="space-y-4 pb-12">
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em]">
            {filteredRequests.length} MATCHING REQUESTS
          </p>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="grid gap-4">
            {filteredRequests.map((req) => (
              <RequestCard key={req.id} req={req} /> 
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-zinc-900/20 rounded-3xl border-2 border-dashed border-zinc-800">
            <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest mb-4 italic">No jobs found in this range.</p>
            <Button onClick={resetFilters} variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
              Expand Search Radius
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}