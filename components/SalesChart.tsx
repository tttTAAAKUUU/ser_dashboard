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

  const metrics = [
    {
      title: 'Gross sales',
      value: 'R 5 750.00',
      change: 'R -600.00',
      isNegative: true
    },
    {
      title: 'Number of sales',
      value: '6',
      change: '-2',
      isNegative: true
    },
    {
      title: 'Average sale',
      value: 'R 908.33',
      change: '+R 152.00',
      isNegative: false
    }
  ];

  return (
    <Card className="w-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{metric.title}</span>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-semibold">{metric.value}</div>
            <div className={`inline-flex px-2 py-1 rounded-md text-sm ${
              metric.isNegative 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span className="text-sm text-gray-600">Current month</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-orange-500"></div>
            <span className="text-sm text-gray-600">Previous month</span>
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
                dataKey="currentMonth"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 3 }}
              />
              <Line
                type="stepAfter"
                dataKey="previousMonth"
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