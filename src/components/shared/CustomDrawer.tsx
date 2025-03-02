"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { ReactNode } from "react";

const CustomDrawer = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (t: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent aria-describedby="watchlist content">
        <DrawerHeader>
          <DrawerTitle className="text-xl text-left font-bold text-gray-800">
            My Watchlist
          </DrawerTitle>
          {children}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
