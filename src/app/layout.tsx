import '@/app/globals.css';
import { LenisProvider } from '@/lib/lenis';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sriharibuilder.com'),
  title: {
    default: 'Sri Hari Builder & Promoters | Excellence in Engineering & Construction',
    template: '%s | Sri Hari Builder & Promoters'
  },
  description: "Coimbatore's premium construction company since 2008. Specializing in luxury residential projects, robust commercial buildings, and architectural landmarks.",
  keywords: ['Top Builders in Coimbatore', 'Best Construction Company in Chennai', 'Sri Hari Builder', 'Luxury Homes Coimbatore', 'Construction Contractors Tamil Nadu', 'Engineering Excellence', 'Sri Hari Promoters'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sri Hari Builder & Promoters | Premier Construction House',
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
          {/* JSON-LD Local Search Engine Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": ["ConstructionBusiness", "LocalBusiness"],
                "name": "Sri Hari Builder & Promoters",
                "url": "https://www.sriharibuilder.com",
                "logo": "https://www.sriharibuilder.com/logo.png",
                "image": "https://www.sriharibuilder.com/logo.png",
                "description": "Coimbatore's leading engineering house and construction experts, building architectural landmarks and premium residential projects since 2008.",
                "foundingDate": "2008",
                "address": [
                  {
                    "@type": "PostalAddress",
                    "streetAddress": "No 133, Near Ramanis Appartment, Amarar Jevanatham Road, 7th Street Ext",
                    "addressLocality": "Coimbatore",
                    "addressRegion": "Tamil Nadu",
                    "postalCode": "641012",
                    "addressCountry": "IN"
                  },
                  {
                    "@type": "PostalAddress",
                    "streetAddress": "133-Amarar jevanthan road, 7th Street Extn, Gandhipuram",
                    "addressLocality": "Coimbatore",
                    "addressRegion": "Tamil Nadu",
                    "postalCode": "641027",
                    "addressCountry": "IN"
                  }
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91 9787081184",
                  "contactType": "Customer Service",
                  "availableLanguage": ["English", "Tamil"]
                },
                "areaServed": ["Coimbatore", "Chennai"],
                "priceRange": "$$$$"
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
