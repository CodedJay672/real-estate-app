import { Suspense } from "react";
import Link from "next/link";

import Searchbar from "../shared/Searchbar";
import { getAllCategories } from "@/lib/data/category.data";

const Herosection = () => {
  const categories = getAllCategories();

  return (
    <section className="relative w-full h-screen overflow-hidden flex-center  bg-slate-950 text-white pt-20 pb-16">
      <div className="absolute inset-0 bg-[url(/assets/hero-banner.jpg)] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/10 via-slate-950/20 to-slate-950" />

      <div className="relative container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-2xl space-y-4 mb-8">
          <p className="inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium tracking-widest text-amber-200/80">
            LUXURY PROPERTIES • TRUSTED EXPERTS
          </p>
          <h1 className="text-5xl font-bold tracking-tight leading-tight sm:text-6xl md:text-7xl">
            Find your dream
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-amber-200 to-amber-400">home today.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto pt-1">
            Premium properties curated for modern lifestyles and smart investments.
          </p>
        </div>

        <div className="w-full max-w-4xl mb-10">
          <Suspense>
            <Searchbar getCategories={categories} url="/search" />
          </Suspense>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/listings" className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-2.5 text-sm font-semibold text-slate-950 shadow-2xl shadow-amber-400/30 transition hover:-translate-y-1 hover:bg-amber-300 hover:shadow-amber-400/50">
            Explore listings
          </Link>
          <Link href="/about-us" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/12">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
