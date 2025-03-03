"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "../ui/button";
import { logOut } from "@/lib/actions/auth";
import { MdOutlineHome, MdOutlineLogin, MdPersonOutline } from "react-icons/md";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { RiListView } from "react-icons/ri";

const MobileSidebar = ({
  handleShowMenu,
  session,
}: {
  handleShowMenu: (t: boolean) => void;
  session: Session | null;
}) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <div className="w-full flex flex-col items-center gap-1">
        <div className="flex-1">
          {!session?.user ? (
            <>
              <Avatar className="size-16">
                <AvatarImage src="/assets/avatar.png" />
              </Avatar>
              <p className="text-xs text-gray-400 mt-1 w-16 text-center">
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
                  {getInitials(session?.user?.name!)}
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
              className="w-full flex items-center gap-[6px] justify-end p-1"
              onClick={() => handleShowMenu(false)}
            >
              <span className="text-blue-300 text-sm font-medium">Sign In</span>
              <MdOutlineLogin size={24} className="text-blue-300" />
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
              "font-semibold bg-blue-300 text-white rounded-md": isActive("/"),
            }
          )}
          onClick={() => handleShowMenu(false)}
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
          onClick={() => handleShowMenu(false)}
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
          onClick={() => handleShowMenu(false)}
        >
          <span>About Us</span>
          <MdPersonOutline
            size={28}
            className={cn("text-blue-300", {
              "brightness-0 invert": isActive("/about-us"),
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
          <p className="text-[9px] font-semibold -mt-1">Beautiful Properties</p>
        </div>
      </Link>
    </>
  );
};

export default MobileSidebar;
