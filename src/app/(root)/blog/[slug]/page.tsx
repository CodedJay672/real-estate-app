import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag, MapPin, Share2 } from "lucide-react";
import type { Metadata } from "next";

import { getBlogPostBySlug, blogPosts } from "@/lib/data/blog.data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | CBPL Luxury Real Estate Blog`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className="w-full min-h-screen bg-slate-50 pt-28 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights Blog
        </Link>

        {/* Header Block */}
        <header className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock size={14} className="text-amber-500" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin size={14} className="text-amber-500" />
              <span>Target: {post.geoTarget.split(",")[0]} Corridor</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-950 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                {post.author[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{post.author}</p>
                <p className="text-xs text-slate-500">Published {post.date}</p>
              </div>
            </div>

            <button 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary border border-slate-200 rounded-full px-4 py-2 hover:bg-slate-50 transition-all cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard! Share the luxury insights.");
                }
              }}
            >
              <Share2 size={13} />
              Share Article
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50">
          <div 
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-8 prose-p:text-slate-600 prose-p:text-sm md:prose-p:text-base prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2 text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* SEO Tag List */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2 items-center">
            <Tag size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">SEO Keywords:</span>
            {post.seoKeywords.map((tag) => (
              <span key={tag} className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
