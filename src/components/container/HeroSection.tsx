import Link from "next/link";

const Herosection = () => {

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex-center bg-slate-950 text-white pt-32 pb-24">
      <div className="absolute inset-0 bg-[url(/assets/hero-banner.jpg)] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/10 via-slate-950/20 to-slate-950" />

      <div className="relative container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-2xl space-y-4 mb-8">
          <p className="inline-flex items-center justify-center rounded-full border border-[#b88f3a]/30 bg-[#f5c344]/10 px-3 py-1.5 text-xs font-medium tracking-widest text-[#f5c344]">
            LUXURY PROPERTIES • TRUSTED EXPERTS
          </p>
          <h1 className="text-5xl font-bold tracking-tight leading-tight sm:text-6xl md:text-7xl">
            Multiply your
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] via-amber-200 to-[#b88f3a]">returns today.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto pt-1 leading-relaxed">
            Multiply your funds with high-yield real estate investments. Access CBPL verified luxury properties and land titles backed by trusted local and diaspora reviews. Exquisite pre-launch listings are selling out fast this week!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/listings" className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#f5c344] to-[#b88f3a] px-7 py-3 sm:py-2.5 text-sm font-bold text-[#0f172a] shadow-xl shadow-[#f5c344]/20 transition hover:scale-[1.02] w-full sm:w-auto border-none">
            Explore listings
          </Link>
          <Link href="/about-us" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3 sm:py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 w-full sm:w-auto">
            Learn more
          </Link>
        </div>

        {/* Trust Indicator - High Conversion Element */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="flex -space-x-3">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
            <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
            <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-linear-to-br from-[#f5c344] to-[#b88f3a] flex items-center justify-center text-[11px] font-bold text-[#0f172a] shadow-inner">
              100+
            </div>
          </div>
          <p className="text-sm font-medium text-white flex items-center gap-1.5 drop-shadow-md">
            <span className="flex text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a]">★★★★★</span>
            Trusted by 100+ happy clients
          </p>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
