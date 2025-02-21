"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  MdChatBubbleOutline,
  MdClose,
  MdOutlineHome,
  MdOutlineLogin,
  MdOutlineMenu,
  MdPersonOutline,
} from "react-icons/md";
import Link from "next/link";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { cn, getInitials } from "@/lib/utils";
import { logOut } from "@/lib/actions/auth";
import { RiListView } from "react-icons/ri";
import CustomSheet from "../shared/CustomSheet";
import { usePathname } from "next/navigation";

const Header = ({ session }: { session: Session | null }) => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
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
      {session ? (
        <div
          className="hidden w-28 h-10 p-1 rounded-full border border-blue-200 md:flex items-center gap-1 cursor-pointer"
          onClick={logOut}
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback>{getInitials(session?.user?.name!)}</AvatarFallback>
          </Avatar>
          <span className="text-blue-300 font-medium">Logout</span>
        </div>
      ) : (
        <div className="hidden md:flex gap-[6px] items-center">
          <Link href="/auth/sign-in">Sign in </Link>
          <Link href="/auth/signup" className="hidden">
            Sign Up
          </Link>
        </div>
      )}

      {/** Mobile Menu */}
      <div className="flex items-center gap-2 md:hidden">
        {session && (
          <Link href="/profile-page">
            <Avatar className="size-10">
              <AvatarFallback className="text-subtle-light bg-blue-300 font-semibold text-sm md:text-base">
                {getInitials(session?.user?.name!)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
        {showMenu ? (
          <MdClose
            size={44}
            onClick={() => setShowMenu(false)}
            className="cursor-pointer text-blue-300"
          />
        ) : (
          <MdOutlineMenu
            size={44}
            className="text-blue-300 cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        )}
      </div>
      <CustomSheet open={showMenu} onOpenChange={setShowMenu}>
        <div className="w-full flex justify-between">
          <div className="flex-1">
            <Link href="/profile-page">
              <Avatar className="size-16">
                <AvatarFallback className="text-subtle-light bg-blue-300 font-semibold text-xl">
                  {getInitials(session?.user?.name!)}
                </AvatarFallback>
              </Avatar>

              <p className="text-xs text-gray-700">{session?.user?.name}</p>
              <p className="text-xs text-gray-400">{session?.user?.email}</p>
            </Link>
          </div>
          <div className="p-2">
            {session ? (
              <form action={logOut}>
                <Button
                  type="submit"
                  className="w-full h-10 bg-transparent text-blue-300 hover:bg-transparent hover:text-blue-300 "
                >
                  Sign Out
                </Button>
              </form>
            ) : (
              <Link
                href="/auth/sign-in"
                className="w-full flex items-center gap-[6px] justify-end p-1"
              >
                <span className="text-blue-300 text-sm font-medium">
                  Sign In
                </span>
                <MdOutlineLogin size={24} />
              </Link>
            )}
          </div>
        </div>
        <div className="w-full flex-1 justify-start items-end flex flex-col gap-6 p-1">
          <Link
            href="/"
            className={cn(
              "text-blue-300 flex items-center gap-[6px] text-lg w-full p-2 justify-end",
              {
                "font-semibold bg-blue-300 text-white rounded-md":
                  isActive("/"),
              }
            )}
            onClick={() => setShowMenu(false)}
          >
            <span>Home</span>
            <MdOutlineHome
              size={28}
              className={cn("text-blue-300", {
                "brightness-0 invert": isActive("/"),
              })}
            />
          </Link>

          <Link
            href="/listings"
            className={cn(
              "text-blue-300 flex items-center gap-[6px] text-lg w-full p-2 justify-end",
              {
                "font-semibold bg-blue-300 text-white rounded-md":
                  isActive("/listings"),
              }
            )}
            onClick={() => setShowMenu(false)}
          >
            <span>Listings</span>
            <RiListView
              size={28}
              className={cn("text-blue-300", {
                "brightness-0 invert": isActive("/listings"),
              })}
            />
          </Link>

          <Link
            href="/about-us"
            className={cn(
              "text-blue-300 flex items-center gap-[6px] text-lg w-full p-2 justify-end",
              {
                "font-semibold bg-blue-300 text-white rounded-md":
                  isActive("/about-us"),
              }
            )}
            onClick={() => setShowMenu(false)}
          >
            <span>About Us</span>
            <MdPersonOutline
              size={28}
              className={cn("text-blue-300", {
                "brightness-0 invert": isActive("/about-us"),
              })}
            />
          </Link>

          <Link
            href="/blogs"
            className={cn(
              "text-blue-300 flex items-center gap-[6px] text-lg w-full p-2 justify-end",
              {
                "font-semibold bg-blue-300 text-white rounded-md":
                  isActive("/blogs"),
              }
            )}
            onClick={() => setShowMenu(false)}
          >
            <span>Blogs</span>
            <MdChatBubbleOutline
              size={28}
              className={cn("text-blue-300", {
                "brightness-0 invert": isActive("/blogs"),
              })}
            />
          </Link>
        </div>
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
            <p className="text-[9px] font-semibold -mt-1">
              Beautiful Properties
            </p>
          </div>
        </Link>
      </CustomSheet>
    </nav>
  );
};

export default Header;
