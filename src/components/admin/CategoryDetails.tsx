import { File, FolderOpen } from "lucide-react";

import { getAllAdminCategories, getCategoryWithProducts } from "@/lib/data/category.data";
import { Suspense } from "react";
import AdminListing from "../container/AdminListing";
import LoadingSpinner from "../shared/LoadingSpinner";
import { DataTable } from "../table/DataTable";
import { categoryProductsColumns } from "../table/listings/definition";
import CreateProductInCategory from "./CreateProductInCategory";
import ManageCategoryAction from "./ManageCategoryAction";

async function CategoryDetails({ catId }: { catId: string }) {
  const categoryInfo = await getCategoryWithProducts(catId);
  if (!categoryInfo.success || !categoryInfo.data) return (
    <div className="w-full h-[50vh] flex-center flex-col gap-1">
      <File size={64} className='text-light-200' />
      <h3 className="text-base text-center font-semibold">No category found.</h3>
      <p className='w-full max-w-xl text-sm md:text-base text-light-200 text-center'>Something went wrong. It might be a technical issue we are trying to fix. Please refresh the page.</p>
    </div>
  )

  const { products, ...others } = categoryInfo.data;

  // fetch categories in server component
  const categories = getAllAdminCategories();

  return (
    <div className="w-full md:p-3 space-y-3">
      <div className="w-full flex justify-between">
        <div>
          <h2 className="text-base md:text-lg text-dark-200 font-semibold">{others.name}</h2>
          <p className="text-sm md:text-base text-dark-50">{others.description ?? 'No category description'}</p>
        </div>

        <ManageCategoryAction data={others} />
      </div>

      {products.length > 0 ? (
        <>
          <hr className="border-border" />

          <div className="w-full space-y-1.5 md:space-y-0.5">
            <div className="w-full flex-between gap-3">
              <h3>Properties: ({products.length})</h3>
              <Suspense fallback={<LoadingSpinner />}>
                <CreateProductInCategory defaultCatId={catId} getCategories={categories} />
              </Suspense>
            </div>
            <div className="hidden md:flex">
              <DataTable columns={categoryProductsColumns} data={products} />
            </div>

            <div className="md:hidden space-y-1">
              {products.map(product => (
                <AdminListing key={product.id} {...product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-[50vh] flex-center flex-col">
          <FolderOpen size={44} className="text-light-200" />
          <p className="w-full max-w-xl text-light-200 text-center">No products in this category yet.</p>
          {/* <CreateProductInCategory catInfo={others} /> */}
        </div>
      )}
    </div>
  )
}

export default CategoryDetails