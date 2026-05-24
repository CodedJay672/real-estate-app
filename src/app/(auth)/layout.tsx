import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Onboarding | Clean Beautiful Properties",
  description:
    "Clean beautiful properties is a real estate listing platform where you can find your next home or investment property.",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container h-screen mx-auto flex-center">
      {children}
    </section>
  )
}

export default AuthLayout;
