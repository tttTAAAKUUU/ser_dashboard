import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const stockData = [
  { product: "iPad Pro 2017 Model", quantity: 32 },
  { product: "DJI Mavic Pro 2", quantity: 43 },
  { product: "Tesla Model S", quantity: 21 },
  { product: "Lego Star'War edition", quantity: 12 },
  { product: "Dell Computer Monitor", quantity: 16 },
  { product: "Google Pixel", quantity: 8 },
  { product: "Microsoft Surface", quantity: 14 },
  { product: "Amazon Kindle", quantity: 27 },
];

const StockAlert = () => {
  return (
    <Card className="border border-midnight-express shadow-sm">
      <CardHeader>
        <h3 className="text-lg font-bold">Stock Alert</h3>
      </CardHeader>
      <CardContent>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-white">
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-900"
                }`}
              >
                <td className="py-2 px-4 font-medium text-white">
                  {item.product}
                </td>
                <td className="py-2 px-4 font-bold text-white">
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default StockAlert;