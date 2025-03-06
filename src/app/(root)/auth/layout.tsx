import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <main className="min-h-screen bg-subtle-light">{children}</main>;
};

export default HomeLayout;
