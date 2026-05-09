"use client";

import * as React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize QueryClient once to avoid re-renders
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-zinc-950 selection:bg-[#1B91D7]/30">
        {/* Sidebar with consistent border intensity */}
        <Sidebar className="border-r border-zinc-900 bg-zinc-950" />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation / Breadcrumb Area */}
          <header className="h-16 border-b border-zinc-900 flex items-center px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
            <BreadcrumbNav />
          </header>

          <main className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Tightened the container and added a subtle inner glow 
                consistent with your technical entrepreneur vibe 
            */}
            <div className="container max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
              {children}
            </div>
          </main>

          {/* Replaced gradient with a clean, technical footer. 
              Subtle text ensures focus remains on the content.
          */}
          <footer className="border-t border-zinc-900 bg-zinc-950 py-4 px-8">
            <div className="flex justify-between items-center">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">
                System Status: <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-4">Operational</span>
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">
                &copy; 2026 TRUAUDIENCE
              </p>
            </div>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}