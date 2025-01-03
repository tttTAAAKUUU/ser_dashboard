import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";


const inter = Inter({ subsets: ['latin'] })



export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'A modern dashboard built with Next.js and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}