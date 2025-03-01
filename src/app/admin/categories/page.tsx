import CategoryCard from "@/components/shared/CategoryCard";
import { Input } from "@/components/ui/input";
import { getAllCategoriesWithProducts } from "@/lib/actions/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { RiAddLine } from "react-icons/ri";

const Categories = async () => {
  const categories = await getAllCategoriesWithProducts();

  if (!categories.success) {
    return notFound();
  }

  const { data } = categories;

  return (
    <section className="wrapper">
      <div className="w-full lg:max-w-screen-md mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-blue-300">
          Categories
        </h1>
        <p className="text-sm lg:text-base font-normal text-blue-300">
          Create new and manage existing categores.
        </p>
      </div>

      <div className="w-full flex gap-4 overflow-x-scroll no-scrollbar">
        {data &&
          data.map((category) => (
            <div className="flex-center flex-col gap-2" key={category?.id}>
              <Link
                href={`categories/add-product/${category?.id}`}
                className="flex-center size-16 overflow-hidden flex-col rounded-full border border-blue-200 shrink-0 hover:bg-gray-200 hover:text-gray-700 transition-all gap-2"
              >
                <RiAddLine size={20} className="text-blue-300" />
              </Link>
              <span className="text-sm md:text-sm text-blue-300 font-thin truncate">
                {category?.name}
              </span>
            </div>
          ))}
        <Link
          href="categories/create-new"
          className="flex-center size-16 flex-col rounded-full border border-blue-200 shrink-0 hover:bg-gray-200 hover:text-gray-700 gap-2"
        >
          <RiAddLine size={20} className="text-blue-300" />
        </Link>
      </div>

      <div className="w-full mt-4">
        <div className="w-full flex-between gap-4">
          <h1 className="text-base font-semibold min-w-max">All Categories</h1>
          <Input
            type="search"
            placeholder="Search categories..."
            className="w-full lg:w-1/2 text-base placeholder:text-base"
          />
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {data && data.length > 0 ? (
            data.map((item) => (
              <CategoryCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                properties={item.products.length}
              />
            ))
          ) : (
            <p className="text-sm font-light text-gray-300">
              All your categories appear here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
