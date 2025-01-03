"use client"

import { TrendingUp } from 'lucide-react'
import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#003DA5" },  // Cobalt
  { browser: "safari", visitors: 200, fill: "#00A3E0" },  // Pacific Blue
  { browser: "firefox", visitors: 187, fill: "#071D49" }, // Sapphire
  { browser: "edge", visitors: 173, fill: "#05C3DE" },    // Dark Turquoise
  { browser: "other", visitors: 90, fill: "#a45ee5" },    // Medium Purple
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#003DA5", // Cobalt
  },
  safari: {
    label: "Safari",
    color: "#00A3E0", // Pacific Blue
  },
  firefox: {
    label: "Firefox",
    color: "#071D49", // Sapphire
  },
  edge: {
    label: "Edge",
    color: "#05C3DE", // Dark Turquoise
  },
  other: {
    label: "Other",
    color: "#a45ee5", // Medium Purple
  },
} satisfies ChartConfig

export function ProductPieChart() {
  return (
    <Card className="flex flex-col bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl font-bold">Products</CardTitle>
        <CardDescription className="text-[#05C3DE]">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-white"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {Object.entries(chartConfig).map(([key, value]) => (
                  'color' in value && (
                    <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={value.color} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={value.color} stopOpacity={0.3} />
                    </linearGradient>
                  )
                ))}
              </defs>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie 
                data={chartData} 
                dataKey="visitors"
                outerRadius="80%"
                innerRadius="50%"
              >
                {chartData.map((entry, index) => (
                  <LabelList
                    key={`label-${index}`}
                    dataKey="browser"
                    position="outside"
                    fill="#ffffff"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: keyof typeof chartConfig) =>
                      chartConfig[value]?.label
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-[#05C3DE]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-[#00A3E0]">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductPieChart;

