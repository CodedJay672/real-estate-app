import Back from "@/components/shared/Back";
import ProductForm from "@/components/forms/ProductForm";
import { getProductById } from "@/lib/actions/auth";
import React from "react";

const AddProducts = async ({
  params,
}: {
  params: Promise<{ info: string[] }>;
}) => {
  const { info } = await params;
  let product;

  const type = info[0];
  const id = info[1];

  const response = await getProductById(id);

  if (response.success) {
    product = response.data;
  }

  return (
    <section className="wrapper mb-14 md:mb-0">
      <h2 className="text-lg md:text-xl font-semibold">
        {!response.success ? "Add new" : "Update"} product
      </h2>
      <div className="w-full flex mt-10 mb-4">
        <Back />
      </div>
      <small className="bg-blue-50 text-xs p-2 rounded-md block border-l-8 border-blue-100">
        {!response.success ? "Fill in" : "Update"} the details of the product
        below
      </small>
      <section className="mt-10 shadow-md p-4 rounded-lg bg-subtle-light">
        <h3 className="text-lg font-semibold mb-2">
          {!response.success ? "Enter" : "Update"} product details
        </h3>
        <ProductForm type={type} id={id} category="land" />
      </section>
    </section>
  );
};

export default AddProducts;
