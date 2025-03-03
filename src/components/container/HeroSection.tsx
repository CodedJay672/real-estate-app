import Image from "next/image";
import { RiSearch2Line } from "react-icons/ri";
import Searchbar from "../shared/Searchbar";

const Herosection = () => {
  return (
    <section className="w-full h-[500px] max-h-screen flex justify-center items-center relative">
      <div className="w-full lg:w-4/5 mx-auto py-12 px-2 flex justify-center items-center flex-col relative z-10">
        <div className="p-2">
          <h1 className="text-blue-300 font-semibold text-3xl md:text-3xl lg:text-5xl text-center">
            Find Your Dream Home With{" "}
          </h1>
          <h1 className="text-gold font-bold text-4xl lg:text-5xl text-center">
            Trusted Experts.
          </h1>
        </div>
        <div className="flex-center p-2 mb-4">
          <p className="w-full lg:w-[650px] text-base md:text-xl text-center text-white font-semibold md:px-14 lg:px-16">
            Connecting buyers and sellers with personalized expertise, market
            insights, and a commitment to excellence
          </p>
        </div>
        <form className="w-full max-w-screen-sm rounded-md flex justify-center items-center">
          <Searchbar placeholder="Tell us what your're looking for..." />
          <RiSearch2Line className="absolute bottom-2 md:bottom-7 right-6 md:right-8 text-blue-200 size-4 md:size-6" />
        </form>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-banner.jpg"
          alt="hero-banner"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Herosection;
