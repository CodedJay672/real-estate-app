"use client";

import { useContext } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSession } from 'next-auth/react'

import GlobalContext from "@/context/GlobalContext";
import { getInitials } from "@/lib/utils";
import CustomSheet from "../shared/CustomSheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  const globalContext = useContext(GlobalContext);
  const { showMenu, setShowMenu } = globalContext;
  const { data: session, status } = useSession()

  if (status === "loading") return <div className="w-5 h-5 md:w-10 rounded-lg bg-dark-50 animate-pulse" />

  return (
    <>
      {session ? (
        <Avatar className="w-6 h-6 hidden md:flex cursor-pointer">
          <AvatarFallback>
            {getInitials(session?.user?.name!)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Link href="/auth/sign-in" className="p-2 text-sm md:text-base bg-accent-bright text-primary rounded-lg text-center">Join our community</Link>
      )}

      {/** Mobile Menu */}
      <div className="flex items-center gap-2 md:hidden">
        {session && (
          <Avatar className="size-10">
            <AvatarFallback className="text-subtle-light bg-blue-300 font-semibold text-sm md:text-base">
              {getInitials(session?.user?.name!)}
            </AvatarFallback>
          </Avatar>
        )}
        {showMenu ? (
          <X
            size={32}
            onClick={() => setShowMenu(false)}
            className="cursor-pointer text-blue-300"
          />
        ) : (
          <Menu
            size={32}
            className="text-blue-300 cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        )}
      </div>

      <CustomSheet open={showMenu} onOpenChange={setShowMenu}>
        <MobileSidebar handleShowMenu={setShowMenu} session={session} />
      </CustomSheet>
    </>
  );
};

export default Header;
