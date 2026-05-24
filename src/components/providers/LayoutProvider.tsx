
import { auth } from "@/lib/auth";
import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

export async function LayoutProvider({ children }: { children: ReactNode }) {
  const session = await auth();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
