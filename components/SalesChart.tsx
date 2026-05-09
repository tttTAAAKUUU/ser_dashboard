"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

const SalesChart = () => {
  const [filter, setFilter] = useState("7 days");

  const generateData = (days: number) =>
    Array.from({ length: days }, (_, i) => ({
      day: `${20 + i} Oct`,
      thisMonth: Math.floor(Math.random() * 800) + 200,
      lastMonth: Math.floor(Math.random() * 600) + 100,
    }));

  const data = generateData(filter === "7 days" ? 7 : filter === "14 days" ? 14 : 30);

  return (
    <Card className="w-full bg-zinc-950 border-zinc-800 text-white shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-black uppercase italic tracking-widest text-[#1B91D7]">Revenue Analytics</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Performance Overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="7 days" onValueChange={setFilter}>
              <SelectTrigger className="w-[120px] h-8 bg-zinc-900 border-zinc-800 text-[10px] font-bold uppercase">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="7 days">Last 7 Days</SelectItem>
                <SelectItem value="14 days">Last 14 Days</SelectItem>
                <SelectItem value="30 days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#52525b", fontSize: 10, fontWeight: "bold" }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#52525b", fontSize: 10, fontWeight: "bold" }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
                itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
              />
              <Bar dataKey="thisMonth" fill="#1B91D7" name="Current" radius={[2, 2, 0, 0]} barSize={20} />
              <Bar dataKey="lastMonth" fill="#27272a" name="Previous" radius={[2, 2, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;