"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, ShieldAlert, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoticeBoard() {
  const isBackgroundCheckCleared = false; // This would come from your DB

  return (
    <div className="space-y-4">
      {/* CRITICAL SAFETY NOTIFICATION */}
      {!isBackgroundCheckCleared && (
        <Card className="border-4 border-red-600 bg-red-50 rounded-none shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-600 h-8 w-8" />
              <div>
                <h4 className="font-black uppercase text-xs text-red-600">Safety Check Required</h4>
                <p className="text-[10px] font-bold text-slate-700">You cannot accept bids until your background check is complete.</p>
              </div>
            </div>
            <Button 
              className="bg-red-600 text-white font-black text-[10px] uppercase h-10 px-4 rounded-none border-2 border-black"
              onClick={() => window.open("https://huru.co.za/", "_blank")} // Example South African partner
            >
              Start Check <ExternalLink size={12} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-black text-white rounded-none border-4 border-black">
        <CardHeader className="flex flex-row items-center space-x-2 border-b border-white/20 pb-4">
          <Info className="h-5 w-5 text-yellow-400" />
          <CardTitle className="text-xs font-black uppercase tracking-widest">Notice Board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-4">
          <div className="border-l-2 border-yellow-400 pl-3">
            <h4 className="text-white font-black uppercase text-[10px]">Verification In Progress</h4>
            <p className="text-slate-400 text-[10px]">Our team is reviewing your ID documents. This usually takes 24-48 hours.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}