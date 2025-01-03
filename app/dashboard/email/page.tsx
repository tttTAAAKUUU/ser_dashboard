"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const emails = [
  {
    id: 1,
    subject: "Weekly Newsletter",
    from: "newsletter@company.com",
    preview: "Check out our latest updates and news...",
    time: "10:30 AM",
    status: "unread",
    fullContent: `
      Dear Valued Customer,

      We hope this newsletter finds you well. Here are our latest updates:

      1. New Product Launches
      2. Upcoming Events
      3. Customer Success Stories
      4. Tips & Tricks

      Best regards,
      The Company Team
    `,
    attachments: [
      { name: "newsletter.pdf", size: "2.4 MB" }
    ]
  },
  {
    id: 2,
    subject: "Meeting Reminder",
    from: "calendar@company.com",
    preview: "Your meeting starts in 30 minutes...",
    time: "09:15 AM",
    status: "read",
    fullContent: `
      This is a reminder that your meeting "Q1 Review" starts in 30 minutes.

      Time: 10:00 AM
      Location: Conference Room A
      Participants: 5

      Agenda:
      - Q1 Performance Review
      - Goals for Q2
      - Open Discussion
    `,
    attachments: [
      { name: "agenda.doc", size: "156 KB" }
    ]
  },
  {
    id: 3,
    subject: "New Feature Release",
    from: "product@company.com",
    preview: "We're excited to announce our latest feature...",
    time: "Yesterday",
    status: "read",
    fullContent: `
      We're thrilled to announce the release of our latest feature!

      Key highlights:
      - Improved performance
      - New user interface
      - Enhanced security
      - Better integration options

      Try it out and let us know what you think!
    `,
    attachments: [
      { name: "release-notes.pdf", size: "1.2 MB" },
      { name: "user-guide.pdf", size: "3.5 MB" }
    ]
  }
]

export default function EmailPage() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Email</h2>
        <p className="text-muted-foreground">Your email inbox.</p>
      </div>

      <div className="space-y-4">
        {emails.map((email) => (
          <Card
            key={email.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push(`/dashboard/email/${email.id}`)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Mail className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{email.subject}</h3>
                  {email.status === "unread" && (
                    <Badge>New</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{email.from}</p>
                <p className="text-muted-foreground line-clamp-1">{email.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-muted-foreground">{email.time}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}