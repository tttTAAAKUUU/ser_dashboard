"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle, CalendarClock, Star } from "lucide-react";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import NoticeBoard from "@/components/NoticeBoard";

interface ProfileData {
  id: number;
  name: string;
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    phone?: string;
    dob?: string;
    bio?: string | null;
    gender?: string;
  };
}

interface ProfileResponse {
  data: ProfileData;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token || undefined === token) {
        console.log("No token found - user may not be logged in");
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-providers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const userName = profile?.data.profile.first_name || "Takudzwa";

  const stats = [
    { label: "Total Earnings", value: "R4,500", sub: "+12% from last month", icon: DollarSign, color: "from-cobalt to-pacific-blue", href: "/dashboard/earnings" },
    { label: "Requests Completed", value: "28", sub: "+3 this week", icon: CheckCircle, color: "from-sapphire to-dark-turquoise", href: "/dashboard/history" },
    { label: "Upcoming Requests", value: "5", sub: "Next: 21 Jun", icon: CalendarClock, color: "from-pacific-blue to-dark-turquoise", href: "/dashboard/appointments" },
    { label: "Customer Rating", value: "4.8 ★", sub: "Based on 23 reviews", icon: Star, color: "from-medium-purple to-sapphire", href: "#" },
  ];

  return (
    <div className="space-y-8 font-poppins p-6 bg-zinc-950 min-h-screen">
      <div className="space-y-1">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1B91D7]">
          Hi, {userName}
        </h2>
        <p className="text-xs font-black uppercase text-zinc-500">Welcome back to your workspace</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className={cn("bg-gradient-to-tr border-none transition-transform hover:scale-[1.02] cursor-pointer", stat.color)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-black uppercase text-white/80 tracking-widest">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</div>
                <p className="text-[9px] font-bold text-white/60 uppercase">{stat.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScheduleTimeline />
        </div>
        <NoticeBoard />
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");