import Footer from "@/components/container/Footer";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-subtle-light">
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
