"use client";

import { Share2 } from "lucide-react";

export default function ShareButton() {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! Share the luxury insights.");
    }
  };

  return (
    <button 
      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary border border-slate-200 rounded-full px-4 py-2 hover:bg-slate-50 transition-all cursor-pointer"
      onClick={handleShare}
    >
      <Share2 size={13} />
      Share Article
    </button>
  );
}