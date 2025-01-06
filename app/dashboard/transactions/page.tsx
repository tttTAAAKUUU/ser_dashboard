"use client";

import React, { useState } from "react";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter } from 'lucide-react';

export default function CryptoTransactionHistoryPage() {
  const { getToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredTransactions = transactions.filter((txn) =>
    txn.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.transactionHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
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
                  <Slider defaultValue={[7]} max={30} min={1} step={1} />
                </div>

                {/* Amount Range Filter */}
                <div>
                  <Label htmlFor="amount">Amount Range (R0 - R500)</Label>
                  <Slider defaultValue={[0, 500]} max={1000} min={0} step={10} />
                </div>

                {/* Clear Filters */}
                <Button variant="outline" className="w-full">Clear Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading transactions...</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found.</p>
        ) : (
          filteredTransactions.map((txn) => (
            <Card key={txn.id}>
              <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{txn.currency}</span>
                  <span className="text-sm font-normal text-gray-500">
                    {new Date(txn.blockTimestamp).toLocaleDateString()}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-500 break-all">{txn.transactionHash}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p>{new Date(txn.blockTimestamp).toLocaleTimeString()}</p>
                  <p className="font-bold">R{txn.value.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

