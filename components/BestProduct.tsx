"use client";

import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  LabelList,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/data/products";
import { useSession } from "@clerk/nextjs";

const COLORS = [
  "#003DA5", // Cobalt
  "#00A3E0", // Pacific Blue
  "#071D49", // Sapphire
  "#05C3DE", // Dark Turquoise
  "#a45ee5", // Medium Purple
];

const chartConfig: ChartConfig = {
  visitors: {
    label: "Metrics", // Placeholder for now
  },
};

export function BestProduct() {
  const { session } = useSession();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return fetchProducts(token);
    },
    enabled: !!session,
  });

  const chartData = useMemo(() => {
    // Transform product data into chart format and assign colors
    return products.map((product: Product, index: number) => ({
      browser: product.name, // Using product name for now
      visitors: product.stock, // Placeholder, could be replaced with purchases later
      fill: COLORS[index % COLORS.length], // Assigning colors cyclically
    }));
  }, [products]);

  if (isLoading) {
    return (
      <Card className="flex flex-col bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white">
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-gray-400">Loading best products...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white">
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-red-500">Failed to load best products</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl font-bold">Best Performing Products</CardTitle>
        <CardDescription className="text-[#05C3DE]">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={chartData}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <RadialBar
                  dataKey="visitors"
                  background={{ fill: "rgba(255, 255, 255, 0.1)" }}
                  fill="fill"
                >
                  <LabelList
                    position="insideStart"
                    dataKey="browser"
                    className="fill-white capitalize"
                    fontSize={11}
                  />
                </RadialBar>
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="text-center text-gray-400 py-4">No products available</div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none text-[#05C3DE]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        {/* <div className="leading-none text-[#00A3E0]">
          Showing best performing products for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}

export default BestProduct;