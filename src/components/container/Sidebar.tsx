"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, List, Mail, MenuIcon, User2 } from "lucide-react";


import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Logo from "../shared/Logo";

const Sidebar = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname();

  if (status === 'loading') return null;
  if (status === 'unauthenticated') redirect('/admin-login')

  return (
    <aside className="w-full md:w-16 md:h-screen lg:w-64 bg-primary border-r flex flex-row md:flex-col justify-between items-center p-2 md:pt-4 md:pb-2 fixed md:sticky bottom-0 md:top-0 z-10">
      <div className="w-full flex gap-1">
        <div className="size-10 overflow-hidden relative rounded-md">
          <Logo />
        </div>
        <div className="flex-1">
          <p className="text-base text-accent-bright leading-7">Pristine</p>
          <p className="text-green-500 dark:text-green-900 flex items-center gap-1 leading-1"><span className="block h-max rounded-full bg-green-500 dark:bg-green-900 p-1" />admin</p>
        </div>
      </div>

      <nav className="w-full md:mt-5 p-1 flex flex-row md:flex-col justify-center md:justify-start items-center md:items-start gap-4 md:gap-1.5 md:w-full md:flex-1">
        <Link
          href="/admin"
          className={cn(
            "w-max md:w-full md:p-2 flex flex-col md:flex-row justify-center items-center md:justify-start gap-0 md:gap-1 rounded-md cursor-pointer", pathname === '/admin' ? 'text-light-50 md:bg-light-200 font-bold' : "text-light-100 hover:bg-seconday-light-50"
          )}
        >
          <LayoutDashboard className="size-4 md:size-4.5" />
          <span className="text-[10px] md:text-base truncate">Dashboard</span>
        </Link>
        <Link
          href="/admin/listings"
          className={cn(
            "w-max md:w-full md:p-2 flex flex-col md:flex-row justify-center items-center lg:justify-start gap-0 md:gap-1 rounded-md cursor-pointer transition-colors", pathname === "/admin/listings" ? 'text-light-50 md:bg-light-200 font-bold' : "text-light-100 hover:bg-seconday-light-50"

          )}
        >
          <List className="size-4 md:size-4.5" />
          <span className="text-[10px] md:text-base">Listings</span>
        </Link>
        <Link
          href="/admin/leads"
          className={cn(
            "w-max md:w-full md:p-2 flex flex-col md:flex-row justify-center items-center lg:justify-start gap-0 md:gap-1 rounded-md cursor-pointer", pathname === '/admin/leads' ? "text-light-50 font-bold md:bg-light-200" : "text-light-100 hover:bg-seconday-light-50"
          )}
        >
          <User2 className="size-4 md:size-4.5" />
          <span className="text-[10px] md:text-base">Leads</span>
        </Link>
        <Link
          href="/admin/messages"
          className={cn(
            "w-max md:w-full md:p-2 flex flex-col md:flex-row justify-center items-center lg:justify-start gap-0 md:gap-1 rounded-md cursor-pointer", pathname === '/admin/messages' ? "text-light-50 font-bold md:bg-light-200" : "text-light-100 hover:bg-seconday-light-50"
          )}
        >
          <Mail className="size-4 md:size-4.5" />
          <span className="text-[10px] md:text-base">Messages</span>
        </Link>
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <article className="flex items-center gap-1.5 px-1 rounded-lg select-none cursor-pointer hover:bg-seconday-light-50">
            <MenuIcon className="md:hidden text-light-200" />
            <Avatar className="hidden md:flex size-8 shrink-0">
              <AvatarFallback className="size-full bg-light-200">
                {session?.user.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="w-full text-seconday-dark-100 hidden md:block">
              <p className="text-xs text-light-50 font-semibold flex truncate">{session?.user.name}</p>
              <p className="text-[10px] text-light-100 font-thin flex truncate">{session?.user.email}</p>
            </div>
          </article>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={async () => await signOut({ callbackUrl: "/" })} className="text-red-500 bg-red-50">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
};

export default Sidebar;
