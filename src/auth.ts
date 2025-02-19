import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db/drizzle";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null;

        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials?.email.toString()))
          .limit(1);

        if (!user || user.length === 0) {
          throw new CredentialsSignin(
            "Email not registered. Create an account and login again."
          );
        }

        // logic to compare hashed password
        const confirmPwd = await compare(
          credentials?.password.toString(),
          user[0].password
        );

        if (!confirmPwd) {
          throw new CredentialsSignin("Password is incorrect");
        }

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
