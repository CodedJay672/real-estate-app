"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { MdDashboard, MdList } from "react-icons/md";
import { RiUser2Line } from "react-icons/ri";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
}

const Sidebar = ({ fullName }: Partial<Props>) => {
  const pathname = usePathname();

  return (
    <nav className="w-14 lg:w-64 h-screen bg-blue-50 border-r border-gray-200 flex flex-col justify-between items-center pt-4 pb-2 sticky left-0 top-0">
      <Link
        href="/"
        className="p-2 w-full rounded-full flex justify-center lg:justify-start items-center"
      >
        <Image
          src="/assets/logo.png"
          alt="clean beautiful properties"
          width={32}
          height={32}
          className="object cover"
        />
        <div className="text-blue-300 hidden lg:block">
          <h3 className="text-[18px] tracking-widest font-bold">CLEAN &</h3>
          <p className="text-[9px] font-semibold -mt-1">Beautiful Properties</p>
        </div>
      </Link>
      <ul className="flex-1 mt-10 w-full p-1 space-y-3">
        <li className="">
          <Link
            href="/admin"
            className={cn(
              "w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-md hover:bg-slate-200 cursor-pointer",
              {
                "text-subtle-light bg-blue-300 hover:text-white hover:bg-blue-300":
                  pathname === "/admin",
              }
            )}
          >
            <MdDashboard
              size={24}
              className={cn("text-blue-300", {
                "brightness-0 invert": pathname === "/admin",
              })}
            />
            <span className="hidden lg:inline-block">Dashboard</span>
          </Link>
        </li>
        <li className="">
          <Link
            href="/admin/listings"
            className={cn(
              "w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-md hover:bg-slate-200 cursor-pointer",
              {
                "text-subtle-light bg-blue-300 hover:text-white hover:bg-blue-300":
                  pathname.includes("/listings"),
              }
            )}
          >
            <MdList
              size={24}
              className={cn("text-blue-300", {
                "brightness-0 invert": pathname.includes("/listing"),
              })}
            />
            <span className="hidden lg:inline-block">Listings</span>
          </Link>
        </li>
        <li className="">
          <Link
            href="/admin/users"
            className={cn(
              "w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-md hover:bg-slate-200 cursor-pointer",
              {
                "text-subtle-light bg-blue-300 hover:text-white hover:bg-blue-300":
                  pathname.includes("/user"),
              }
            )}
          >
            <RiUser2Line
              size={24}
              className={cn("text-blue-300", {
                "brightness-0 invert": pathname.includes("/users"),
              })}
            />
            <span className="hidden lg:inline-block">Users</span>
          </Link>
        </li>
      </ul>

      <div className="lg:w-full border rounded-full flex items-center lg:pl-2">
        <Avatar>
          <AvatarFallback className="bg-gray-100">
            {getInitials(fullName as string)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-semibold ml-1 hidden lg:inline-block">
          {fullName}
        </span>
      </div>
    </nav>
  );
};

export default Sidebar;
