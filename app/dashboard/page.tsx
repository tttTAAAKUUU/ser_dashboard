"use client";

import React, { useState } from "react";
import StockAlert from "@/components/StockAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Activity, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import SalesChart from "@/components/SalesChart";
import ProductPieChart from "@/components/ProductPieChart";
import BestProduct from "@/components/BestProduct";

export default function DashboardPage() {
  const { user } = useUser(); // Fetch user from Clerk
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-8 font-poppins px-4 lg:px-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Hi, {user?.firstName || "there"}
          </h2>
          <p className="text-white">Let&apos;s check your store today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full sm:w-72 rounded-lg border border-gray-300 px-4 text-sm shadow-sm focus:border-pacific-blue focus:ring focus:ring-light-blue-gradient"
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-tr from-cobalt to-pacific-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-dark-turquoise" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R45,231.89</div>
            <p className="text-xs text-dark-turquoise">+55.23% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-tr from-sapphire to-dark-turquoise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Sales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-light-blue-gradient" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+34.1k</div>
            <p className="text-xs text-dark-turquoise">+50.23% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-tr from-pacific-blue to-dark-turquoise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Purchases
            </CardTitle>
            <Users className="h-4 w-4 text-dark-blue-gradient" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+6.2k</div>
            <p className="text-xs text-dark-turquoise">+70.23% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-tr from-medium-purple to-sapphire">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Returns
            </CardTitle>
            <Activity className="h-4 w-4 text-light-blue-gradient" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R261.3</div>
            <p className="text-xs text-dark-turquoise">+90.23% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart and Stock Alert */}
      <div className="grid gap-4 lg:grid-cols-3 lg:col-span-2">
        <div className="grid gap-4 lg:col-span-2">
          <SalesChart />
        </div>

        <StockAlert />
      </div>

      {/* Product Pie Chart and Best Product */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Product Pie Chart */}
        <div className="lg:col-span-2">
          <ProductPieChart />
        </div>

        {/* Best Product */}
        <div>
          <BestProduct />
        </div>
      </div>

      {/* Recent Sales Table */}
      <Card className="border border-midnight-express">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white">
            Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                <tr className="border-t">
                  <td className="py-2 px-4">Handmade Pouch</td>
                  <td className="py-2 px-4">John Bushmill</td>
                  <td className="py-2 px-4">R121.00</td>
                  <td className="py-2 px-4 text-dark-turquoise">Paid</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-4">Smartwatch E2</td>
                  <td className="py-2 px-4">Ilham Budi Agung</td>
                  <td className="py-2 px-4">R590.00</td>
                  <td className="py-2 px-4 text-medium-purple">Due</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}