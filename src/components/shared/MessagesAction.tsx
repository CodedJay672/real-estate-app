import { Eye, Trash2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import CustomDialog from "./CustomDialog";
import { toast } from "@/hooks/use-toast";
import { generateErrorMessage } from "@/lib/utils";
import { deleteMessage } from "@/lib/actions/messages.actions";
import { useState } from "react";
import CustomAlertDialog from "./CustomAlertDialog";

export function MessagesAction(data: TMessageResponse) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const pathname = usePathname()
  const params = useSearchParams()
  const messageId = params.get('messageId');


  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessage(data.id);
      if (!response.success) {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive'
        })
        return;
      }

      toast({ title: 'Success', description: response.message });
    } catch (error) {
      toast({
        title: "Error",
        description: generateErrorMessage(error)
      })
    }
  }

  const handleToggleDialog = () => {
    const searchQuery = new URLSearchParams(params);

    if (!messageId) searchQuery.set('messageId', data.id)
    else searchQuery.delete('messageId');

    history.replaceState(null, "", `${pathname}?${searchQuery.toString()}`);
  }

  return (
    <>
      <div className="w-full flex items-center gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={handleToggleDialog} className="bg-blue-50 rounded-full">
          <Eye size={16} className="text-blue-500" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowDeleteModal(true)} className="bg-red-50 rounded-full">
          <Trash2 size={16} className="text-red-500" />
        </Button>
      </div>

      <CustomDialog open={messageId === data.id} onOpenChange={handleToggleDialog} title="Enquiry message" description="Users enquiries should be attended to as soon as possible">
        <div className="w-full max-h-[60vh] md:max-h-[80vh] overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-dark-50">Name</p>
              <p className="text-base text-gray-900">{data.senderName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-dark-50">Email</p>
              <p className="text-base text-gray-900">{data.senderEmail}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-dark-50">Message</p>
              <p className="text-base text-gray-900 mt-2 leading-relaxed">{data.message}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button onClick={handleToggleDialog} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Close
            </Button>
          </div>
        </div>
      </CustomDialog>

      <CustomAlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal} description="Are you sure you want to delete this messgae?" action={handleDeleteMessage} />
    </>
  )
}
