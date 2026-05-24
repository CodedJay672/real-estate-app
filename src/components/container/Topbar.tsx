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
    <header className="w-full z-50 fixed top-0 left-0 bg-slate-950/80 backdrop-blur-md border-b border-white/5 transition-transform transform-gpu ease-in-out duration-300">
      <nav className="container flex justify-between items-center mx-auto py-4 px-4 sm:px-6">
        <div className="size-10 rounded-md relative overflow-hidden">
          <Logo />
        </div>


        <div className="flex-center gap-2">
          <ul className="text-sm hidden md:flex items-center justify-between gap-8">
            <li>
              <Link href="/" className={cn("text-sm transition-all duration-200", isActive("/") ? "text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] font-bold" : "font-medium text-slate-300 hover:text-[#f5c344]")}>Home</Link>
            </li>
            <li>
              <Link href="/top-searches" className={cn("text-sm transition-all duration-200", isActive('/top-searches') ? "text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] font-bold" : "text-slate-300 font-medium hover:text-[#f5c344]")}>Top searches</Link>
            </li>
            <li>
              <Link href="/listings" className={cn("text-sm transition-all duration-200", isActive('/listings') ? "text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] font-bold" : "text-slate-300 font-medium hover:text-[#f5c344]")}>Listings</Link>
            </li>
            <li>
              <Link href="/about-us" className={cn("text-sm transition-all duration-200", isActive("/about-us") ? "text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] font-bold" : "text-slate-300 font-medium hover:text-[#f5c344]")}>About Us</Link>
            </li>
            <li>
              <Link href="/blog" className={cn("text-sm transition-all duration-200", isActive("/blog") ? "text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] font-bold" : "text-slate-300 font-medium hover:text-[#f5c344]")}>Blog</Link>
            </li>
          </ul>

          <Header />
        </div>
      </nav>
    </header>
  )
};

export default Topbar;
