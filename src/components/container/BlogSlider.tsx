import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    title: "How to Secure Your Certificate of Occupancy (C of O) in Lagos Without Stress",
    excerpt: "Navigating the bureaucratic hurdles of land documentation in Nigeria can be daunting. Learn the exact steps to secure your C of O quickly and legally.",
    category: "Legal & Docs",
    date: "Oct 12, 2025",
    author: "Emmanuel Synergy",
  },
  {
    title: "Top 5 High-ROI Areas in Lagos for Real Estate Investment in 2026",
    excerpt: "While Ikoyi and Victoria Island remain staples, new developments along the Epe corridor are showing unprecedented returns on investment.",
    category: "Investment",
    date: "Oct 05, 2025",
    author: "Emmanuel Synergy",
  },
  {
    title: "The Ultimate Guide to Buying Off-Plan Properties Safely",
    excerpt: "Off-plan properties offer significant discounts, but they come with risks. Discover how to vet developers and protect your capital before signing.",
    category: "Buying Guide",
    date: "Sep 28, 2025",
    author: "Emmanuel Synergy",
  },
  {
    title: "Why Diaspora Investors Are Flocking to Nigerian Real Estate",
    excerpt: "Favorable exchange rates and massive infrastructural developments are making Nigeria a goldmine for Nigerians living abroad.",
    category: "Market Trends",
    date: "Sep 15, 2025",
    author: "Emmanuel Synergy",
  }
];

export default function BlogSlider() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
             <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a]">Insights</span>
            </h2>
            <p className="text-slate-600 max-w-2xl text-lg font-light">Expert market analysis, investment strategies, and guides for navigating the luxury real estate market.</p>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-sm font-bold text-[#b88f3a] hover:text-[#f5c344] transition-colors whitespace-nowrap">
            View All Articles <ChevronRight size={18} />
          </Link>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto pb-12 hide-scrollbar pl-4 sm:pl-8 md:pl-16 lg:pl-24">
        <div className="flex gap-6 w-max pr-8">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="w-[320px] md:w-[420px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 hover:border-[#b88f3a]/30 transition-all duration-300 group flex flex-col shrink-0 whitespace-normal">
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/80 to-[#0f172a]/40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-linear-to-r from-[#f5c344] to-[#b88f3a] text-[#0f172a] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#b88f3a]" /> {post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0f172a] mb-4 group-hover:text-[#b88f3a] transition-colors leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0f172a] group-hover:text-[#b88f3a] transition-colors mt-auto uppercase tracking-wider">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
