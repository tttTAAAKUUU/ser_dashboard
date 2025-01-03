import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/ui/chart"

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2700 },
  { name: "Jun", total: 3200 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Your business performance metrics.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <BarChart data={data} />
        </CardContent>
      </Card>
    </div>
  )
}