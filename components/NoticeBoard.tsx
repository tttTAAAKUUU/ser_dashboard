"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function NoticeBoard() {
  const notices = [
    {
      id: 1,
      title: "ID Verification Pending",
      description: "Your ID is currently being reviewed. You’ll be notified once verification is complete.",
    },
    {
      id: 2,
      title: "Update Your Availability",
      description: "Keep your availability up-to-date to receive more requests.",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white shadow-md">
      <CardHeader className="flex items-center space-x-2 border-b border-slate-700">
        <Info className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-sm sm:text-base font-semibold">Notice Board</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 py-4">
        {notices.map((notice) => (
          <div key={notice.id}>
            <h4 className="text-blue-300 font-medium text-sm">{notice.title}</h4>
            <p className="text-slate-400 text-xs">{notice.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
