import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pt-24 pb-20">
      {/* Blog Hero Section */}
      <section className="bg-[#0f172a] text-white py-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#b88f3a]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="wrapper relative z-10 text-center">
          <h4 className="text-[#f5c344] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Real Estate Insights</h4>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a]">CBPL</span> Blog
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
            Expert insights, investment strategies, and everything you need to know about navigating the luxury real estate market in Nigeria and beyond.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-[#b88f3a]/30 transition-all duration-300 group flex flex-col">
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/80 to-[#0f172a]/40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-linear-to-r from-[#f5c344] to-[#b88f3a] text-[#0f172a] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#b88f3a]" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} className="text-[#b88f3a]" /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0f172a] mb-3 group-hover:text-[#b88f3a] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <Link href={`#`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0f172a] hover:text-[#b88f3a] transition-colors mt-auto">
                  Read Full Article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

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
  },
  {
    title: "Red Flags to Watch Out For When Inspecting a Luxury Home",
    excerpt: "Don't let fresh paint fool you. Our lead engineers reveal the top 5 structural and environmental red flags to look for during a physical inspection.",
    category: "Property Care",
    date: "Sep 02, 2025",
    author: "Emmanuel Synergy",
  },
  {
    title: "How Inflation Affects Property Values (And Why Real Estate is Your Best Hedge)",
    excerpt: "Cash loses value, but prime real estate appreciates. Understand the economics of wealth preservation through strategic property acquisition.",
    category: "Wealth Building",
    date: "Aug 20, 2025",
    author: "CBPL Experts",
  }
];
