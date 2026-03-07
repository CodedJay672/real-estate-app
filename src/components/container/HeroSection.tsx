import { Suspense } from "react";
import Searchbar from "../shared/Searchbar";
import { getAllCategories } from "@/lib/data/category.data";

const Herosection = () => {
  // get the categories
  const categories = getAllCategories();


  return (
    <section className="w-full h-screen flex justify-center items-center bg-dark-200/50 bg-[url(/assets/hero-banner.jpg)] bg-blend-overlay bg-center bg-cover bg-no-repeat">
      <div className="container mx-auto py-12 px-2 flex justify-center items-center flex-col relative z-10">
        <div className="p-2">
          <h1 className="text-accent-brown font-semibold text-3xl md:text-3xl lg:text-5xl text-center w-full max-w-xl">
            Find Your Dream Home With{" "}

            <span className="text-gold font-bold text-4xl lg:text-5xl text-center text-seconday-dark-50">
              Trusted Experts.
            </span>
          </h1>
        </div>
        <div className="flex-center p-2 mb-4">
          <p className="w-full lg:w-162.5 text-base md:text-xl text-center text-seconday-dark-50/80 font-semibold md:px-14 lg:px-16">
            Explore our curated selection of luxury properties that suites your unique lifestyle. We are here to help you bring your dream home to reality.
          </p>
        </div>

        <Suspense>
          <Searchbar getCategories={categories} url="/search" />
        </Suspense>
      </div>
    </section>
  );
};

export default Herosection;
