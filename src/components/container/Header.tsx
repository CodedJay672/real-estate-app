"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'

import CustomSheet from "../shared/CustomSheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import MobileSidebar from "./MobileSidebar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-6 h-6 hidden md:flex cursor-pointer">
              <AvatarFallback className="text-primary bg-accent-bright font-semibold text-sm">
                {session?.user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" alignOffset={20} className="bg-light-50 border-border">
            <DropdownMenuItem onClick={async () => await signOut()} className="text-red-500 cursor-pointer hover:bg-red-50 hover:text-red-500">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-up" className="py-2 px-3 text-sm bg-accent-bright text-primary rounded-lg text-center  hover:opacity-95 transition-colors font-bold">Join Us</Link>
      )}

      {/** Mobile Menu */}
      <div className="flex-center gap-2 md:hidden">
        {session && (
          <Avatar className="size-9.5 flex-center">
            <AvatarFallback className="text-primary bg-accent-bright font-semibold text-sm md:text-base">
              {session?.user?.name?.[0]}
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
          <Button type="button" size="icon" variant="outline"
            onClick={() => setShowMenu(true)}
            className="bg-light-50 border-2 border-border text-dark-200"
          >
            <Menu
            />
          </Button>
        )}
      </div>

      <CustomSheet open={showMenu} onOpenChange={setShowMenu}>
        <MobileSidebar handleShowMenu={setShowMenu} />
      </CustomSheet>
    </>
  );
};

export default Header;
