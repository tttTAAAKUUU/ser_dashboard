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
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ 1. Interface matching your RequestCard Props exactly
interface ServiceRequest {
  id: string;
  title: string;
  category: string;
  name: string;
  date: string;
  time: string;
  description: string;
  address: string;
  area: string;
  price: number;
  stars: number;
  serviceDetails: {
    shortDescription: string;
    requirements: string[];
    imageUrl: string;
  };
}

const mockRequests: ServiceRequest[] = [
  {
    id: "1",
    title: "Box Braids",
    category: "hair",
    name: "Lebo Mokoena",
    date: "2025-06-15",
    time: "10:00 AM",
    description: "Full head braids with extensions. Please bring own extensions.",
    address: "123 Main St",
    area: "Soweto",
    price: 650,
    stars: 5,
    serviceDetails: {
      shortDescription: "Standard box braids, mid-back length.",
      requirements: ["2x Hairpiece packs", "Shampoo", "Conditioner", "Blow dryer"],
      imageUrl: "https://images.unsplash.com/photo-1646245139744-bb5004387c69?q=80&w=500",
    }
  },
  {
    id: "3",
    title: "Haircut + Beard Trim",
    category: "hair",
    name: "Thabo Dube",
    date: "2025-06-17",
    time: "12:00 PM",
    description: "Fade haircut and beard trim. Sharp edges requested.",
    address: "Midrand Central",
    area: "Midrand",
    price: 250,
    stars: 4,
    serviceDetails: {
      shortDescription: "Gentleman's fade with hot towel beard treatment.",
      requirements: ["Clippers", "Straight razor", "Aftershave", "Sanitizer"],
      imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500",
    }
  },
  {
    id: "4",
    title: "Hair Coloring",
    category: "hair",
    name: "Zanele Khumalo",
    date: "2025-06-18",
    time: "2:00 PM",
    description: "Root touch-up and highlights. Ash blonde preferred.",
    address: "Rosebank Mall Area",
    area: "Johannesburg",
    price: 900,
    stars: 5,
    serviceDetails: {
      shortDescription: "Full color treatment and foil highlights.",
      requirements: ["Bleach", "Developer", "Toner", "Foils", "Mixing bowl"],
      imageUrl: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=500",
    }
  },
];

const providerSpecialization = "hair";

export default function RequestsPage() {
  const [filters, setFilters] = useState({
    search: "",
    price: "2000",
  });

  const resetFilters = () => setFilters({ search: "", price: "2000" });

  const filteredRequests = useMemo(() => {
    return mockRequests
      .filter((req) => req.category === providerSpecialization)
      .filter((req) =>
        `${req.area} ${req.address} ${req.title}`.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((req) => req.price <= Number(filters.price))
      .sort((a, b) => b.stars - a.stars);
  }, [filters]);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white space-y-6 font-poppins min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
          <p className="text-slate-400 text-sm">Opportunities in {providerSpecialization} services</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Status</p>
          <p className="text-xs font-semibold text-green-500 flex items-center gap-1 justify-end">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Online & Accepting
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-[#171F2E] p-4 rounded-xl border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold uppercase tracking-tighter">
            <SlidersHorizontal className="w-4 h-4" /> Preference Filters
          </div>
          <button onClick={resetFilters} className="text-xs text-slate-500 hover:text-white flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search by area or service type..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="bg-slate-900 border-slate-700 pl-10 text-white focus:ring-blue-500"
            />
          </div>

          <Select 
            value={filters.price} 
            onValueChange={(v) => setFilters({ ...filters, price: v })}
          >
            <SelectTrigger className="bg-slate-900 border-slate-700">
              <SelectValue placeholder="Max Price" />
            </SelectTrigger>
            <SelectContent>
              {[500, 1000, 2000, 5000].map((p) => (
                <SelectItem key={p} value={String(p)}>Up to R{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result List */}
      <div className="space-y-4">
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] px-1">
          {filteredRequests.length} AVAILABLE REQUESTS
        </p>

        {filteredRequests.length > 0 ? (
          <div className="grid gap-4">
            {filteredRequests.map((req) => (
              <RequestCard key={req.id} {...req} /> 
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-[#171F2E]/30 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-500 italic mb-4">No jobs match your current filters.</p>
            <Button onClick={resetFilters} variant="outline" className="border-slate-700 text-white">
              View All Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}