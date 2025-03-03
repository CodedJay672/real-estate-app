import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
  return (
    <section className="w-full flex justify-center items-center my-10">
      <div className="w-full">
        <div className="flex-center flex-col py-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-300">
            Testimonials
          </h1>
          <p className="text-center text-gray-500 mt-2">
            What our clients say about us
          </p>
        </div>
        <TestimonialCarousel />
      </div>
    </section>
  );
};

export default Testimonials;
