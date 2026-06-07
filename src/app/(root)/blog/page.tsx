import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, MapPin } from "lucide-react";
import { blogPosts } from "@/lib/data/blog.data";

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
              <div className="h-48 relative overflow-hidden flex items-center justify-center p-6 text-center">
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60" />
                <div className="relative z-10">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">{post.category}</span>
                  <h4 className="text-slate-100 font-bold text-base leading-snug line-clamp-2">{post.title}</h4>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-linear-to-r from-[#f5c344] to-[#b88f3a] text-[#0f172a] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-[#b88f3a]" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-[#b88f3a]" /> {post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-[#0f172a] mb-3 group-hover:text-[#b88f3a] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mb-4">
                  <MapPin size={11} className="text-amber-500" />
                  <span>{post.geoTarget.split(",")[0]} Targeted</span>
                </div>
                
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0f172a] hover:text-[#b88f3a] transition-colors mt-auto cursor-pointer">
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
