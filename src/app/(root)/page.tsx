import { Suspense } from "react";

import FAQ from "@/components/container/FAQ";
import FeaturedListings from "@/components/container/FeaturedListings";
import Herosection from "@/components/container/HeroSection";
import PropertyCardSkeleton from "@/components/container/PropertyCardSkeleton";
import SpecialOffers from "@/components/container/SpecialOffers";
import Testimonials from "@/components/container/Testimonials";
import TopSearchedProperties from "@/components/container/TopSearchedProperties";



export default async function Home() {
  return (
    <section className="w-full">
      <Herosection />

      <Suspense fallback={<Loader />}>
        <SpecialOffers />
      </Suspense>

      <Suspense>
        <TopSearchedProperties />
      </Suspense>

      <FeaturedListings />
      <Testimonials />
      <FAQ />
    </section>
  );
}


function Loader() {
  return (
    <div className="flex gap-3 mt-6">
      {new Array(4).map((_, idx) => (
        <PropertyCardSkeleton />
      ))}
    </div>
  )
}