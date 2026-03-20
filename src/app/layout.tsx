import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { LayoutProvider } from "@/components/providers/LayoutProvider";
import { ProductStoreProvider } from "@/components/providers/StoreProvider";


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
            {children}
          </ProductStoreProvider>
          <Toaster />
        </LayoutProvider>
      </body>
    </html>
  );
}
