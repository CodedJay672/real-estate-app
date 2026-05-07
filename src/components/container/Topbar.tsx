"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Logo from "../shared/Logo";
import Header from "./Header";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();


  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };


  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-slate-900/50 transition-transform transform-gpu ease-in-out duration-300">
      <nav className="container flex justify-between items-center mx-auto py-4 px-2">
        <div className="size-10 rounded-md relative overflow-hidden">
          <Logo />
        </div>


        <div className="flex-center gap-2">
          <ul className="text-sm hidden md:flex items-center justify-between gap-6">
            <li>
              <Link href="/" className={cn("text-sm hover:text-light-50 px-2.5 py-1 rounded-full transition-colors", isActive("/") ? "text-light-50 bg-light-200/60" : "font-medium text-light-100 hover:bg-light-200/60")}>Home</Link>
            </li>
            <li>
              <Link href="/top-searches" className={cn("text-sm hover:text-light-50 rounded-full px-2.5 py-1 transition-colors", isActive('/top-searches') ? "text-light-50 bg-light-200" : "text-light-100 font-medium hover:bg-light-200/60")}>Top searches</Link>
            </li>
            <li>
              <Link href="/listings" className={cn("text-sm hover:text-light-50 rounded-full px-2.5 py-1 transition-colors", isActive('/listings') ? "text-light-50 bg-light-200" : "text-light-100 font-medium hover:bg-light-200/60")}>Listings</Link>
            </li>
            <li>
              <Link href="/about-us" className={cn("text-sm  hover:text-light-50 px-2.5 py-1 rounded-full transition-colors", isActive("/about-us") ? "text-light-50 bg-light-200/50" : "text-light-100 font-medium hover:bg-light-200/60")}>About Us</Link>
            </li>
          </ul>

          <Header />
        </div>
      </nav>
    </header>
  )
};

export default Topbar;
