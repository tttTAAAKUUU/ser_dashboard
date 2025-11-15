"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Info, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type RequestProps = {
  title: string;
  name: string;
  date: string;
  time: string;
  description: string;
  address: string;
  area: string;
  price: number;
  stars: number;
  showAcceptButton?: boolean;
  serviceDetails?: {
    shortDescription: string;
    requirements: string[];
    imageUrl?: string;
  };
};

export function RequestCard({
  title,
  name,
  date,
  time,
  description,
  address,
  area,
  price,
  stars,
  showAcceptButton = true,
  serviceDetails = {
    shortDescription: "Professional hair service at client’s location.",
    requirements: [
      "2x Hairpiece packs",
      "Shampoo",
      "Conditioner",
      "Blow dryer",
      "Clippers (if needed)",
    ],
    imageUrl: "/placeholder-service.jpg",
  },
}: RequestProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  // ✅ Format date to show abbreviated month (e.g., "Nov 10, 2025")
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Card className="bg-slate-800 text-white shadow-lg border border-slate-700 rounded-lg p-4 w-full">
        <CardHeader className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-blue-300 text-xl font-semibold mb-1">
                {title}
              </CardTitle>
              <button
                onClick={() => setIsInfoOpen(true)}
                className="text-slate-400 hover:text-pacific-blue transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsImageOpen(true)}
                className="text-slate-400 hover:text-pacific-blue transition-colors"
              >
                <Image className="w-4 h-4" />
              </button>
            </div>
            <CardDescription className="text-sm text-slate-400">
              {/* ✅ Use formattedDate here */}
              <p>
                {formattedDate} • {time}
              </p>
              <p className="mt-1">
                📍 {address}, {area}
              </p>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="mt-4 space-y-2">
          <div>
            <p className="font-bold text-blue-200">Notes:</p>
            <p className="text-slate-300">{description}</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-600 mt-4">
            <div className="text-sm text-slate-400">
              <p>
                {name} {"⭐️".repeat(stars)}
              </p>
              <p className="font-medium text-white">R{price}</p>
            </div>

            {showAcceptButton && (
              <Button className="bg-pacific-blue hover:bg-cobalt text-white transition-colors">
                Accept
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Modal */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="bg-slate-900 text-white border border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-pacific-blue">
              {title} Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p className="text-slate-300">{serviceDetails.shortDescription}</p>
            <div>
              <p className="font-semibold text-blue-200 mb-1">Requirements:</p>
              <ul className="list-disc pl-5 text-slate-400">
                {serviceDetails.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="bg-slate-900 text-white border border-slate-700 max-w-lg flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-pacific-blue">
              {title} Reference Image
            </DialogTitle>
          </DialogHeader>
          <img
            src={serviceDetails.imageUrl || "/placeholder-service.jpg"}
            alt="Service reference"
            className="rounded-lg mt-3 w-full h-auto border border-slate-700 shadow-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
