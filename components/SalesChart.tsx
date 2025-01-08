import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const SalesChart = () => {
  // Sample data structure
  const dailyData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    currentMonth: i < 8 ? 5750 : 0,  // Blue line data
    previousMonth: i > 20 ? 6000 : 500,  // Orange line data
  }));



  return (
    <Card className="w-full p-6">
      <div className="mt-4">
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 "></div>
            <span className="text-sm text-gray-600">This month</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-orange-500"></div>
            <span className="text-sm text-gray-600">Last month</span>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickFormatter={(value) => `R ${value}`}
                axisLine={false}
                tickLine={false}
                padding={{ top: 10, bottom: 10 }}
              />
              <Line
                type="stepAfter"
                dataKey="ThisMonth"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 3 }}
              />
              <Line
                type="stepAfter"
                dataKey="LastMonth"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default SalesChart;