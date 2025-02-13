import Image from "next/image";
import { RiSearch2Line } from "react-icons/ri";

const Herosection = () => {
  return (
    <section className="w-full h-[500px] max-h-screen flex justify-center items-center relative">
      <div className="w-full lg:w-4/5 mx-auto py-12 px-2 flex justify-center items-center flex-col relative z-10">
        <div className="my-6">
          <h1 className="text-blue-300 font-bold text-3xl md:text-3xl lg:text-6xl px-12 text-center">
            Find Your Dream Home With{" "}
          </h1>
          <h1 className="text-gold font-bold text-5xl lg:text-6xl text-center">
            Trusted Experts.
          </h1>
        </div>
        <p className="w-full lg:w-[650px] text-base md:text-lg text-center text-blue-50 font-semibold px-12 md:px-14 lg:px-16">
          Connecting buyers and sellers with personalized expertise, market
          insights, and a commitment to excellence
        </p>
        <form className="w-96 flex justify-center items-center space-y-6 relative">
          <input
            type="search"
            name="query"
            placeholder="Location/Zip Code/Titles/Key Tags e.g Luxury..."
            className="w-full p-3 pr-12 my-4 bg-blue-50 outline-blue-300 placeholder:text-sm rounded-full"
          />
          <RiSearch2Line
            size={24}
            className="absolute top-1 right-4 text-blue-200"
          />
        </form>
      </div>
      <Image
        src="/assets/hero-banner.jpg"
        alt="hero-banner"
        fill
        className="absolute inset-0 object-cover brightness-90 z-0"
      />
    </section>
  );
};

export default Herosection;
