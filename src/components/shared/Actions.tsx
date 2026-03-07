"use client";

import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/auth";
import { Edit2, Eye, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import CustomAlertDialog from "./CustomAlertDialog";

interface ProductActionsProps {
  data: (listings & {
    category: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      description: string;
    } | null;
  })
}

const ProductActions = ({ data }: ProductActionsProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, startDeleting] = useTransition();

  const handleDelete = () => {
    //close the modal
    setShowModal(false);

    startDeleting(async () => {
      try {
        const res = await deleteProduct(data.id);

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
    })
  };

  return (

    <div className="w-full flex gap-2 items-center">
      <Link href={{
        pathname: '/admin/listings/add-new',
        query: {
          productId: data.id
        }
      }} className="size-8 p-1 bg-light-50 hover:bg-green-50 flex-center rounded-full transition-colors">
        <Edit2 size={16} className="text-green-500" />
      </Link>

      <Button type="button" variant="ghost" size="sm"
        disabled={isDeleting}
        className="size-8 bg-light-50 hover:bg-blue-50 rounded-full cursor-pointer"
      >
        <Eye size={16} className="text-blue-500" />
      </Button>

      <Button type="button" variant="ghost" size="sm"
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className="size-8 bg-light-50 hover:bg-red-50 rounded-full cursor-pointer"
      >
        {isDeleting ? (<Loader size={16} color="red" className="animate-spin" />) : (
          <Trash2
            size={16}
            className="text-red-500"
          />
        )}
      </Button>


      <CustomAlertDialog
        open={showModal}
        onOpenChange={setShowModal}
        description="Are you sure you want to delete this product?"
        action={handleDelete}
      />
    </div>
  );
};

export default ProductActions;
