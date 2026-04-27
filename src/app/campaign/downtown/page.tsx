import Portfolio, { PortfolioSkeleton } from '@/components/container/portfolio';
import Logo from '@/components/shared/Logo';
import PriceCard from '@/components/shared/price-card';
import { getAllProducts } from '@/lib/data/products.data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import EnquiryModal from './enquiry-modal';


export const metadata: Metadata = {
  title: 'Downtown Lagos Commercial City',
  description: 'Discover the Downtown Lagos Commercial City, a premier development by Aceroyal Estates Homes Ltd. Explore office spaces, healthcare facilities, shopping malls, and more in this exclusive commercial hub. Marketed exclusively by Pristen.',
};

export default function DowntownLagosLanding() {
  const products = getAllProducts({ page: 1, pageSize: 4 });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500 selection:text-black font-sans">
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-sm overflow-hidden relative">
            <Logo />
          </div>
          <span className="font-bold tracking-tighter text-xl italic text-yellow-500">DOWNTOWN <span className="text-white font-light">LAGOS</span></span>
        </div>
        <div className='w-40 h-12 md:h-10'>
          <EnquiryModal />
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="flex gap-4 mb-8">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] border border-red-600 px-3 py-1 rounded text-red-500">
            Govt. Allocation / C of O
          </p>
          <p className="text-xs uppercase tracking-[0.2em] border border-border px-3 py-1 rounded text-muted-foreground">
            Labour City, Ibeju Lekki
          </p>
        </div>

        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-lineaer-to-b from-white to-gray-500">
          DOWNTOWN <br /> <span className="text-yellow-500">COMMERCIAL CITY</span>
        </h1>

        <div className="bg-yellow-500 text-black font-black px-8 py-2 rounded-full text-xl md:text-2xl italic transform -rotate-1 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          PHASE 2
        </div>

        <div className="mt-12 group relative">
          <p className="text-gray-400 uppercase tracking-[0.4em] text-sm mb-2">New Prices Effective</p>
          <h2 className="text-4xl md:text-6xl font-bold border-y border-white/10 py-4 px-10">APRIL 30TH, 2026</h2>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto px-6 mb-20">
        <PriceCard
          size="500"
          oldPrice="30"
          newPrice="60"
          doc="15"
          deposit="5"
        />
        <PriceCard
          size="1,000"
          oldPrice="55"
          newPrice="100"
          doc="20"
          deposit="10"
          featured={true}
        />
      </section>

      <div className="w-full max-w-2xs h-14 mx-auto my-10">
        <EnquiryModal />
      </div>

      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
          <div>
            <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] font-bold mb-3">Explore More</p>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">THE PRISTEN <span className="text-gray-500">COLLECTION</span></h2>
          </div>
          <a
            href="https://www.cleanbeautifulproperties.com/listings"
            target="_blank"
            className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase border-b border-yellow-500/30 pb-2 hover:border-yellow-500 transition-all"
          >
            View All Properties
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </a>
        </div>

        <Suspense fallback={
          <PortfolioSkeleton />
        }>
          <Portfolio productPromise={products} />
        </Suspense>
      </section>

      <section className="bg-white/5 backdrop-blur-xl py-12 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {['Office Spaces', 'Health Care', 'Shopping Mall', 'Financial Districts', 'Exclusive Membership', 'Helipad', 'Restaurants'].map((item) => (
            <div key={item} className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                <div className="w-6 h-6 border-2 border-current rounded-sm" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-center text-gray-400 group-hover:text-white">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center px-6">
        <p className="text-gray-500 uppercase tracking-widest mb-4">A Development By</p>
        <h4 className="text-2xl font-bold tracking-[0.3em]">ACEROYAL ESTATES HOMES LTD</h4>
        <a href="https://aceroyalestates.com" className="hover:text-yellow-500 transition-colors">www.aceroyalestates.com</a>


        <div className="text-center px-10 py-8 border border-yellow-500/20 rounded-3xl bg-yellow-500/2 mt-6 max-w-sm mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] mb-3 text-gray-400">Marketed Exclusively By</p>
          <h4 className="text-3xl font-black italic text-yellow-500 tracking-tighter mb-1">PRISTEN</h4>
          <a href="https://www.cleanbeautifulproperties.com" target="_blank" className="text-gray-500 text-sm hover:text-white transition-colors">www.cleanbeautifulproperties.com</a>
        </div>
      </footer>
    </div>
  );
}