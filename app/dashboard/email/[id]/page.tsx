"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Paperclip } from "lucide-react"
import { emails } from "../page"
import { Separator } from "@/components/ui/separator"

export default function EmailDetail() {
  const params = useParams()
  const email = emails.find(e => e.id === parseInt(params.id as string))

  if (!email) {
    return <div>Email not found</div>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{email.subject}</CardTitle>
              <span className="text-sm text-muted-foreground">{email.time}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">From: {email.from}</p>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{email.fullContent}</pre>
          </div>
          
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Attachments</h4>
              <div className="space-y-2">
                {email.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{attachment.name}</span>
                    <span className="text-xs text-muted-foreground">({attachment.size})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}