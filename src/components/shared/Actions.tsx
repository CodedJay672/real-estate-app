"use client";

import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/auth";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import CustomAlertDialog from "./CustomAlertDialog";

const Actions = (id: string) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id);

      if (!res.success) {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: res.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full flex gap-2 items-center">
      <Link href={`admin/listings/update/${id}`} className="size-8 p-1 bg-light-50 hover:bg-green-50 flex-center rounded-full transition-colors">
        <Edit2 size={16} className="text-green-500" />
      </Link>


      <Button type="button" variant="ghost" size="sm"
        onClick={() => setShowModal(true)}
        className="size-8 bg-light-50 hover:bg-red-50 rounded-full cursor-pointer"
      >

        <Trash2
          size={16}
          className="text-red-500"
        />
      </Button>
      <CustomAlertDialog
        open={showModal}
        onOpenChange={setShowModal}
        description="Are you sure you want to delete this product?"
        action={() => handleDelete(id)}
      />
    </div>
  );
};

export default Actions;
