import { ReactNode } from "react";

import Footer from "@/components/container/Footer";
import Topbar from "@/components/container/Topbar";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Topbar />
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
