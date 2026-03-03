import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container h-screen mx-auto flex-center">
      {children}
    </section>
  )
}

export default AuthLayout;
