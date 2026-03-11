"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface TCustomDialog {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: (b: boolean) => void;
}

function CustomDialog(props: TCustomDialog) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>

        {props.children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog