"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { date: "Apr 1", desktop: 520, mobile: 430 },
  { date: "Apr 6", desktop: 720, mobile: 600 },
  { date: "Apr 11", desktop: 640, mobile: 700 },
  { date: "Apr 16", desktop: 800, mobile: 850 },
  { date: "Apr 21", desktop: 950, mobile: 910 },
  { date: "Apr 26", desktop: 780, mobile: 720 },
  { date: "May 1", desktop: 890, mobile: 810 },
  { date: "May 6", desktop: 1020, mobile: 900 },
  { date: "May 11", desktop: 730, mobile: 690 },
  { date: "May 16", desktop: 870, mobile: 850 },
  { date: "May 21", desktop: 920, mobile: 970 },
  { date: "May 26", desktop: 880, mobile: 830 },
  { date: "Jun 1", desktop: 1030, mobile: 1010 },
  { date: "Jun 6", desktop: 750, mobile: 730 },
  { date: "Jun 11", desktop: 950, mobile: 870 },
  { date: "Jun 16", desktop: 800, mobile: 780 },
  { date: "Jun 21", desktop: 820, mobile: 850 },
  { date: "Jun 26", desktop: 920, mobile: 910 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#003DA5", // Cobalt
  },
  mobile: {
    label: "Mobile",
    color: "#00A3E0", // Pacific Blue
  },
} satisfies ChartConfig;

export default function ModernSalesChart() {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  const totalDesktop = chartData.reduce((sum, entry) => sum + entry.desktop, 0);
  const totalMobile = chartData.reduce((sum, entry) => sum + entry.mobile, 0);

  return (
    <Card className="w-full bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white">
      {/* Header Section */}
      <CardHeader className="pb-4 border-b border-gray-700">
        <div>
          <CardTitle className="text-lg sm:text-2xl font-bold">Sales & Purchases</CardTitle>
          <p className="text-xs sm:text-sm text-gray-400">
            Showing total visitors for the last 3 months
          </p>
        </div>

        {/* Integrated Toggle Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
          <div
            className={`cursor-pointer p-2 rounded ${
              view === "desktop" ? "bg-[#003DA5] text-white" : "text-gray-400"
            }`}
            onClick={() => setView("desktop")}
          >
            <h3 className="text-sm">Desktop</h3>
            <p className="text-lg font-bold">{totalDesktop.toLocaleString()}</p>
          </div>
          <div
            className={`cursor-pointer p-2 rounded ${
              view === "mobile" ? "bg-[#00A3E0] text-white" : "text-gray-400"
            }`}
            onClick={() => setView("mobile")}
          >
            <h3 className="text-sm">Mobile</h3>
            <p className="text-lg font-bold">{totalMobile.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>

      {/* Chart Section */}
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003DA5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#05C3DE" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A3E0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#05C3DE" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#a45ee5" opacity={0.1} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#ffffff", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171F2E",
                  borderColor: "#a45ee5",
                  color: "#ffffff",
                }}
              />
              <Bar
                dataKey={view}
                fill={`url(#color${view === "desktop" ? "Desktop" : "Mobile"})`}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}