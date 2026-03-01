import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { auth } from "@/lib/auth";


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

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${lufga.className} antialiased`}>
        <AuthProvider session={session}>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
