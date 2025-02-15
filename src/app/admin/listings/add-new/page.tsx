import Back from "@/components/shared/Back";
import ProductForm from "@/components/shared/ProductForm";
import React from "react";

const AddProducts = () => {
  return (
    <section className="p-6 flex-1; max-w-screen-md">
      <h2 className="text-xl font-semibold">Add new product</h2>
      <div className="w-full flex mt-10 mb-4">
        <Back />
      </div>
      <small className="bg-blue-50 text-xs p-2 rounded-md block border-l-8 border-blue-100">
        Fill in the details of the product
      </small>

      <section className="mt-10 shadow-lg border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Enter product details</h3>
        <ProductForm />
      </section>
    </section>
  );
};

export default AddProducts;
