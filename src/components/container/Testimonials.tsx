const Testimonials = () => {
  const reviews = [
    {
      name: "Chinedu E.",
      location: "UK Expat",
      text: "Living in the UK, my biggest fear was getting scammed. Clean Beautiful Properties handled my land acquisition in Epe with 100% transparency. My documents were verified and delivered safely."
    },
    {
      name: "Dr. Funmi A.",
      location: "Dallas, TX",
      text: "I was referred by a friend in Texas. The team helped me secure a luxury apartment in Lekki off-plan. The ROI has already exceeded my expectations. They truly understand what investors need."
    },
    {
      name: "Adebayo O.",
      location: "Toronto, Canada",
      text: "Exceptional service from start to finish. They understand exactly what Nigerians abroad are looking for: absolute security, verified titles, and high-yield, hassle-free investments."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[url(/assets/happy-woman.jpg)] bg-cover bg-center bg-fixed py-24">
      <div className="absolute inset-0 bg-[#0f172a]/90" />
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="mx-auto max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-[#f5c344]">Client Success Stories</p>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Trusted by Investors Worldwide.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg font-light">
            Hear from diaspora homeowners and investors who found security, confidence, and immense returns with our verified real estate portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
          {reviews.map((review, idx) => (
            <figure key={idx} className="rounded-3xl border border-[#b88f3a]/30 bg-[#0f172a]/80 p-8 sm:p-10 shadow-[0_0_50px_-12px_rgba(245,195,68,0.1)] backdrop-blur-xl relative overflow-hidden group flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#f5c344] via-amber-200 to-[#b88f3a]" />
              <div className="flex justify-center mb-6 text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] text-xl tracking-[0.2em] drop-shadow-sm">
                ★★★★★
              </div>
              <p className="text-base leading-relaxed text-slate-200 font-light italic flex-1">
                "{review.text}"
              </p>
              <figcaption className="mt-8 flex flex-col items-center justify-center gap-1 border-t border-white/10 pt-6">
                <span className="block text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a] uppercase tracking-wider">{review.name}</span>
                <span className="text-slate-400 font-medium tracking-wide text-sm">{review.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
