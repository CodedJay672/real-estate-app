"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";


import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CircleSlash, LayoutDashboard, List, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Sidebar = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname();

  if (status === 'loading') return null;
  if (status === 'unauthenticated') redirect('/admin-login')

  return (
    <nav className="w-full md:w-16 md:h-screen lg:w-64 bg-primary border-r flex flex-row md:flex-col justify-between items-center p-2 md:pt-4 md:pb-2 fixed md:sticky bottom-0 md:top-0 z-10">
      <Link
        href="/"
        className="p-2 flex justify-center lg:w-full lg:justify-start items-center"
      >
        <Image
          src="/assets/logo.png"
          alt="clean beautiful properties"
          width={72}
          height={72}
          className="object cover invert"
        />

      </Link>
      <ul className="md:mt-10 p-1 space-x-6 md:space-x-0 md:space-y-4 flex flex-row md:flex-col justify-center md:justify-start items-center md:items-start md:w-full md:flex-1">
        <li className="w-full">
          <Link
            href="/admin"
            className={cn(
              "w-full p-2 flex flex-col md:flex-row justify-center items-center md:justify-start gap-0 md:gap-1 rounded-md cursor-pointer", pathname === '/admin' ? 'text-light-50 bg-light-200' : "text-light-100 hover:bg-seconday-light-50"
            )}
          >
            <LayoutDashboard size={18} />
            <span className="text-[10px] md:text-base">Dashboard</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/listings"
            className={cn(
              "w-full p-2 flex flex-col md:flex-row justify-center items-center lg:justify-start gap-0 md:gap-1 rounded-md cursor-pointer transition-colors", pathname === "/admin/listings" ? 'text-light-50 bg-light-200' : "text-light-100 hover:bg-seconday-light-50"

            )}
          >
            <List size={18} />
            <span className="text-[10px] md:text-base">Listings</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/users"
            className={cn(
              "w-full p-2 flex flex-col md:flex-row justify-center items-center lg:justify-start gap-0 md:gap-1 rounded-md cursor-pointer", pathname === '/admin/users' ? "text-light-50 bg-light-200" : "text-light-100 hover:bg-seconday-light-50"
            )}
          >
            <User2 size={18} />
            <span className="text-[10px] md:text-base">Users</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/categories"
            className={cn(
              "w-full p-2 flex flex-col md:flex-row justify-center items-center lg:justify-start gap-0 md:gap-1 rounded-md cursor-pointer", pathname === '/admin/categories' ? 'text-light-50 bg-light-200' : "text-light-100 hover:bg-seconday-light-50"

            )}
          >
            <CircleSlash size={18} />
            <span className="text-[10px] md:text-base">Categories</span>
          </Link>
        </li>
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <article className="flex items-center gap-1.5 px-1 rounded-lg select-none cursor-pointer hover:bg-seconday-light-50">
            <Avatar className="size-6">
              <AvatarFallback className="bg-gray-100">
                {session?.user.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="w-full text-seconday-dark-100">
              <p className="text-xs text-light-50 font-semibold hidden md:flex truncate">{session?.user.name}</p>
              <p className="text-[10px] text-light-100 font-thin hidden md:flex truncate">{session?.user.email}</p>
            </div>
          </article>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={async () => await signOut({ callbackUrl: "/" })} className="text-red-500 bg-red-50">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Sidebar;
