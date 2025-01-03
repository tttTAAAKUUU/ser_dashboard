"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageSquare, ChevronRight } from "lucide-react"

export const messages = [
  { 
    id: 1, 
    from: "John Doe", 
    message: "Hey, just checking in!", 
    time: "5m ago",
    email: "john@example.com",
    avatar: "https://avatar.vercel.sh/john@example.com",
    conversation: [
      { sender: "John Doe", message: "Hey, just checking in!", time: "5m ago" },
      { sender: "You", message: "Hi John! Thanks for checking in.", time: "4m ago" },
      { sender: "John Doe", message: "How's the project coming along?", time: "3m ago" }
    ]
  },
  { 
    id: 2, 
    from: "Jane Smith", 
    message: "When can we meet?", 
    time: "1h ago",
    email: "jane@example.com",
    avatar: "https://avatar.vercel.sh/jane@example.com",
    conversation: [
      { sender: "Jane Smith", message: "When can we meet?", time: "1h ago" },
      { sender: "You", message: "How about tomorrow at 2 PM?", time: "45m ago" },
      { sender: "Jane Smith", message: "Sounds good!", time: "30m ago" }
    ]
  },
  { 
    id: 3, 
    from: "Bob Johnson", 
    message: "Project update needed", 
    time: "2h ago",
    email: "bob@example.com",
    avatar: "https://avatar.vercel.sh/bob@example.com",
    conversation: [
      { sender: "Bob Johnson", message: "Project update needed", time: "2h ago" },
      { sender: "You", message: "I'll send it over by EOD", time: "1h ago" }
    ]
  }
]

export default function MessagesPage() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Your recent conversations.</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push(`/dashboard/messages/${message.id}`)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{message.from}</h3>
                  <p className="text-sm text-muted-foreground">{message.time}</p>
                </div>
                <p className="text-muted-foreground line-clamp-1">{message.message}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}