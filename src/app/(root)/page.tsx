import FeaturedListings from "@/components/container/FeaturedListings";
import Herosection from "@/components/container/HeroSection";
import SpecialOffers from "@/components/container/SpecialOffers";
import Testimonials from "@/components/container/Testimonials";

export default function Home() {
  return (
    <section className="w-full">
      <Herosection />
      <SpecialOffers />
      <FeaturedListings />
      <Testimonials />
    </section>
  );
}
