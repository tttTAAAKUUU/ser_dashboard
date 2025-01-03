"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { transactions } from "../../../data/dummy";

export default function CryptoTransactionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState({
    crypto: "All",
    status: "All",
    maxDays: 7,
    minAmount: 0,
    maxAmount: 500,
  });

  // Filter logic
  const filteredTransactions = transactions
    .map((section) => ({
      ...section,
      data: section.data.filter(
        (txn) =>
          (filterParams.crypto === "All" || txn.crypto === filterParams.crypto) &&
          (filterParams.status === "All" || txn.status === filterParams.status) &&
          txn.daysAgo <= filterParams.maxDays &&
          txn.amount >= filterParams.minAmount &&
          txn.amount <= filterParams.maxAmount &&
          txn.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.data.length > 0); // Remove sections with no matching transactions

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  <Select
                    onValueChange={(value) =>
                      setFilterParams((prev) => ({ ...prev, crypto: value }))
                    }
                    defaultValue={filterParams.crypto}
                  >
                    <SelectTrigger id="crypto">
                      <SelectValue placeholder="Select crypto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) =>
                      setFilterParams((prev) => ({ ...prev, status: value }))
                    }
                    defaultValue={filterParams.status}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Success">Success</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <Label htmlFor="days">Days (Last {filterParams.maxDays} days)</Label>
                  <Slider
                    value={[filterParams.maxDays]}
                    max={30}
                    min={1}
                    step={1}
                    onValueChange={(value) =>
                      setFilterParams((prev) => ({ ...prev, maxDays: value[0] }))
                    }
                  />
                </div>

                {/* Amount Range Filter */}
                <div>
                  <Label htmlFor="amount">Amount Range (R{filterParams.minAmount} - R{filterParams.maxAmount})</Label>
                  <Slider
                    value={[filterParams.minAmount, filterParams.maxAmount]}
                    max={1000}
                    min={0}
                    step={10}
                    onValueChange={(value) =>
                      setFilterParams((prev) => ({
                        ...prev,
                        minAmount: value[0],
                        maxAmount: value[1],
                      }))
                    }
                  />
                </div>

                {/* Clear Filters */}
                <Button
                  variant="ghost"
                  onClick={() =>
                    setFilterParams({
                      crypto: "All",
                      status: "All",
                      maxDays: 7,
                      minAmount: 0,
                      maxAmount: 500,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Transaction Cards */}
      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        filteredTransactions.map((section) => (
          <Card key={section.date}>
            <CardHeader>
              <CardTitle className="text-lg">{section.date}</CardTitle>
              <p className="text-sm text-gray-500">
                {section.data.length} transactions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.data.map((txn) => (
                  <Link key={txn.id} href={`/dashboard/transactions/${txn.id}`}>
                    <div
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm cursor-pointer"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-4 w-1/3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {txn.crypto}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{txn.productName}</p>
                          <p className="text-sm text-gray-500">
                            Product ID: {txn.id}
                          </p>
                        </div>
                      </div>

                      {/* Transaction Time */}
                      <div className="w-1/6 text-sm text-gray-500">
                        {txn.time}
                      </div>

                      {/* Crypto Amount */}
                      <div className="w-1/6 font-medium text-green-500">
                        {txn.crypto} {txn.amount.toFixed(2)}
                      </div>

                      {/* ZAR Conversion */}
                      <div className="w-1/6 font-medium text-green-500">
                        R{txn.zar.toFixed(2)}
                      </div>

                      {/* Transaction Status */}
                      <div className="w-1/6 flex justify-end">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            txn.status === "Success"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}