import { getAllCategories } from "@/lib/actions/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiAddLine } from "react-icons/ri";

const Categories = async () => {
  const categories = await getAllCategories();

  if (!categories.success) {
    return notFound();
  }

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

      <div className="w-full flex gap-2 overflow-x-scroll no-scrollbar">
        {categories.data &&
          categories.data.map((category) => (
            <Link
              key={category?.id}
              href={`categories/add-product/${category?.id}`}
              className="flex-center size-16 flex-col rounded-full border border-blue-200 shrink-0 hover:bg-gray-200 hover:text-gray-700 transition-all"
            >
              <RiAddLine size={20} className="text-blue-300" />
              <span className="text-[8px] md:text-base text-blue-300 font-thin">
                {category?.name}
              </span>
            </Link>
          ))}
        <Link
          href="categories/create-new"
          className="flex-center size-16 flex-col rounded-full border border-blue-200 shrink-0 hover:bg-gray-200 hover:text-gray-700"
        >
          <RiAddLine size={20} className="text-blue-300" />
          <span className="text-[8px] md:text-base text-blue-300 font-thin">
            New
          </span>
        </Link>
      </div>

      <div className="w-full mt-4 flex-center flex-col gap-4">
        {categories.data && categories.data.length > 0 ? (
          <div></div>
        ) : (
          <p className="text-blue-100 text-center font-thin text-sm">
            Create a category
          </p>
        )}
      </div>
    </section>
  );
};

export default Categories;
