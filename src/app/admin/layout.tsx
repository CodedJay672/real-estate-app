import { auth } from "@/auth";
import Sidebar from "@/components/container/Sidebar";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Clean Beautiful Properties",
  description:
    "Clean beautiful properties is a real estate listing platform where you can find your next home or investment property.",
};

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const response = await getUser(session?.user?.email!);

  if (!response.success) {
    redirect("/auth/sign-in");
  }

  const user = response.data;
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex relative">
      <Sidebar {...user} />
      {children}
    </main>
  );
};

export default AdminLayout;
