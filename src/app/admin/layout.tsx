import type { Metadata } from "next";
import { ReactNode } from "react";


import AdminTopbar from "@/components/admin/AdminTopbar";
import Sidebar from "@/components/container/Sidebar";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "This is an admin app for clean beautiful properties realty.",
};

const AdminLayout = async ({ children }: { children: ReactNode }) => {

  return (
    <main className="min-h-screen flex relative">
      <Sidebar />
      <section className="w-full space-y-6">
        <AdminTopbar />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
