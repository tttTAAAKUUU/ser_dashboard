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
  ChevronLeft,Wallet,
  ChevronRight,
  LogOut,
  User,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import LOGO from "../../public/LOGO.png";

<<<<<<< HEAD
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

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
  organizations?: Array<{ id: number; name: string }>;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-providers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
=======
export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const user = {
    fullName: "Takudzwa Tembedza",
    email: "takudzwa@example.com",
  };
>>>>>>> 6c9b3ec (feat: the rest)

  const routes = [
    { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Requests", icon: ShoppingCart, href: "/dashboard/requests" },
    { name: 'Earnings', icon: Wallet, href: '/dashboard/earnings' },
    { label: "History", icon: HistoryIcon, href: "/dashboard/history" },
    { label: "Appointments", icon: Calendar, href: "/dashboard/appointments" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

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

<<<<<<< HEAD
  const handleLogout = async () => {
    setShowLogoutModal(false);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-providers/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-100 border-r shadow-lg transition-all duration-300",
          isCollapsed ? "w-[80px]" : "w-[300px]",
          className
        )}
        style={{ height: "100vh", position: "sticky", top: 0 }}
      >
        {/* Collapse Button */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-4 z-10 h-10 w-10 rounded-full bg-gray-800 text-gray-100 shadow-md transition-transform hover:scale-110"
            aria-label="Toggle Sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        )}

        {/* Header */}
        <div className={cn("p-4 flex flex-col gap-4", isCollapsed ? "items-center" : "")}>
          {/* Logo */}
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "")}>
            <Image
              src={LOGO}
              alt="SER Logo"
              width={48}
              height={48}
              className={cn("transition-all", isCollapsed ? "w-8 h-8" : "w-12 h-12 mr-3")}
            />
            {!isCollapsed && <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>}
          </div>

          {/* Organization Switcher */}
          {!isCollapsed && profile?.organizations && profile.organizations.length > 0 ? (
            <div className="w-full">
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Change Store</h3>
              <select
                className="w-full bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md"
                defaultValue={profile.organizations[0]?.name}
              >
                {profile.organizations.map((org) => (
                  <option key={org.id} value={org.name}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Button variant="ghost" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md">
                <Building className="h-5 w-5 text-white" />
              </Button>
            </div>
          )}

          <div className="w-full border-t border-gray-700 my-2" />
        </div>

        {/* Scrollable Menu */}
        <ScrollArea className="flex-1 overflow-y-auto px-3">
          <div className="space-y-1 py-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start rounded-md transition-all hover:bg-gray-700",
                  isCollapsed ? "px-2 py-3" : "px-3 py-2"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon
                    className={cn(
                      "h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-100",
                      pathname === route.href && "text-blue-400"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium group-hover:text-gray-100">{route.label}</span>
                  )}
                </Link>
              </Button>
            ))}

            {/* Logout Button */}
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start rounded-md transition-all hover:bg-gray-700",
                isCollapsed ? "px-2 py-3" : "px-3 py-2"
              )}
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="h-5 w-5 text-gray-400" />
              {!isCollapsed && <span className="ml-3 font-medium text-gray-100">Logout</span>}
            </Button>
          </div>
        </ScrollArea>

        {/* User Profile Section */}
        <div
          className={cn(
            "mt-auto border-t border-gray-700 p-4 transition-all",
            isCollapsed ? "px-2 py-3" : "p-4"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3 rounded-md bg-gray-800/50 p-3 transition-all hover:bg-gray-700",
              isCollapsed && "justify-center p-2"
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-blue-300 shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && profile && (
              <div>
                <p className="text-sm font-medium leading-none">
                  {profile.profile?.first_name} {profile.profile?.last_name}
                </p>
                <p className="text-xs text-gray-400">{profile.email}</p>
              </div>
            )}
          </div>
        </div>
=======
  return (
    <div
      className={cn(
        "relative flex flex-col bg-gradient-to-b from-gray-900 to-black text-gray-100 border-r border-zinc-800 shadow-lg transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]",
        className
      )}
      style={{ height: "100vh", position: "sticky", top: 0 }}
    >
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-10 z-50 h-8 w-8 rounded-full bg-[#1B91D7] text-white shadow-md hover:scale-110"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      )}

      <div className={cn("p-6 flex items-center gap-3", isCollapsed && "justify-center")}>
        <Image src={LOGO} alt="Logo" width={40} height={40} />
        {!isCollapsed && <h2 className="text-xl font-black italic uppercase tracking-tighter">SER</h2>}
>>>>>>> 6c9b3ec (feat: the rest)
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                pathname === route.href ? "bg-[#1B91D7] text-white" : "hover:bg-zinc-800 text-zinc-400"
              )}>
                <route.icon size={20} className={cn(pathname === route.href ? "text-white" : "group-hover:text-[#1B91D7]")} />
                {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest">{route.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className={cn("p-4 mt-auto border-t border-zinc-800", isCollapsed && "flex justify-center")}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <User size={18} />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase truncate">{user.fullName}</p>
              <p className="text-[9px] text-zinc-500 truncate">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}