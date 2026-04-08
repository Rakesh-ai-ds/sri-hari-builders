import '@/app/globals.css';
import { LenisProvider } from '@/lib/lenis';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Hari Builder & Promoters | Engineering Excellence & Iconic Landmarks in Coimbatore',
  description: "Coimbatore's premier engineering house since 2008. Specializing in the construction of architectural landmarks and high-end residential estates with zero compromise on structural integrity.",
  keywords: 'Sri Hari Builder, Construction Company Coimbatore, Engineering Excellence, Building Contractors, Premier Engineering House, Sri Hari Promoters, Coimbatore Construction',
  openGraph: {
    title: 'Sri Hari Builder & Promoters | Premier Engineering House',
    description: "Building generational legacies through architectural beauty and structural precision since 2008.",
    url: 'https://sriharibuilders.com',
    siteName: 'Sri Hari Builder & Promoters',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Hari Builder & Promoters | Engineering Excellence',
    description: "Building generational legacies through architectural beauty and structural precision since 2008.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-off-white dark:bg-charcoal text-charcoal dark:text-off-white font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" forcedTheme="dark">
          <LenisProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <CustomCursor />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
