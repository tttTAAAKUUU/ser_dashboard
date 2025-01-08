"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Info } from "lucide-react";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

const SalesChart = () => {
  const [filter, setFilter] = useState("7 days");

  // Generate random sales data
  interface SalesData {
    day: string;
    thisMonth: number;
    lastMonth: number;
  }

  const generateData = (days: number): SalesData[] =>
    Array.from({ length: days }, (_, i) => ({
      day: `Oct ${20 + i}`,
      thisMonth: Math.floor(Math.random() * 500) + 50,
      lastMonth: Math.floor(Math.random() * 500) + 50,
    }));

  const getFilteredData = () => {
    switch (filter) {
      case "7 days":
        return generateData(7);
      case "14 days":
        return generateData(14);
      case "30 days":
        return generateData(30);
      default:
        return generateData(7);
    }
  };

  const formatYAxis = (value: number): string => `R ${value}`;
  const data = getFilteredData();

  return (
    <Card className="w-full p-4 sm:p-6">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sales Difference</h3>
          <div className="flex items-center space-x-4">
            <Select
              defaultValue="7 days"
              onValueChange={(value) => setFilter(value)}
            >
              <SelectTrigger className="text-sm border rounded-md p-2">
                {filter}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7 days">Last 7 days</SelectItem>
                <SelectItem value="14 days">Last 14 days</SelectItem>
                <SelectItem value="30 days">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Info className="text-gray-400" size={20} />
          </div>
        </div>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fontSize: 14 }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                padding={{ top: 10, bottom: 10 }}
                tick={{ fontSize: 14 }}
              />
              <Tooltip
                formatter={(value) => `R ${value}`}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Bar dataKey="thisMonth" fill="#3AAFA9" name="This Month" />
              <Bar dataKey="lastMonth" fill="#F08A5D" name="Last Month" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;