"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";


export default function PageHeader() {
  const pathname = usePathname();
  const [pageHeaderText, setPageHeaderText] = useState("");

  useEffect(() => {
    const activePath = pathname.split('/').pop();
    if (activePath)
      setPageHeaderText(activePath);
  }, [pathname]);

  if (!pageHeaderText) return <div className="w-52 h-8 bg-light-100 rounded-xl animate-pulse" />


  return (
    <div className="flex items-center gap-2">
      <div className="size-8 overflow-hidden rounded-md md:hidden">
        <Logo />
      </div>
      <h1 className='text-lg md:text-xl text-primary font-bold first-letter:capitalize'>{pageHeaderText === 'admin' ? "Dashboard" : pageHeaderText}</h1>
    </div>
  )
}
