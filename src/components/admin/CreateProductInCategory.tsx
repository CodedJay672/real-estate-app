'use client'

import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { use, useState } from "react"
import CustomDialog from "../shared/CustomDialog";
import ProductForm from "../forms/ProductForm";


function CreateProductInCategory({ defaultCatId, getCategories }: {
  defaultCatId: string;
  getCategories: Promise<ApiResponse<categoryResponse[]>>
}) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setShowAddProductModal(true)} className="text-xs text-light-50 bg-primary hover:bg-primary hover:text-light-50 cursor-pointer">
        <Plus /> <span className="hidden md:inline-block">Add product</span>
      </Button>


      <CustomDialog open={showAddProductModal} onOpenChange={setShowAddProductModal} title="Add a product" description="Add a new product to this category.">
        <div className="w-full h-max max-h-[80vh] overflow-y-auto space-y-2 no-scrollbar p-0.5">
          <ProductForm categories={getCategories} defaultCategoryId={defaultCatId} type="add-new" callbackFn={() => setShowAddProductModal(false)} />
        </div>
      </CustomDialog>
    </>
  )
}

export default CreateProductInCategory