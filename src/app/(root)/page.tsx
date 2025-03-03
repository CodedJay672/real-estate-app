import FAQ from "@/components/container/FAQ";
import FeaturedListings from "@/components/container/FeaturedListings";
import Herosection from "@/components/container/HeroSection";
import SpecialOffers from "@/components/container/SpecialOffers";
import Testimonials from "@/components/container/Testimonials";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  return (
    <section className="w-full">
      <Herosection />
      <SpecialOffers query={query} />
      <FeaturedListings />
      <Testimonials />
      <FAQ />
    </section>
  );
}
