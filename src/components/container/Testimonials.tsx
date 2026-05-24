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

        <figure className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[#b88f3a]/30 bg-[#0f172a]/80 p-8 sm:p-12 shadow-[0_0_50px_-12px_rgba(245,195,68,0.15)] backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#f5c344] via-amber-200 to-[#b88f3a]" />
          <div className="flex justify-center mb-6 text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] text-2xl tracking-[0.2em] drop-shadow-sm">
            ★★★★★
          </div>
          <p className="text-lg leading-9 text-white sm:text-2xl font-light italic">
            "I couldn't have asked for a better team. They helped us sell our home quickly and above asking price, and they were always available to answer our questions. We highly recommend them to anyone looking to buy or sell a luxury home."
          </p>
          <figcaption className="mt-10 text-sm flex flex-col items-center justify-center gap-1">
            <span className="block text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] uppercase tracking-wider">Mark Anthony</span>
            <span className="text-white/60 font-medium tracking-wide">Luxury Homeowner</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
