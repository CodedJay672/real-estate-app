"use client";

import { Building2, Home, ListFilter, Megaphone } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineLogin } from "react-icons/md";


import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const MobileSidebar = ({
  handleShowMenu,
}: {
  handleShowMenu: (t: boolean) => void;
}) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };


  if (status === 'loading') return null;

  return (
    <>
      <div className="w-full flex flex-col items-center gap-1">
        <div className="flex-1">
          {!session?.user ? (
            <>
              <Avatar className="size-16 mx-auto">
                <AvatarImage src="/assets/avatar.png" />
              </Avatar>
              <p className="text-sm text-dark-200 mt-1 px-3 text-center">
                Sign in to see profile
              </p>
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-1"
            >
              <Avatar className="size-16">
                <AvatarFallback className="text-primary bg-accent-bright font-semibold text-xl">
                  {session?.user?.name?.[0]}
                </AvatarFallback>
              </Avatar>

              <p className="text-xs text-gray-700">{session?.user?.name}</p>
              <p className="text-xs text-gray-400">{session?.user?.email}</p>
            </div>
          )}
        </div>
        <div className="p-2">
          {session ? (
            <Button
              type="submit"
              className="w-full h-10 bg-transparent text-primary hover:bg-transparent hover:text-light-50 shadow-none border border-primary rounded-full px-2.5"
              onClick={async () => await signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <Link
              href="/auth/sign-in"
              onClick={() => handleShowMenu(false)}
              className="w-full flex items-center gap-1.5 justify-end p-1 border border-border rounded-full px-2.5 py-1 bg-light-100 text-primary font-medium"
            >
              Sign in
              <MdOutlineLogin size={16} />
            </Link>
          )}
        </div>
      </div>

      <div className="w-full flex-1 justify-start items-end flex flex-col gap-6 p-1">
        <Link
          href="/"
          onClick={() => handleShowMenu(false)}
          className={cn(
            "text-sm flex items-center gap-1.5 w-full px-2 justify-end", isActive("/") ? "font-semibold bg-primary/10 text-primary rounded-full py-2.5" : "text-dark-50 py-1.5",
          )}
        >
          <span>Home</span>
          <Home
            size={16}
          />
        </Link>

        <Link
          href="/top-searches"
          onClick={() => handleShowMenu(false)}
          className={cn(
            "text-sm flex items-center gap-1.5 w-full px-2 justify-end", isActive("/top-searches") ? "font-semibold bg-primary/10 text-primary rounded-full py-2.5" : "text-dark-50 py-1.5",

          )}
        >
          <span>Top searches</span>
          <ListFilter
            size={16}
          />
        </Link>

        <Link
          href="/listings"
          onClick={() => handleShowMenu(false)}
          className={cn(
            "text-sm flex items-center gap-1.5 w-full px-2 justify-end", isActive("/listings") ? "font-semibold bg-primary/10 text-primary rounded-full py-2.5" : "text-dark-50 py-1.5",

          )}
        >
          <span>Listings</span>
          <ListFilter
            size={16}
          />
        </Link>

        <Link
          href="/campaign"
          onClick={() => handleShowMenu(false)}
          className={cn(
            "text-sm flex items-center gap-1.5 w-full px-2 justify-end", isActive("/campaign") ? "font-semibold bg-primary/10 text-primary rounded-full py-2.5" : "text-dark-50 py-1.5",

          )}
        >
          <span>Campaigns</span>
          <Megaphone
            size={16}
          />
        </Link>

        <Link
          href="/about-us"
          onClick={() => handleShowMenu(false)}
          className={cn(
            "text-sm flex items-center gap-1.5 w-full px-2 justify-end", isActive("/about-us") ? "font-semibold bg-primary/10 text-primary rounded-full py-2.5" : "text-dark-50 py-1.5",

          )}
        >
          <span>About Us</span>
          <Building2
            size={16}
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
          <h3 className="text-sm tracking-widest font-bold">CLEAN &</h3>
          <p className="text-sm font-semibold -mt-1">Beautiful Properties</p>
        </div>
      </Link>
    </>
  );
};

export default MobileSidebar;
