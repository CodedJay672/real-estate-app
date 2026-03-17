"use client";

import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function NotificationBtn() {
  const notifs: unknown[] = [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="size-5 p-0.5 rounded-full cursor-pointer flex-center relative">
          <Bell size={24} />
          {notifs.length > 0 && (
            <div className="size-2 bg-red-500 rounded-full absolute -top-0.5 right-0" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={20} className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {notifs.length > 0 ? notifs?.map((n, idx) => (
            <DropdownMenuItem key={idx}>N</DropdownMenuItem>
          )) : (
            <DropdownMenuItem className="text-center text-light-100 hover:bg-transparent">No notifications yet.</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
