import { Suspense } from "react";

import Back from "@/components/shared/Back";
import ProductForm from "@/components/forms/ProductForm";
import { getAllAdminCategories } from "@/lib/data/category.data";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getAdminProductById } from "@/lib/data/products.data";

const AddProducts = async ({
  searchParams,
}: {
  searchParams: Promise<{ productId: string; }>;
}) => {
  const { productId } = await searchParams;


  // get the product and category in parallel
  const productRequest = getAdminProductById(productId);
  const categoriesRequest = getAllAdminCategories();


  return (
    <section className="wrapper mb-14 md:mb-0">
      <div className="w-full max-w-(--breakpoint-md) space-y-6">
        <div className="w-full flex">
          <Back />

          <div>
            <h2 className="text-lg md:text-xl font-semibold">
              {!productId ? "Add new" : "Update"} product
            </h2>
            <p>{!productId ? 'Please enter all the products details in the form below.' : "Change any product information and save to update the product details."}</p>
          </div>
        </div>

        <div className="mt-10 shadow-md p-4 rounded-lg bg-subtle-light max-w-(--breakpoint-md)">
          <h3 className="text-lg font-semibold mb-2">
            {!productId ? "Enter" : "Update"} product details
          </h3>

          <Suspense fallback={<LoadingSpinner />}>
            <ProductForm
              productId={productId}
              type={productId ? 'update' : "add-new"}
              product={productRequest}
              categories={categoriesRequest}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
