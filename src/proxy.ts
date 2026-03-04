import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("admin only.", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  },
);

export const config = { matcher: ["/admin/:path*"] };
