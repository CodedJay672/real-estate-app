import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { getInitials } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { MdDashboard, MdList } from "react-icons/md";
import { RiUser2Line } from "react-icons/ri";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  let user;

  if (session) {
    user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session?.user?.email ?? ""))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    const isAdmin = user[0].role === "admin";

    if (!isAdmin) {
      redirect("/");
    }
  }

  return (
    <main className="min-h-screen flex">
      <nav className="w-14 lg:w-64 min-h-screen bg-blue-50 border-r border-gray-200 flex flex-col justify-between items-center pt-4 pb-2">
        <div className="p-2 w-full rounded-full flex justify-center lg:justify-start items-center">
          <Image
            src="/assets/logo.png"
            alt="clean beautiful properties"
            width={32}
            height={32}
            className="object cover"
          />
          <div className="text-blue-300 hidden lg:block">
            <h3 className="text-[18px] tracking-widest font-bold">CLEAN &</h3>
            <p className="text-[9px] font-semibold -mt-1">
              Beautiful Properties
            </p>
          </div>
        </div>
        <ul className="flex-1 mt-10 w-full p-1 space-y-3">
          <li className="">
            <Link
              href="/admin"
              className="w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              <MdDashboard size={24} className="text-blue-300 " />
              <span className="hidden lg:inline-block">Dashboard</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/admin"
              className="w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              <MdList size={24} className="text-blue-300 " />
              <span className="hidden lg:inline-block">Listings</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/admin"
              className="w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              <RiUser2Line size={24} className="text-blue-300 " />
              <span className="hidden lg:inline-block">Users</span>
            </Link>
          </li>
        </ul>

        <div className="lg:w-full border rounded-full flex items-center lg:pl-2">
          <Avatar>
            <AvatarFallback className="bg-gray-100">
              {getInitials(user?.[0].fullName as string)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold ml-1 hidden lg:inline-block">
            {user?.[0].fullName}
          </span>
        </div>
      </nav>
      {children}
    </main>
  );
};

export default AdminLayout;
