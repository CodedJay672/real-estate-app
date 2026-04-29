import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

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

const lufga = localFont({
  src: [
    {
      path: "/fonts/Lufga-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Lufga-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Lufga-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/Lufga-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});


export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`${lufga.className} antialiased`}>
        <LayoutProvider>
          <ProductStoreProvider>
            {/* <MaintenanceProvider> */}
            {children}
            {/* </MaintenanceProvider> */}
          </ProductStoreProvider>
        </LayoutProvider>
        <Toaster />
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
      </body>
    </html>
  );
}
