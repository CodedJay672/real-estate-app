"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

export function AuthProvider({ session, children }: { session: Session | null, children: ReactNode }) {

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
