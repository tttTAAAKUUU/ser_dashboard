import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

type PastRequestCardProps = {
  serviceName: string;
  clientName: string;
  rating: number;
  price: number;
  date: string;
  time: string;
};

export function PastRequestCard({
  serviceName,
  clientName,
  rating,
  price,
  date,
  time,
}: PastRequestCardProps) {
  return (
    <Card className="bg-slate-800 text-white border border-slate-700 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg text-blue-300">{serviceName}</CardTitle>
        <p className="text-sm text-gray-400">{date} • {time}</p>
      </CardHeader>

      <CardContent>
        <p className="text-gray-300 mb-1">
          Client: <span className="font-medium text-white">{clientName}</span>
        </p>
        <p className="text-gray-400">
          Rating: {"⭐️".repeat(rating)} ({rating}/5)
        </p>
        <p className="text-gray-300 mt-2 font-semibold">Price: R{price}</p>
      </CardContent>

      <CardFooter>
        <Button className="bg-pacific-blue hover:bg-cobalt text-white w-full">
          View More
        </Button>
      </CardFooter>
    </Card>
  );
}
