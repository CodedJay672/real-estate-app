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
      className="w-full border rounded-md bg-gradient-to-br from-blue-50 to-blue-100 p-4 hover:scale-105 transition-all cursor-pointer"
      onClick={() => router.push(`details/${id}`)}
    >
      <h1 className="text-base font-semibold text-blue-300">{name}</h1>
      <p className="text-sm font-normal">{description}</p>
      <h2 className="text-xl font-bold mt-4">
        {properties > 0 ? `${properties}+ properties` : "No properties yet!"}
      </h2>
    </article>
  );
};

export default CategoryCard;
