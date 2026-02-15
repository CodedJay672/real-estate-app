import { Suspense } from "react";
import { RiSearch2Line } from "react-icons/ri";
import Searchbar from "../shared/Searchbar";
import Topbar from "./Topbar";

const Herosection = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center bg-dark-200/50 bg-[url(/assets/hero-banner.jpg)] bg-blend-overlay bg-center bg-no-repeat">
      <Topbar />

      <div className="w-full lg:w-4/5 mx-auto py-12 px-2 flex justify-center items-center flex-col relative z-10">
        <div className="p-2">
          <h1 className="text-accent-brown font-semibold text-3xl md:text-3xl lg:text-5xl text-center">
            Find Your Dream Home With{" "}
          </h1>
          <h1 className="text-gold font-bold text-4xl lg:text-5xl text-center text-seconday-dark-50">
            Trusted Experts.
          </h1>
        </div>
        <div className="flex-center p-2 mb-4">
          <p className="w-full lg:w-[650px] text-base md:text-xl text-center text-seconday-dark-50/80 font-semibold md:px-14 lg:px-16">
            Connecting buyers and sellers with personalized expertise, market
            insights, and a commitment to excellence
          </p>
        </div>
        <form className="w-full px-6 lg:px-0 max-w-screen-md rounded-md flex justify-center items-center">
          <Suspense>
            <Searchbar placeholder="Tell us what your're looking for..." />
            <RiSearch2Line className="absolute bottom-[58px] md:bottom-[54px] right-10 md:right-40 text-gray-600 size-4 md:size-6" />
          </Suspense>
        </form>
      </div>
    </section>
  );
};

export default Herosection;
