"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  MdChatBubbleOutline,
  MdClose,
  MdOutlineHome,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlineMenu,
  MdOutlineStackedLineChart,
  MdPersonOutline,
} from "react-icons/md";
import Link from "next/link";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";
import { signOut } from "@/auth";

const Header = ({ session }: { session: Session | null }) => {
  const authRef = useRef<HTMLAnchorElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleAuthClick = () => {
    if (!authRef.current) return;

    authRef.current.click();
  };

  return (
    <nav className="bg-gray-50 w-full p-2 flex justify-between items-center relative z-50">
      <Link href="/" className="flex justify-center items-center gap-1">
        <Image
          src="/assets/logo.png"
          alt="clean and beautiful properties"
          width={35}
          height={35}
          className="object-cover rounded-full"
        />
        <div className="text-blue-300">
          <h3 className="text-[18px] tracking-widest font-bold">CLEAN &</h3>
          <p className="text-[9px] font-semibold -mt-1">Beautiful Properties</p>
        </div>
      </Link>

      <ul className="text-base hidden md:flex items-center justify-between gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Listings</Link>
        </li>
        <li>
          <Link href="/">About Us</Link>
        </li>
        <li>
          <Link href="/">Blogs</Link>
        </li>
      </ul>

      <div className="hidden md:flex gap-[6px] items-center">
        <Link href="/auth/sign-in">Sign in</Link>
        <Button
          className="bg-blue-300 text-subtle-light"
          onClick={handleAuthClick}
        >
          Sign Up
        </Button>
        <Link href="/auth/sign-up" ref={authRef} className="hidden">
          Sign Up
        </Link>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        {session?.user?.name && (
          <Link href="/profile-page">
            <Avatar className="size-8 md:size-10">
              <AvatarFallback className="text-subtle-light bg-blue-300 font-semibold text-sm md:text-base">
                {getInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
        {showMenu ? (
          <MdClose
            size={24}
            onClick={() => setShowMenu(false)}
            className="cursor-pointer text-blue-300"
          />
        ) : (
          <MdOutlineMenu
            size={24}
            className="text-blue-300 cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        )}
      </div>
      {showMenu && (
        <div className="absolute flex flex-col items-end w-44 max-w-sm h-96 bg-subtle-light top-10 right-1 p-1 rounded-lg shadow-md shadow-blue-200 md:hidden">
          <div className="w-full flex-1 justify-center items-end flex flex-col gap-6 p-1">
            <Link href="/" className="flex items-center gap-[6px]">
              <span className="text-blue-300">Home</span>
              <MdOutlineHome size={24} className="text-blue-300" />
            </Link>
            <Link href="/" className="flex items-center gap-[6px]">
              <span>Listings</span>
              <MdOutlineStackedLineChart size={24} className="text-blue-300" />
            </Link>
            <Link href="/" className="flex items-center gap-[6px]">
              <span>About Us</span>
              <MdPersonOutline size={24} className="text-blue-300" />
            </Link>

            <Link href="/" className="flex items-center gap-[6px]">
              <span>Blogs</span>
              <MdChatBubbleOutline size={24} className="text-blue-300" />
            </Link>
          </div>
          {session?.user ? (
            <div
              className="w-full flex items-center justify-end gap-1 cursor-pointer p-1 bg-blue-300"
              onClick={() => signOut()}
            >
              <span>Logout</span>
              <MdOutlineLogout size={24} className="text-blue-300" />
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="w-full flex items-center gap-[6px] justify-end p-1"
            >
              <span className="text-blue-300 text-sm font-medium">Sign In</span>
              <MdOutlineLogin size={24} />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
