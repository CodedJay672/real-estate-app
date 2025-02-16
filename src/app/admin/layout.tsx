import { auth } from "@/auth";
import Sidebar from "@/components/container/Sidebar";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  let user;

  if (session) {
    const response = await getUser(session?.user?.email!);

    if (!response.success) {
      return;
    }

    user = response.data;
    const isAdmin = user?.[0].role === "admin";

    if (!isAdmin) {
      redirect("/");
    }
  }

  return (
    <main className="min-h-screen flex relative">
      <Sidebar {...user?.[0]} />
      {children}
    </main>
  );
};

export default AdminLayout;
