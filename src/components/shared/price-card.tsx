export default function PriceCard({ size, oldPrice, newPrice, doc, deposit, featured = false }: any) {
  return (
    <div className={`relative rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] ${featured
      ? 'border-yellow-500/40 bg-linear-to-b from-yellow-500/[0.07] to-transparent shadow-[0_20px_50px_rgba(234,179,8,0.1)]'
      : 'border-white/10 bg-white/2'
      }`}>

      <div className={`py-4 text-center font-black text-xl tracking-[0.2em] ${featured ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white'}`}>

        {size} SQM
        <p className="w-max mx-auto bg-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter animate-pulse md:absolute max-sm:mt-3 md:top-2 md:right-2">
          Price Hike April 30th
        </p>
      </div>


      <div className="p-10 text-center">
        <div className="mb-8 flex flex-col items-center gap-1">
          <span className="text-gray-500 text-xl line-through decoration-red-500/50 decoration-2 italic font-medium">
            ₦{oldPrice}M
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-7xl md:text-8xl font-black text-yellow-500 tracking-tighter">₦{newPrice}</span>
            <span className="text-2xl font-bold text-yellow-500">M</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
            Value Appreciation
          </div>
        </div>

        <div className="space-y-4 border-t border-white/5 pt-8">
          <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-500">
            <span>Documentation/Infra</span>
            <span className="text-white font-bold">₦{doc} Million</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-500/60">Initial Deposit</p>
              <p className="text-2xl font-black text-white">₦{deposit}M</p>
            </div>
            <div className="h-1 w-12 bg-yellow-500/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}