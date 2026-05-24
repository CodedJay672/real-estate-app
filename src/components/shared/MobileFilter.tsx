"use client";

import { Suspense, useState } from "react";
import { Filter } from "lucide-react";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import LoadingSpinner from "./LoadingSpinner";
import GroupFilter from "../container/GroupFilter";

interface MobileFilterProps {
  categories: Promise<ApiResponse<{
    id: string;
    name: string;
  }[]>>
}

function MobileFilter({ categories }: MobileFilterProps) {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger className="flex-center gap-1">
        <Filter size={16} className="text-dark-50" />
        Filter
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left">Filter searches</DrawerTitle>
          <DrawerDescription className="text-left">Apply filters to easily find what you are looking for.</DrawerDescription>
        </DrawerHeader>
        <Suspense fallback={<LoadingSpinner />}>
          <GroupFilter getCategories={categories} callbackFn={() => setOpenDrawer(false)} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileFilter