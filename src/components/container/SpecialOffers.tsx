import { properties } from "@/constants";
import React from "react";
import PropertyCard from "./PropertyCard";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { productsTable } from "@/db/schema";

const SpecialOffers = async () => {
  const session = await auth();

  const products = await db.select().from(productsTable);

  return (
    <section className="w-full px-4 py-8">
      <h2 className="text-2xl lg:text-2xl font-bold mb-8">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8 md:gap-4">
        {products ? (
          products.map((property) => (
            <PropertyCard key={property.id} {...property} session={session} />
          ))
        ) : (
          <p className="text-blue-100 text-center font-semibold">
            No products available
          </p>
        )}
      </div>
    </section>
  );
};

export default SpecialOffers;
