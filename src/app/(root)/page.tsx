import { Suspense } from "react";

import FAQ from "@/components/container/FAQ";
import FeaturedListings from "@/components/container/FeaturedListings";
import Herosection from "@/components/container/HeroSection";
import PropertyCardSkeleton from "@/components/container/PropertyCardSkeleton";
import Testimonials from "@/components/container/Testimonials";
import BlogSlider from "@/components/container/BlogSlider";
import ListingsSlider from "@/components/container/ListingsSlider";

export default async function Home() {
  return (
    <section className="w-full">
      {/* 1. Hero Section */}
      <Herosection />

      {/* 2. Vision, Mission & Excellence */}
      <FeaturedListings />

      {/* 3. Diaspora Reviews & Testimonials */}
      <Testimonials />

      {/* 4. Insights & Blog Slideshow */}
      <BlogSlider />

      {/* 5. Premium Listings Slideshow */}
      <Suspense fallback={<Loader />}>
        <ListingsSlider />
      </Suspense>

      {/* 6. FAQ */}
      <FAQ />
    </section>
  );
}

function Loader() {
  return (
    <div className="flex gap-6 mt-10 container mx-auto px-4 overflow-x-hidden">
      {Array.from({ length: 4 }).map((_, idx) => (
        <PropertyCardSkeleton key={idx} />
      ))}
    </div>
  );
}