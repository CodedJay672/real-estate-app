"use client"


import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function AuthProvider({ session, children }: { session: Session | null, children: React.ReactNode }) {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default AuthProvider