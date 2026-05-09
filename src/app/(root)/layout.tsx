import { ReactNode } from "react";

import Footer from "@/components/container/Footer";
import Topbar from "@/components/container/Topbar";
import DraggableWhatsApp from "@/components/container/DraggableWhatsApp";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Topbar />
      {children}
      <Footer />
      <DraggableWhatsApp />
    </main>
  );
};

export default HomeLayout;
