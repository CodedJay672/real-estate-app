import { properties } from "@/constants";
import React from "react";
import PropertyCard from "./PropertyCard";
import { auth } from "@/auth";

const SpecialOffers = async () => {
  const session = await auth();

  return (
    <section className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8 md:gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} session={session} />
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
