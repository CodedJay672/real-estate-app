import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session?.user?.email ?? ""))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    const isAdmin = user[0].role === "admin";

    if (!isAdmin) {
      redirect("/");
    }
  }

  return (
    <main className="min-h-screen flex">
      <nav className="w-sm">Navbar</nav>
      {children}
    </main>
  );
};

export default AdminLayout;
