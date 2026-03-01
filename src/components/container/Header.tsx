"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSession } from 'next-auth/react'

import CustomSheet from "../shared/CustomSheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import MobileSidebar from "./MobileSidebar";
import { Button } from "../ui/button";

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Avatar className="w-6 h-6 hidden md:flex cursor-pointer">
          <AvatarFallback>
            {session?.user?.name?.[0]}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Link href="/auth/become-a-member" className="py-2 px-3 text-sm bg-accent-bright text-primary rounded-lg text-center  hover:opacity-95 transition-colors font-bold">Join Us</Link>
      )}

      {/** Mobile Menu */}
      <div className="flex items-center gap-2 md:hidden">
        {session && (
          <Avatar className="size-10">
            <AvatarFallback className="text-subtle-light bg-blue-300 font-semibold text-sm md:text-base">
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
          <Button type="button" size="icon" variant="ghost"
            onClick={() => setShowMenu(true)}
            className="text-light-50 border-2 border-border"
          >
            <Menu
              size={32}
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
