import Footer from "@/components/container/Footer";
import Topbar from "@/components/container/Topbar";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-subtle-light">
      <Topbar />
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
