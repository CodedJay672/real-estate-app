import React, { ReactNode } from "react";
import { Sheet, SheetContent, SheetOverlay, SheetTitle } from "../ui/sheet";

const CustomSheet = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetOverlay className="bg-gray-900 bg-opacity-20">
        <SheetContent
          aria-describedby="modal-description"
          className="flex flex-col justify-center items-center gap-10 0t-6"
        >
          <SheetTitle hidden>Menu</SheetTitle>
          {children}
        </SheetContent>
      </SheetOverlay>
    </Sheet>
  );
};

export default CustomSheet;
