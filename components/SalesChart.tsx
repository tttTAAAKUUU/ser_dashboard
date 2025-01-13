"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

const SalesChart = () => {
  const [filter, setFilter] = useState("7 days");
  const [showDummyDataInfo, setShowDummyDataInfo] = useState(true);

  // Generate random sales data
  const generateData = (days: number) =>
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

  const data = getFilteredData();

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded-md">
          <p className="text-sm text-white">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-white">
              {item.name}: R {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => `R ${value}`;

  return (
    <Card className="w-full bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Sales</h3>
          <div className="flex items-center space-x-4">
            <Select
              defaultValue="7 days"
              onValueChange={(value) => setFilter(value)}
            >
              <SelectTrigger className="text-sm border rounded-md p-2 text-gray-200 bg-transparent border-gray-600">
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
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003DA5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#05C3DE" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A3E0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#05C3DE" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fill: "#ffffff", fontSize: 14 }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                padding={{ top: 10, bottom: 10 }}
                tick={{ fill: "#ffffff", fontSize: 14 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "#2E2E2E",
                  opacity: 0.5,
                }}
              />
              <Legend
                wrapperStyle={{
                  color: "#ffffff", // White text
                  fontSize: "14px", // Adjust size if needed
                }}
                iconType="square" // Square box
              />
              <Bar
                dataKey="thisMonth"
                fill="url(#colorThisMonth)"
                name="This Month"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="lastMonth"
                fill="url(#colorLastMonth)"
                name="Last Month"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {showDummyDataInfo && (
          <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-40 text-white p-4 rounded-lg shadow-md z-10">
            <p className="text-sm">
            You are currently viewing a demo of the sales report. This chart allows you to explore its functionality. Once your sales data becomes available, it will be displayed here in a similar format.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={() => setShowDummyDataInfo(false)}
            >
              Close Demo
            </Button>
          </div>
        )}

        {!showDummyDataInfo && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-white text-lg">No sales data available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesChart;