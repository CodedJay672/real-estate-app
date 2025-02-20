"use client";

import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/auth";
import { useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import CustomAlertDialog from "./CustomAlertDialog";
import Link from "next/link";

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
    <div className="w-full flex gap-6 items-center">
      <Link href={`admin/listings/update/${id}`}>
        <MdOutlineEdit size={16} className="cursor-pointer" />
      </Link>
      <MdOutlineDelete
        size={16}
        className="cursor-pointer"
        onClick={() => setShowModal(true)}
      />
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
