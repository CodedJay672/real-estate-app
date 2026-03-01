import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container mx-auto flex">
      <div className="hidden md:flex flex-col gap-2 w-1/2"></div>
      {children}
    </section>
  )
}

export default AuthLayout;
