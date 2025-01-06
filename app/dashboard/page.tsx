"use client";

import React from "react";
import StockAlert from "@/components/StockAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Activity, CreditCard, Search } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
import SalesChart from "@/components/SalesChart";
import ProductPieChart from "@/components/ProductPieChart";
import BestProduct from "@/components/BestProduct";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { user } = useUser();
  const recentSales: any[] = [];

  return (
    <div className="w-full min-h-screen bg-midnight-blue">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Hi, {user?.firstName || "there"}
            </h2>
            <p className="text-sm text-white">
              Let&apos;s check your store today.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Revenue", icon: DollarSign, value: "R0", change: "0%" },
            { title: "Total Sales", icon: CreditCard, value: "0", change: "0%" },
            { title: "Total Purchases", icon: Users, value: "0", change: "0%" },
            { title: "Total Returns", icon: Activity, value: "R0", change: "0%" },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-to-tr from-cobalt to-pacific-blue p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {item.title}
                </CardTitle>
                <item.icon className="h-4 w-4 text-dark-turquoise" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-white">{item.value}</div>
                <p className="text-xs text-dark-turquoise">{item.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white">Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <StockAlert />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white">Product Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductPieChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white">Best Selling Product</CardTitle>
            </CardHeader>
            <CardContent>
              <BestProduct />
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales Table */}
        <Card className="border border-midnight-express">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-white">
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {recentSales.length > 0 ? (
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-sapphire">
                  <tr>
                    <th className="py-2 px-4">Product</th>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4">{sale.product}</td>
                      <td className="py-2 px-4">{sale.customer}</td>
                      <td className="py-2 px-4">R{sale.price}</td>
                      <td className="py-2 px-4 text-dark-turquoise">{sale.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white text-center py-4">No recent transactions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

