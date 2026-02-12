"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MdBookmarkAdd, MdClose, MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import { Session } from "next-auth";
import { cn, getInitials } from "@/lib/utils";
import { logOut } from "@/lib/actions/auth";
import CustomSheet from "../shared/CustomSheet";
import CustomDrawer from "../shared/CustomDrawer";
import Watchlist from "../shared/Watchlist";
import MobileSidebar from "./MobileSidebar";
import GlobalContext from "@/context/GlobalContext";

const Header = ({ session }: { session: Session | null }) => {
  const globalContext = useContext(GlobalContext);

  const { openWishlist, setOpenWishlist, showMenu, setShowMenu } =
    globalContext;

  return (
    <>
      <div className="flex items-center gap-2">
        {session ? (
          <div className="flex-center rounded-full cursor-pointer gap-2">
            <div
              className={cn("flex-center flex-col p-2", {
                "bg-gray-300 rounded-full": openWishlist,
              })}
              onClick={() => setOpenWishlist(true)}
            >
              <MdBookmarkAdd
                size={20}
                className={cn("size-6", {
                  "font-bold text-blue-300": openWishlist,
                })}
              />
            </div>
            <div
              className="hidden w-28 h-10 p-1 rounded-full border border-blue-200 md:flex items-center gap-1 cursor-pointer"
              onClick={logOut}
            >
              <Avatar className="w-6 h-6">
                <AvatarFallback>
                  {getInitials(session?.user?.name!)}
                </AvatarFallback>
              </Avatar>
              <span className="text-blue-300 font-medium">Logout</span>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-[6px] items-center">
            <Link href="/auth/sign-in">Sign in </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-300 p-1 text-subtle-light rounded-md px-2"
            >
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
              size={32}
              onClick={() => setShowMenu(false)}
              className="cursor-pointer text-blue-300"
            />
          ) : (
            <MdOutlineMenu
              size={32}
              className="text-blue-300 cursor-pointer"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </div>
      <CustomSheet open={showMenu} onOpenChange={setShowMenu}>
        <MobileSidebar handleShowMenu={setShowMenu} session={session} />
      </CustomSheet>
      <CustomDrawer open={openWishlist} onOpenChange={setOpenWishlist}>
        <Watchlist session={session} />
      </CustomDrawer>
    </>
  );
};

export default Header;
