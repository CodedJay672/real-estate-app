import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col my-10 bg-[url(/assets/happy-woman.jpg)] bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay py-20">


      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-300">
        Testimonials
      </h1>
      <p className="text-sm md:text-base text-center text-gray-400 mt-2">
        What our clients say about us
      </p>

      <TestimonialCarousel />

    </section>
  );
};

export default Testimonials;
