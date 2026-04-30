import React from "react";
import Link from "next/link";


import ChooseItem from "../shared/ChooseItem";
import { Button } from "../ui/button";

const FeaturedListings = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16 md:py-24">
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Committed to <span className="text-amber-400">real estate excellence</span>
        </h2>
        <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          We deliver boutique service, smart investment guidance, and premium property sourcing so you can move confidently into your next home.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ChooseItem title="1" text="Local market insight with a luxury-first mindset." bgColor="#fde9bd" />
        <ChooseItem title="2" text="Curated options matched to your lifestyle and goals." bgColor="#b98b42" />
        <ChooseItem title="3" text="Unlock the best properties before they hit the wider market." bgColor="#d6c3a9" />
        <ChooseItem title="4" text="A premium experience from first look to closing." bgColor="#2c3f61" />
      </div>

      <p className="mx-auto max-w-xl text-center text-sm leading-6 text-slate-500">
        Ready to experience the difference? Start with our exclusive property selection and a concierge-level buying process.
      </p>

      <Button asChild size="lg" className="rounded-full bg-amber-400 px-8 py-3 text-slate-950 shadow-xl shadow-amber-400/20 hover:bg-amber-300">
        <Link href="/listings">Explore premium listings</Link>
      </Button>
    </section>
  );
};

export default FeaturedListings;
