import Image from "next/image";

const TestimonialCarousel = () => {
  return (
    <section className="w-full p-10 flex flex-col md:flex-row justify-center items-center relative h-[450px]">
      <div className="w-full before:absolute before:inset-0 before:bg-gray-900/70 before:z-10">
        <Image
          src="/assets/happy-woman.jpg"
          alt="happy woman"
          className="object-cover"
          fill
        />
      </div>

      <div className="w-full md:w-1/2 mx-auto absolute inset-0 flex flex-col justify-center items-center z-20 p-6">
        <p className="text-lg md:text-xl text-center text-subtle-light mt-2">
          "I couldn't have asked for a better team. They helped us sell our home
          quickly and above asking price! They were always available to answer
          our questions and made the process easy. I would highly recommend them
          to anyone looking to buy or sell a home."
        </p>

        <div className="flex justify-center flex-col items-center mt-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white">
            Mark Anthony
          </h3>
          <p className="text-xs md:textsm lg:text-base text-gray-300">
            Homeowner
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
