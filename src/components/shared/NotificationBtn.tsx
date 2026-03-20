"use client";

import { Bell, Dot, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

import { toast } from "@/hooks/use-toast";
import { readNotification } from "@/lib/actions/notifications.actions";
import { cn, generateErrorMessage } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface NotificationBtnProps {
  getNotifs: Promise<ApiResponse<TNotificationResponse[]>>
}

export default function NotificationBtn({ getNotifs }: NotificationBtnProps) {
  const router = useRouter();
  const messageId = useSearchParams().get('messageId');

  const notifs = use(getNotifs);
  if (!notifs.success) return null;

  const handleClick = async ({ id, url, isRead }: { id: string, url: string | null, isRead: boolean | null }) => {
    if (!id || messageId === id) return;

    try {
      if (!isRead) {
        const response = await readNotification(id);
        if (!response.success) {
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive"
          })
          return;
        }

        toast({
          title: 'Success.',
          description: response.message
        })
      }

      if (url)
        router.push(url);
    } catch (error) {
      toast({
        title: 'Error',
        description: generateErrorMessage(error)
      })
    }
  };

  const hasUnreadNotifs = notifs.data?.some(d => !d.isRead);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="size-5 p-0.5 rounded-full cursor-pointer flex-center relative">
          <Bell size={24} />
          {hasUnreadNotifs && (
            <div className="size-2 bg-red-500 rounded-full absolute -top-0.5 right-0" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={20} className="w-full md:w-md">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {notifs.data && notifs.data.length > 0 ? notifs.data?.map((n) => (
            <DropdownMenuItem key={n.id} onClick={() => handleClick({ id: n.id, url: n.url, isRead: n.isRead })} className={cn("w-full flex gap-2 cursor-pointer overflow-hidden", n.isRead ? "text-light-100" : "text-dark-100")}>
              {n.type === 'enquiries' && (
                <div className="size-10 p-1 rounded-full bg-light-100/20 shrink-0 flex-center">
                  <Mail size={22} />
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-semibold truncate">{n.title}</p>
                <p className="text-sm text-light-200 truncate first-letter:capitalize">{n.content}</p>
              </div>

              {n.url && (
                <div className="size-10 p-1 rounded-full shrink-0 flex-center">
                  <Dot className={cn("size-8", n.isRead ? "text-light-100" : "text-blue-500")} />
                </div>
              )}
            </DropdownMenuItem>
          )) : (
            <DropdownMenuItem className="text-center text-light-100 hover:bg-transparent">No notifications yet.</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
