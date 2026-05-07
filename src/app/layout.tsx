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
    </html>
  );
}
