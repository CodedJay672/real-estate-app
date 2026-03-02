"use client";

import { logOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { Building2, Home, ListFilter } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineLogin } from "react-icons/md";
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
            <Link
              href="/profile-page"
              className="flex flex-col items-center justify-center gap-1"
            >
              <Avatar className="size-16">
                <AvatarFallback className="text-subtle-light bg-blue-300 font-semibold text-xl">
                  {session?.user?.name?.[0]}
                </AvatarFallback>
              </Avatar>

              <p className="text-xs text-gray-700">{session?.user?.name}</p>
              <p className="text-xs text-gray-400">{session?.user?.email}</p>
            </Link>
          )}
        </div>
        <div className="p-2">
          {session ? (
            <form action={logOut}>
              <Button
                type="submit"
                className="w-full h-10 bg-transparent text-blue-300 hover:bg-transparent hover:text-blue-300 "
                onClick={() => handleShowMenu(false)}
              >
                Sign Out
              </Button>
            </form>
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
