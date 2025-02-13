import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Home | Clean Beautiful Properties",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
