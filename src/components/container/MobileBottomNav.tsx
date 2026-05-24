"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Building2, Phone } from "lucide-react";

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Listings", href: "/listings", icon: Building2 },
    { name: "Contact", href: "https://wa.link/a0m76f", icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 sm:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group transition-all ${
                isActive ? "text-amber-500" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span className={`text-[10px] ${isActive ? "font-semibold" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
