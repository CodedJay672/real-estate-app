"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Building2, Phone, BookOpen } from "lucide-react";

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Listings", href: "/listings", icon: Building2 },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "https://wa.link/a0m76f", icon: Phone },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden pointer-events-none">
      <div className="bg-[#0f172a]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] rounded-full h-[4.5rem] px-2 flex items-center justify-between mx-auto max-w-[24rem] pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-1/5 h-full group transition-all duration-300 ${
                isActive ? "text-[#f5c344]" : "text-slate-400 hover:text-white"
              }`}
            >
              <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-0.5'}`}>
                <Icon
                  className="w-[22px] h-[22px] mb-1"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-linear-to-r from-[#f5c344] to-[#b88f3a] rounded-full shadow-[0_0_8px_rgba(245,195,68,0.8)]" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
