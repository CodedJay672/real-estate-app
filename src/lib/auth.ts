import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import bcrypt from "bcryptjs";

import type { NextAuthOptions, User } from "next-auth";
import { getServerSession } from "next-auth";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }
  interface Session {
    user: User & {
      id: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

export const config = {
  providers: [
    Credentials({
      name: "Email and password.",
      credentials: {
        email: {
          label: "Email address",
          type: "email",
          placeholder: "example123@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //destructure login details
        if (!credentials?.email || !credentials.password) return null;
        const { email, password } = credentials;

        // get the user from the DB
        const user = await db
          .select({
            id: usersTable.id,
            email: usersTable.email,
            passwordHash: usersTable.password,
            fullName: usersTable.fullName,
            role: usersTable.role,
          })
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        //check if user exists
        if (!user || user.length === 0) {
          console.log("something went wrong.");
          throw new Error(
            "User not registered. Please create an account to continue.",
          );
        }

        // verify the users password
        const pwdCheck = await bcrypt.compare(password, user[0].passwordHash);

        // append user to "user info in jwt"
        if (pwdCheck)
          return {
            id: user[0].id,
            name: user[0].fullName,
            email: user[0].email,
            role: user[0].role,
          } as User;

        // show error message;
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
