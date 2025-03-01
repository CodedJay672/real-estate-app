"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { MdCategory, MdDashboard, MdList } from "react-icons/md";
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

const Sidebar = ({ fullName, email }: Partial<Props>) => {
  const pathname = usePathname();

  return (
    <nav className="w-full md:w-16 md:h-screen lg:w-64 bg-blue-50 border-r border-gray-200 flex flex-row md:flex-col justify-between items-center p-2 md:pt-4 md:pb-2 fixed md:sticky bottom-0 md:top-0 z-10">
      <Link
        href="/"
        className="p-2 flex justify-center lg:w-full lg:justify-start items-center"
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
      <ul className="md:mt-10 p-1 space-x-6 md:space-x-0 md:space-y-4 flex flex-row md:flex-col justify-center md:justify-start items-center md:items-start md:w-full md:flex-1">
        <li className="w-full">
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
        <li className="w-full">
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
        <li className="w-full">
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
        <li className="w-full">
          <Link
            href="/admin/categories"
            className={cn(
              "w-full text-blue-300 p-2 flex justify-center items-center lg:justify-start lg:items-start gap-1 rounded-md hover:bg-slate-200 cursor-pointer",
              {
                "text-subtle-light bg-blue-300 hover:text-white hover:bg-blue-300":
                  pathname.includes("/categories"),
              }
            )}
          >
            <MdCategory
              size={24}
              className={cn("text-blue-300", {
                "brightness-0 invert": pathname.includes("/categories"),
              })}
            />
            <span className="hidden lg:inline-block">Categories</span>
          </Link>
        </li>
      </ul>

      <div className="lg:w-full border rounded-full flex items-center lg:pl-2">
        <Avatar>
          <AvatarFallback className="bg-gray-100">
            {getInitials(fullName as string)}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <p className="text-sm font-semibold hidden lg:block">{fullName}</p>
          <p className="text-xs font-thin hidden lg:block">{email}</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
