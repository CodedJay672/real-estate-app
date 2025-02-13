import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex">
      <nav className="w-sm">Navbar</nav>
      {children}
    </main>
  );
};

export default AdminLayout;
