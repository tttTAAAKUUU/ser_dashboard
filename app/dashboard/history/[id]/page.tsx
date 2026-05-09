"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { transactions } from "../../../../data/dummy";

export default function TransactionDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // Flatten all transactions data to search for the specific transaction by ID
  const flatTransactions = transactions.flatMap((section) =>
    section.data.map((txn) => ({ ...txn, date: section.date }))
  );
  const transaction = flatTransactions.find((txn) => txn.id === params.id);

  // If transaction not found
  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-red-600">Transaction Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              We couldn&apos;t find the transaction you&apos;re looking for.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/transactions")}
        className="mb-6"
      >
        &larr; Back to Transactions
      </Button>

      {/* Transaction Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Transaction Details</CardTitle>
          <CardDescription className="text-gray-500">
            Detailed information about transaction ID: {transaction.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Information */}
          <div>
            <h3 className="text-lg font-medium">Product Name</h3>
            <p className="text-gray-600">{transaction.productName}</p>
          </div>

          {/* Transaction Time */}
          <div>
            <h3 className="text-lg font-medium">Date & Time</h3>
            <p className="text-gray-600">
              {transaction.date} at {transaction.time}
            </p>
          </div>

          {/* Crypto Used */}
          <div>
            <h3 className="text-lg font-medium">Crypto Used</h3>
            <p className="text-gray-600">{transaction.crypto}</p>
          </div>

          {/* Amount */}
          <div>
            <h3 className="text-lg font-medium">Crypto Amount</h3>
            <p className="text-gray-600">
              {transaction.crypto} {transaction.amount.toFixed(2)}
            </p>
          </div>

          {/* ZAR Conversion */}
          <div>
            <h3 className="text-lg font-medium">Amount in ZAR</h3>
            <p className="text-gray-600">R{transaction.zar.toFixed(2)}</p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-medium">Transaction Status</h3>
            <Badge
              className={`text-white ${
                transaction.status === "Success"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {transaction.status}
            </Badge>
          </div>

          {/* Additional Details */}
          <div className="sm:col-span-2">
            <h3 className="text-lg font-medium">Additional Details</h3>
            <p className="text-gray-600">{transaction.details}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}