import { ReactNode } from "react";

import Footer from "@/components/container/Footer";
import Topbar from "@/components/container/Topbar";
import AIChatbot from "@/components/container/AIChatbot";
import MobileBottomNav from "@/components/container/MobileBottomNav";
import CustomCursor from "@/components/shared/CustomCursor";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative pb-16 sm:pb-0">
      <CustomCursor />
      <Topbar />
      {children}
      <Footer />
      <AIChatbot />
      <MobileBottomNav />
    </main>
  );
};

export default HomeLayout;
