import { useUser, OrganizationSwitcher, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  ShoppingCart,
  ArrowLeftRight,
  Boxes,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
  const [showProfileMenu, setShowProfileMenu] = useState(false); // User profile menu

  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set mobile view for screens smaller than 768px
      setIsSidebarOpen(false); // Close sidebar on resize to desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically collapse on mobile view
  useEffect(() => {
    if (isMobile) setIsCollapsed(true);
  }, [isMobile]);

  // Persist collapsed state in localStorage
  useEffect(() => {
    const collapsedState = localStorage.getItem("sidebar-collapsed") === "true";
    setIsCollapsed(collapsedState);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", isCollapsed.toString());
  }, [isCollapsed]);

  const routes = [
    { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Products", icon: ShoppingCart, href: "/dashboard/products" },
    { label: "Transactions", icon: ArrowLeftRight, href: "/dashboard/transactions" },
    { label: "Categories", icon: Boxes, href: "/dashboard/category" },
    { label: "Manage Staff", icon: User, href: "/dashboard/staffmembers" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="relative">
      {/* Sidebar Toggle Button for Mobile */}
      {/* {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ChevronRight className={isSidebarOpen ? "transform rotate-180" : ""} />
        </Button>
      )} */}

      {/* Sidebar and Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={cn(
          "fixed z-50 bg-gray-900 shadow-lg transition-transform duration-300",
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "",
          isCollapsed ? "w-[80px]" : "w-[300px]",
          className
        )}
        style={{ height: "100vh", position: "sticky", top: 0 }}
        onMouseEnter={() => isCollapsed && setIsCollapsed(false)} // Hover to expand
        onMouseLeave={() => isMobile && setIsCollapsed(true)} // Collapse back
      >
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 z-10 h-10 w-10 rounded-full bg-gray-800 text-gray-100 shadow-md transition-transform hover:scale-110"
          aria-label="Toggle Sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>

        {/* Header */}
        <div className={cn("p-4 flex flex-col gap-4", isCollapsed ? "items-center" : "")}>
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "")}>
            <Image
              src="https://utfs.io/f/vjV372zIanAGEJxDKXg2Y7FETPSGKLjvqoNtVp5efcmwya9H"
              alt="BOSPay Logo"
              width={48}
              height={48}
              className={cn("transition-all", isCollapsed ? "w-8 h-8" : "w-12 h-12 mr-3")}
            />
            {!isCollapsed && <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>}
          </div>

          {!isCollapsed ? (
            <div className="w-full">
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Change Store</h3>
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    organizationSwitcherTrigger:
                      "w-full bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md flex items-center justify-between",
                    organizationPreview: "flex items-center gap-2",
                    organizationSwitcherPopover: "bg-gray-800 border border-gray-700",
                    organizationSwitcherTriggerIcon: "text-gray-400",
                  },
                }}
              />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Button
                variant="ghost"
                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md flex items-center"
              >
                <Building className="h-5 w-5 text-white" />
              </Button>
            </div>
          )}

          <div className="w-full border-t border-gray-700 my-2" />
        </div>

        {/* Scrollable Menu */}
        <ScrollArea className="flex-1 overflow-y-auto px-3 max-h-screen">
          <div className="space-y-1 py-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                tabIndex={0}
                aria-label={`Navigate to ${route.label}`}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start rounded-md transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  pathname === route.href ? "bg-gray-700 text-white" : "",
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
                    <span className="ml-3 font-medium group-hover:text-gray-100">
                      {route.label}
                    </span>
                  )}
                </Link>
              </Button>
            ))}

            <SignOutButton redirectUrl="/sign-in">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-md transition-all hover:bg-gray-700",
                  isCollapsed ? "px-2 py-3" : "px-3 py-2"
                )}
              >
                <LogOut
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-100"
                  )}
                />
                {!isCollapsed && (
                  <span className="ml-3 font-medium group-hover:text-gray-100">Logout</span>
                )}
              </Button>
            </SignOutButton>
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
              "relative flex items-center gap-3 rounded-md bg-gray-800/50 p-3 transition-all hover:bg-gray-700",
              isCollapsed && "justify-center p-2"
            )}
          >
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-blue-300 shadow-md cursor-pointer"
            >
              <User className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && user && (
              <div>
                <p className="text-sm font-medium leading-none">{user.fullName || user.firstName}</p>
                <p className="text-xs text-gray-400">{user.emailAddresses[0]?.emailAddress}</p>
              </div>
            )}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 shadow-md rounded-md">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">
                  View Profile
                </Link>
                <SignOutButton redirectUrl="/sign-in">
                  <Button variant="ghost" className="w-full text-left px-4 py-2 hover:bg-gray-700">
                    Logout
                  </Button>
                </SignOutButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}