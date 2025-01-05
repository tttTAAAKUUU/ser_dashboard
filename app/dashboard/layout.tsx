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
        <Sidebar className="border-r border-border/10 bg-background fixed top-0 left-0 lg:static h-full z-10" />

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
          <footer className="fixed bottom-0 left-0 right-0 z-10 h-16 bg-white shadow-md lg:relative"></footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}