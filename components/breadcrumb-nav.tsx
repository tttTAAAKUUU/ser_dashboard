"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HomeIcon } from "lucide-react"
import Link from "next/link"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">
              <HomeIcon className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.slice(1).map((segment, index) => {
          const isLast = index === segments.slice(1).length - 1
          const path = `/dashboard/${segments.slice(1, index + 2).join("/")}`
          
          return (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path} className="capitalize">
                      {segment}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}