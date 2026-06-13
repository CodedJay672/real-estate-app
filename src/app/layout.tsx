import Script from 'next/script'
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { LayoutProvider } from "@/components/providers/LayoutProvider";
import { ProductStoreProvider } from "@/components/providers/StoreProvider";
import MaintenanceProvider from "@/components/providers/MaintenanceProvider";

export const metadata: Metadata = {
  title: {
    template: '%s | Clean Beautiful Properties',
    default: "Home"
  },
  description:
    "Clean beautiful properties is a real estate listing platform where you can find your next home or investment property.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Clean Beautiful Properties Limited",
              "alternateName": "CBPL",
              "url": "https://cleanbeautifulproperties.com",
              "logo": "https://cleanbeautifulproperties.com/assets/logo.png",
              "image": "https://cleanbeautifulproperties.com/assets/team/ceo.jpeg",
              "description": "Clean Beautiful Properties Limited is a premium real estate consulting firm specializing in luxury properties in Lagos, Nigeria, London, UK, and Dubai. Led by CEO Lauretta Asemota.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lekki Phase 1",
                "addressRegion": "Lagos",
                "addressCountry": "Nigeria"
              },
              "telephone": "+2348000000000",
              "founder": {
                "@type": "Person",
                "name": "Lauretta Asemota",
                "jobTitle": "CEO & Founder",
                "image": "https://cleanbeautifulproperties.com/assets/team/ceo.jpeg",
                "sameAs": [
                  "https://www.instagram.com/laurettaasemota",
                  "https://www.tiktok.com/@laurettaasemota"
                ]
              },
              "sameAs": [
                "https://www.instagram.com/laurettaasemota",
                "https://www.tiktok.com/@laurettaasemota"
              ],
              "knowsAbout": [
                "Luxury Real Estate Lagos",
                "Land documentation in Nigeria",
                "Certificate of Occupancy (C of O)",
                "Governor's Consent",
                "Deed of Assignment",
                "Lekki property investment"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <LayoutProvider>
          <ProductStoreProvider>
            {/* <MaintenanceProvider> */}
            {children}
            {/* </MaintenanceProvider> */}
          </ProductStoreProvider>
        </LayoutProvider>
        <Toaster />
      </body>

      {/* Google Analytics - Downtown Landing Page Tracking */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18123877302"
        strategy="afterInteractive"
      />
      <Script
        id="downtown-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18123877302');
          `,
        }}
      />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J0GW3P8MNY"
        strategy="afterInteractive"
      />
      <Script
        id="ga4-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J0GW3P8MNY');
          `,
        }}
      />
    </html>
  );
}
