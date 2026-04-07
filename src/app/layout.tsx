import '@/app/globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { LenisProvider } from '@/lib/lenis';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Hari Builder & Promoters | Luxury Real Estate & Engineering Excellence in Coimbatore',
  description: "Coimbatore's premier engineering house since 1995. Specializing in luxury residential villas, apartments, and premium commercial developments with zero compromise on structural integrity.",
  keywords: 'Sri Hari Builders, Luxury Villas Coimbatore, Real Estate Coimbatore, Construction Company, Engineering Excellence, Premium Apartments, Sri Hari Promoters',
  openGraph: {
    title: 'Sri Hari Builder & Promoters | Luxury Real Estate',
    description: "Coimbatore's premier engineering house since 1995.",
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
    title: 'Sri Hari Builder & Promoters | Luxury Real Estate',
    description: "Coimbatore's premier engineering house since 1995.",
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
            <Navbar />
            <CustomCursor />
            <ScrollProgress />
            {children}
            <WhatsAppButton />
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
