import { Suspense } from "react";

import FAQ from "@/components/container/FAQ";
import FeaturedListings from "@/components/container/FeaturedListings";
import Herosection from "@/components/container/HeroSection";
import PropertyCardSkeleton from "@/components/container/PropertyCardSkeleton";
import Testimonials from "@/components/container/Testimonials";
import BlogSlider from "@/components/container/BlogSlider";
import ListingsSlider from "@/components/container/ListingsSlider";
import Searchbar from "@/components/shared/Searchbar";
import { getAllCategories } from "@/lib/data/category.data";

export default async function Home() {
  return (
    <section className="w-full">
      {/* 1. Hero Section (Result) */}
      <Herosection />

      {/* 2. Diaspora Reviews & Testimonials (Testimonial) */}
      <Testimonials />

      {/* 3. Insights & Blog Slideshow (Urgency/Educational) */}
      <BlogSlider />

      {/* 4. Premium Listings Slideshow (Solution) */}
      <Suspense fallback={<Loader />}>
        <ListingsSlider />
      </Suspense>

      {/* 4.5. Property Search Bar (Centered under Exclusive Listings) */}
      <div className="container mx-auto px-4 max-w-4xl mb-16 -mt-8 flex justify-center w-full">
        <Suspense>
          <Searchbar getCategories={getAllCategories()} url="/search" />
        </Suspense>
      </div>

      {/* 5. Vision, Mission & Excellence (Solution Details) */}
      <FeaturedListings />

      {/* 6. FAQ (Urgency Closing) */}
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