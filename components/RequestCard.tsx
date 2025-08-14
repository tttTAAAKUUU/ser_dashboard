// components/RequestCard.tsx

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

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
  showAcceptButton?: boolean; // optional
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
}: RequestProps) {
  return (
    <Card className="bg-slate-800 text-white shadow-lg border border-slate-700 rounded-lg p-4 w-full">
      <CardHeader>
        <CardTitle className="text-blue-300 text-xl font-semibold mb-2">{title}</CardTitle>
        <CardDescription className="text-sm text-slate-400">
          <p>{date} • {time}</p>
          <p className="mt-1">📍 {address}, {area}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 space-y-2">
        <div>
          <p className="font-bold text-blue-200">Notes:</p>
          <p className="text-slate-300">{description}</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-600 mt-4">
          <div className="text-sm text-slate-400">
            <p>{name} {"⭐️".repeat(stars)}</p>
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
  );
}
