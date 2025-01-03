"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/data/transactions";
import { useAuth } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function CryptoTransactionHistoryPage() {
  const { getToken } = useAuth();

  // Fetch transactions using TanStack Query
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("Token is null");
      return fetchTransactions(token);
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  console.log("All transactions:", transactions);

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search transactions..."
            className="h-10 w-64 rounded-lg border px-4 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Filters</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4">
              <div className="space-y-4">
                {/* Crypto Filter */}
                <div>
                  <Label htmlFor="crypto">Crypto</Label>
                  <Select defaultValue="All">
                    <SelectTrigger id="crypto">
                      <SelectValue placeholder="Select crypto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="All">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <Label htmlFor="days">Days (Last 7 days)</Label>
                  <Slider value={[7]} max={30} min={1} step={1} />
                </div>

                {/* Amount Range Filter */}
                <div>
                  <Label htmlFor="amount">Amount Range (R0 - R500)</Label>
                  <Slider value={[0, 500]} max={1000} min={0} step={10} />
                </div>

                {/* Clear Filters */}
                <Button variant="ghost">Clear Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Transaction Cards */}
      {isLoading ? (
        <p className="text-gray-500 text-center">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        transactions.map((txn) => (
          <Card key={txn.id}>
            <CardHeader>
              <CardTitle className="text-lg">{txn.currency}</CardTitle>
              <p className="text-sm text-gray-500">{txn.transactionHash}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p>{new Date(txn.blockTimestamp).toLocaleString()}</p>
                <p className="font-bold">R{txn.value.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}