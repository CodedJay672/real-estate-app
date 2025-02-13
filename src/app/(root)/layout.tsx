import { auth } from "@/auth";
import Header from "@/components/container/Header";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <main className="min-h-screen bg-subtle-light">
      <Header session={session} />
      {children}
    </main>
  );
};

export default HomeLayout;
