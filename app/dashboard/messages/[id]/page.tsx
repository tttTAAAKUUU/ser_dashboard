"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { messages } from "../page"

export default function MessageDetail() {
  const params = useParams()
  const message = messages.find(m => m.id === parseInt(params.id as string))

  if (!message) {
    return <div>Message not found</div>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={message.avatar} />
            <AvatarFallback>{message.from.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{message.from}</CardTitle>
            <p className="text-sm text-muted-foreground">{message.email}</p>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {message.conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                msg.sender === "You"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{msg.sender}</span>
                <span className="text-xs opacity-70">{msg.time}</span>
              </div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}