import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col my-10 bg-[url(/assets/happy-woman.jpg)] bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay py-20 p-2.5">


      <h1 className="text-3xl lg:text-4xl font-bold text-center text-light-50">
        Testimonials
      </h1>
      <p className="text-sm md:text-base text-center text-light-100 mt-2 w-full max-w-lg">
        Discover the experiences of satisfied clients who found their dream properties with us. Their stories tell you why we are the trusted real estate partners.
      </p>

      <TestimonialCarousel />

    </section>
  );
};

export default Testimonials;
