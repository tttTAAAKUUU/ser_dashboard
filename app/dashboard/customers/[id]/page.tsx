"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const customers = {
  1: { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    status: "active",
    joinDate: "2024-01-15",
    orders: 12,
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    recentOrders: [
      { id: "ORD-001", date: "2024-03-15", amount: "$129.99", status: "delivered" },
      { id: "ORD-002", date: "2024-03-10", amount: "$79.99", status: "processing" },
      { id: "ORD-003", date: "2024-03-05", amount: "$199.99", status: "delivered" },
    ]
  },
  2: {
    id: 2,
    name: "Jane Smith", 
    email: "jane@example.com", 
    status: "active",
    joinDate: "2024-02-01",
    orders: 8,
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    recentOrders: [
      { id: "ORD-004", date: "2024-03-12", amount: "$149.99", status: "delivered" },
      { id: "ORD-005", date: "2024-03-08", amount: "$89.99", status: "delivered" },
    ]
  },
  3: {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    joinDate: "2023-12-10",
    orders: 3,
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, Chicago, IL 60601",
    recentOrders: [
      { id: "ORD-006", date: "2024-02-28", amount: "$59.99", status: "delivered" },
    ]
  },
}

export default function CustomerProfile() {
  const params = useParams()
  const customer = customers[params.id as unknown as keyof typeof customers]

  if (!customer) {
    return <div>Customer not found</div>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://avatar.vercel.sh/${customer.email}`} />
            <AvatarFallback>{customer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">{customer.name}</CardTitle>
              <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                {customer.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{customer.email}</p>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{customer.phone}</p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-muted-foreground">{customer.address}</p>
              </div>
              <div>
                <p className="font-medium">Join Date</p>
                <p className="text-muted-foreground">{customer.joinDate}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}