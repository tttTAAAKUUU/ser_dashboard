"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/data/products";
import { useSession } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, RefreshCw, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const StockAlert = () => {
  const { session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showLowStock, setShowLowStock] = useState(false);

  const { data: products = [], error, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return fetchProducts(token);
    },
    enabled: !!session,
  });

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => !showLowStock || product.stock <= 20)
      .sort((a, b) =>
        sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock
      );
  }, [products, searchTerm, sortOrder, showLowStock]);

  const getStockStatus = (stock: number) => {
    if (stock <= 10) return { color: "bg-red-500", text: "Critical", progress: 33 };
    if (stock <= 20) return { color: "bg-yellow-500", text: "Low", progress: 66 };
    return { color: "bg-green-500", text: "Good", progress: 100 };
  };

  const lowStockCount = useMemo(() => {
    return products.filter((product) => product.stock <= 20).length;
  }, [products]);

  return (
    <TooltipProvider>
      <Card className="flex flex-col bg-gradient-to-br from-[#171F2E] to-[#071D49] text-white">
        <CardHeader>
          <h3 className="text-xl font-bold mb-4">Stock Alert</h3>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1A2333] text-white border-gray-700 flex-1"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="bg-[#1A2333] text-white border-gray-700"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Sort by stock: {sortOrder === "asc" ? "Low to High" : "High to Low"}
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => refetch()}
                  className="bg-[#1A2333] text-white border-gray-700"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh stock data</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center text-gray-400 py-4">Loading stock data...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">
              Error fetching stock data
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredAndSortedProducts.map((product: Product, index: number) => {
                const { color, text, progress } = getStockStatus(product.stock);
                return (
                  <div
                    key={index}
                    className="bg-[#1A2333] rounded-lg p-4 flex items-center justify-between transition-all hover:bg-[#223045]"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-3 h-3 rounded-full ${color}`}></div>
                      <h4 className="font-medium text-white">{product.name}</h4>
                    </div>
                    <div className="flex items-center space-x-4 flex-1">
                      <Progress value={progress} className="flex-1" />
                      <span className="text-sm text-gray-400 w-16">{text}</span>
                      <span className="font-bold text-lg text-white w-12 text-right">
                        {product.stock}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              No matching products found
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLowStock(!showLowStock)}
            className={`bg-[#1A2333] text-white border-gray-700 ${
              showLowStock ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            {showLowStock ? "Show All" : "Show Low Stock"}
          </Button>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-400">
              {lowStockCount} item{lowStockCount !== 1 ? "s" : ""} low on stock
            </span>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default StockAlert;