"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Logo from "../shared/Logo";
import Header from "./Header";

const Topbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={cn("w-full z-50 px-2 py-4 fixed top-0 left-0 bg-light-50 transition-transform transform-gpu ease-in-out duration-300", isVisible ? 'translate-y-0' : '-translate-y-60')}>
      <nav className="container flex justify-between items-center mx-auto">
        <Logo />
        <ul className="text-base hidden md:flex items-center justify-between gap-6">
          <li>
            <Link href="/" className="text-base  text-primary hover:text-primary-light transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/listings" className="text-base  text-primary hover:text-primary-light transition-colors">Listings</Link>
          </li>
          <li>
            <Link href="/about-us" className="text-base  text-primary hover:text-primary-light transition-colors">About Us</Link>
          </li>
        </ul>
        <Header />
      </nav>
    </header>
  )
};

export default Topbar;
