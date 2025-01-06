import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'A modern dashboard built with Next.js and shadcn/ui',
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ClerkProvider>
          <ThemeProvider>
            <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}