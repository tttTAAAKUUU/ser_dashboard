"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  ShoppingCart,
  History as HistoryIcon,
  Settings,
  ChevronLeft,
  Wallet,
  ChevronRight,
  LogOut,
  User,
  Calendar,
  Building,
} from "lucide-react";
import Image from "next/image";
import LOGO from "../../public/LOGO.png";

interface ProfileData {
  id: number;
  name: string;
  email: string;
  profile: {
    first_name: string;
    last_name: string;
  };
  organizations?: Array<{ id: number; name: string }>;
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const routes = [
    { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Requests", icon: ShoppingCart, href: "/dashboard/requests" },
    { label: "Earnings", icon: Wallet, href: "/dashboard/earnings" },
    { label: "History", icon: HistoryIcon, href: "/dashboard/history" },
    { label: "Appointments", icon: Calendar, href: "/dashboard/appointments" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  // Fetch Profile Logic
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-providers/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth < 768;
      setIsMobile(small);
      if (small) setIsCollapsed(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-providers/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className={cn(
        "relative flex flex-col bg-zinc-950 text-gray-100 border-r border-zinc-900 transition-all duration-300 z-50",
        isCollapsed ? "w-[80px]" : "w-[280px]",
        className
      )}
      style={{ height: "100vh", position: "sticky", top: 0 }}
    >
      {/* Toggle Button */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-10 z-50 h-8 w-8 rounded-full bg-[#1B91D7] text-white shadow-xl hover:scale-110 transition-transform"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      )}

      {/* Header / Logo */}
      <div className={cn("p-6 flex items-center gap-3", isCollapsed && "justify-center")}>
        <div className="relative w-10 h-10 shrink-0">
          <Image src={LOGO} alt="Logo" fill className="object-contain" />
        </div>
        {!isCollapsed && (
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
            SER<span className="text-[#1B91D7]">.</span>
          </h2>
        )}
      </div>

      {/* Store/Org Switcher (if exists) */}
      {!isCollapsed && profile?.organizations && profile.organizations.length > 0 && (
        <div className="px-6 mb-4">
          <label className="text-[9px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-2 block">
            Active Store
          </label>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
            <Building size={14} className="text-[#1B91D7]" />
            <span className="text-[10px] font-bold truncate">{profile.organizations[0].name}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1.5">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link key={route.href} href={route.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group cursor-pointer",
                    isActive 
                      ? "bg-[#1B91D7] text-white shadow-lg shadow-blue-900/20" 
                      : "hover:bg-zinc-900 text-zinc-400"
                  )}
                >
                  <route.icon 
                    size={20} 
                    className={cn(
                      "transition-colors", 
                      isActive ? "text-white" : "group-hover:text-[#1B91D7]"
                    )} 
                  />
                  {!isCollapsed && (
                    <span className="text-[11px] font-black uppercase tracking-widest leading-none">
                      {route.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer / User Profile */}
      <div className="mt-auto p-4 space-y-2 border-t border-zinc-900">
        <div className={cn("flex items-center gap-3 p-2", isCollapsed && "justify-center")}>
          <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-[#1B91D7]">
            <User size={18} />
          </div>
          {!isCollapsed && profile && (
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase truncate text-white">
                {profile.profile.first_name} {profile.profile.last_name}
              </p>
              <p className="text-[9px] text-zinc-500 truncate font-bold">{profile.email}</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 justify-start px-3 py-6",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}