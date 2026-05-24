import React from "react";

const FeaturedListings = () => {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
            Committed to <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a]">Real Estate Excellence</span>
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-[#f5c344] to-[#b88f3a] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision */}
          <div className="bg-slate-50 rounded-[2.5rem] p-10 lg:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f5c344]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <h3 className="text-3xl font-bold text-[#0f172a] mb-6 flex items-center gap-4">
              <span className="text-[#b88f3a] text-xl">01.</span> Our Vision
            </h3>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              To be the premier global real estate firm, recognized for bridging the gap between Nigerians in the diaspora and high-yield, secure, and luxurious property investments back home. We envision a market where transparency and absolute trust are the universal standard.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-[#0f172a] rounded-[2.5rem] p-10 lg:p-14 border border-[#0f172a] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#b88f3a]/20 rounded-full blur-3xl -mr-16 -mb-16 pointer-events-none" />
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
              <span className="text-[#f5c344] text-xl">02.</span> Our Mission
            </h3>
            <p className="text-slate-300 text-lg font-light leading-relaxed">
              To provide exclusive access to meticulously vetted properties, offering a concierge-level buying process that completely eliminates the stress and risks of real estate acquisition. We deliver boutique service and smart investment guidance so you can move confidently into your next home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
