"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Logo from "../shared/Logo";
import Header from "./Header";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };


  return (
    <header className={cn("w-full z-50 fixed top-0 left-0 bg-dark-200/10 transition-transform transform-gpu ease-in-out duration-300", isVisible ? 'translate-y-0' : '-translate-y-60')}>
      <nav className="container flex justify-between items-center mx-auto py-4 px-2">
        <div className="bg-light-50 p-1 rounded-lg">

          <Logo />
        </div>


        <div className="flex-center gap-2">

          <ul className="text-base hidden md:flex items-center justify-between gap-6">
            <li>
              <Link href="/" className={cn("text-base hover:text-light-50 px-2.5 py-1 rounded-full transition-colors", isActive("/") ? "font-bold text-light-50 bg-light-200/60" : "font-medium text-light-100 hover:bg-light-200/60")}>Home</Link>
            </li>
            <li>
              <Link href="/top-searches" className={cn("text-base hover:text-light-50 rounded-full px-2.5 py-1 transition-colors", isActive('/top-searches') ? "text-light-50 font-bold bg-light-200" : "text-light-100 font-medium hover:bg-light-200/60")}>Top searches</Link>
            </li>
            <li>
              <Link href="/listings" className={cn("text-base hover:text-light-50 rounded-full px-2.5 py-1 transition-colors", isActive('/listings') ? "text-light-50 font-bold bg-light-200" : "text-light-100 font-medium hover:bg-light-200/60")}>Listings</Link>
            </li>
            <li>
              <Link href="/about-us" className={cn("text-base  hover:text-light-50 px-2.5 py-1 rounded-full transition-colors", isActive("/about-us") ? "text-light-50 font-bold bg-light-200/50" : "text-light-100 font-medium hover:bg-light-200/60")}>About Us</Link>
            </li>
            <li>
            </li>
          </ul>
          <Header />
        </div>
      </nav>
    </header>
  )
};

export default Topbar;
