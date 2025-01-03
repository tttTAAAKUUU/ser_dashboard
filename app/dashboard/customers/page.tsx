"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

const customers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    status: "active",
    joinDate: "2024-01-15",
    orders: 12
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com", 
    status: "active",
    joinDate: "2024-02-01",
    orders: 8
  },
  { 
    id: 3, 
    name: "Bob Johnson", 
    email: "bob@example.com", 
    status: "inactive",
    joinDate: "2023-12-10",
    orders: 3
  },
]

export default function CustomersPage() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">Manage your customer base.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow 
              key={customer.id}
              className="group cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
            >
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>{customer.joinDate}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}