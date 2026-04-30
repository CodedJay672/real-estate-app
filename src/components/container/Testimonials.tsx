const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[url(/assets/happy-woman.jpg)] bg-cover bg-center bg-no-repeat py-24">
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="mx-auto max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/90">Client stories</p>
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Real people. Real results.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-200/85 sm:text-lg">
            Hear from homeowners who found comfort, confidence and strong returns with our personalized real estate guidance.
          </p>
        </div>

        <figure className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-white/15 bg-white/10 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <p className="text-lg leading-8 text-white sm:text-xl">
            “I couldn't have asked for a better team. They helped us sell our home quickly and above asking price, and they were always available to answer our questions. We would highly recommend them to anyone looking to buy or sell a home.”
          </p>
          <figcaption className="mt-8 text-sm text-slate-200/80">
            <span className="block text-base font-semibold text-white">Mark Anthony</span>
            <span>Homeowner</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
