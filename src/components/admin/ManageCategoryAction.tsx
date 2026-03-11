"use client";

import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Edit2, Menu, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState, useTransition } from "react";
import { deleteCategoryById } from "@/lib/actions/category.actions";
import { toast } from "@/hooks/use-toast";
import CustomAlertDialog from "../shared/CustomAlertDialog";
import CustomDialog from "../shared/CustomDialog";
import CategoriesForm from "../forms/CategoriesForm";


function ManageCategoryAction({ data }: { data: categoryResponse }) {
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [isDeleting, startDeleting] = useTransition();

  const handleDelete = () => {
    //close the modal
    setshowDeleteModal(false);

    startDeleting(async () => {
      try {
        const res = await deleteCategoryById(data.id);
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
    <>
      <div className="hidden md:flex items-center gap-2">
        <Button type="button" variant="outline" onClick={() => setshowEditModal(true)} className="text-light-50 bg-green-500 hover:bg-green-600 hover:text-light-50 cursor-pointer">
          Edit
        </Button>
        <Button type="button" variant="outline" disabled={isDeleting} onClick={() => setshowDeleteModal(true)} className="text-light-50 bg-red-500 hover:bg-red-600 hover:text-light-50 cursor-pointer">
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <Menu size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 bg-light-50 z-2 shadow-md">
          <DropdownMenuItem onClick={() => setshowEditModal(true)}>Edit <Edit2 color="green" className="ml-auto" /></DropdownMenuItem>
          <DropdownMenuItem onClick={() => setshowDeleteModal(true)} className="text-red-500 bg-red-50">Delete <Trash2 color="red" className="ml-auto" /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomDialog open={showEditModal} onOpenChange={setshowEditModal} title={`Edit ${data.name}`} description="Update any information and save changes.">
        <div className="w-full max-h-[80vh] overflow-y-auto space-y-3 p-0.5">
          <CategoriesForm default={{ name: data.name, description: data.description }} cb={() => setshowEditModal(false)} />
        </div>
      </CustomDialog>

      <CustomAlertDialog
        open={showDeleteModal}
        onOpenChange={setshowDeleteModal}
        description="Are you sure you want to delete this category?"
        action={handleDelete}
      />
    </>
  )
}

export default ManageCategoryAction