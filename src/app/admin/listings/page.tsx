import Back from "@/components/shared/Back";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Listings = () => {
  return (
    <section className="flex-1 p-6">
      <div className="w-full lg:max-w-screen-md">
        <h1 className="text-xl font-semibold">Product listings</h1>

        <div className="w-full flex justify-between items-center mt-10">
          <Back />
          <Link
            href="/admin/listings/add-new"
            className="bg-blue-300 text-subtle-light inline-block px-4 py-2 rounded-md"
          >
            Add Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Listings;
