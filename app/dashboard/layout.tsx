"use client";

import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = React.useRef(new QueryClient()); // Create QueryClient instance once

  return (
    <QueryClientProvider client={queryClient.current}>
      <div className="flex min-h-screen bg-background relative">
        {/* Sidebar */}
        <Sidebar className="border-r border-border/10 fixed lg:static h-full z-10" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-[80px] lg:ml-0">
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-8">
              <div className="mb-6">
                <BreadcrumbNav />
              </div>
              {children}
            </div>
          </main>
          <footer className="border-t border-border/10 bg-gradient-to-r from-pacific-blue to-dark-turquoise">
            <div className="container mx-auto py-4 text-center text-sm text-white">
              © 2025 BOSPay. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}