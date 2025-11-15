"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle, CalendarClock, Star } from "lucide-react";
import SalesChart from "@/components/SalesChart";
import NoticeBoard from "@/components/NoticeBoard";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const userName = "Takudzwa"; // You can replace this with a real user name from your DB later

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 font-poppins px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6 lg:pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
            Hi, {userName || "there"}
          </h2>
          <p className="text-sm sm:text-base text-white">
            Welcome back!
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full sm:w-64 lg:w-72 rounded-lg border border-gray-300 px-4 text-sm shadow-sm focus:border-pacific-blue focus:ring focus:ring-light-blue-gradient"
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-tr from-cobalt to-pacific-blue p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-dark-turquoise" />
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-lg lg:text-2xl font-bold text-white">
              R4,500
            </div>
            <p className="text-xs text-dark-turquoise">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-tr from-sapphire to-dark-turquoise p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">
              Requests Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-light-blue-gradient" />
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-lg lg:text-2xl font-bold text-white">
              28
            </div>
            <p className="text-xs text-dark-turquoise">+3 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-tr from-pacific-blue to-dark-turquoise p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">
              Upcoming Requests
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-dark-blue-gradient" />
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-lg lg:text-2xl font-bold text-white">
              5
            </div>
            <p className="text-xs text-dark-turquoise">Next: 21 Jun</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-tr from-medium-purple to-sapphire p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">
              Customer Rating
            </CardTitle>
            <Star className="h-4 w-4 text-light-blue-gradient" />
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-lg lg:text-2xl font-bold text-white">
              4.8 ★
            </div>
            <p className="text-xs text-dark-turquoise">
              Based on 23 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart and Notice Board */}
      <div className="grid gap-4 lg:grid-cols-3 lg:col-span-2">
        <div className="grid gap-4 lg:col-span-2">
          <SalesChart />
        </div>
        <NoticeBoard />
      </div>
    </div>
  );
}
