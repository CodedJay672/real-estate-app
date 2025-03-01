"use client";

import { useRouter } from "next/navigation";

const CategoryCard = ({
  name,
  description,
  properties,
  id,
}: {
  id: string;
  name: string;
  description: string;
  properties: number;
}) => {
  const router = useRouter();

  return (
    <article
      className="w-full flex flex-col border rounded-md bg-gradient-to-br from-blue-50 to-blue-100 p-4 hover:scale-105 transition-all cursor-pointer"
      onClick={() => router.push(`details/${id}`)}
    >
      <div className="w-full">
        <h1 className="text-base font-semibold text-blue-300">{name}</h1>
        <p className="text-sm font-normal">{description}</p>
      </div>
      <div className="flex-1 place-content-end">
        <h2 className="text-xl font-thin mt-4">
          {properties > 0 ? `${properties}+ properties` : "No properties yet!"}
        </h2>
      </div>
    </article>
  );
};

export default CategoryCard;
