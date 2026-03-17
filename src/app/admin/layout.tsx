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
    <main className="flex relative">
      <Sidebar />
      <section className="w-full">
        <AdminTopbar />
        <div className="w-full min-h-screen bg-light-100/5">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AdminLayout;
