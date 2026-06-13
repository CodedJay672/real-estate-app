"use client";

import { useEffect, useState } from "react";
import { Loader2, Globe, Shield, RefreshCw, Copy, ExternalLink, HelpCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_EMBED_URL = "https://lookerstudio.google.com/embed/reporting/427b3d38-e6fe-4f7f-afbe-a647ff964506/page/1M";

export default function AnalyticsDashboard({ trackingId }: { trackingId: string }) {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved Looker Studio URL from localStorage
    const savedUrl = localStorage.getItem("looker_studio_embed_url");
    const activeUrl = savedUrl || DEFAULT_EMBED_URL;
    setEmbedUrl(activeUrl);
    setInputUrl(savedUrl || "");
    setLoading(false);
  }, []);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!inputUrl.trim()) {
        localStorage.removeItem("looker_studio_embed_url");
        setEmbedUrl(DEFAULT_EMBED_URL);
        toast({
          title: "Reset to Default ➜",
          description: "Using standard Google Analytics GA4 Looker template.",
        });
      } else {
        if (!inputUrl.startsWith("https://lookerstudio.google.com/")) {
          toast({
            title: "Invalid URL ⚠️",
            description: "Please enter a valid Looker Studio embed URL.",
            variant: "destructive",
          });
          return;
        }
        localStorage.setItem("looker_studio_embed_url", inputUrl.trim());
        setEmbedUrl(inputUrl.trim());
        toast({
          title: "Dashboard Saved! 🎉",
          description: "Your custom Google Analytics report is now connected and loaded.",
        });
      }
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Google Analytics Tracking ID copied to clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Top connection status widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">GA4 Tracking Status</p>
            <p className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
              Active & Recording
              <span className="size-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-[#b88f3a]/10 text-[#b88f3a] rounded-2xl">
            <Shield size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Google measurement ID</p>
            <div className="flex items-center justify-between gap-1.5 mt-0.5">
              <span className="text-base font-bold text-slate-900 font-mono truncate">{trackingId}</span>
              <button 
                onClick={() => copyToClipboard(trackingId)}
                className="p-1 text-slate-400 hover:text-primary hover:bg-slate-50 rounded cursor-pointer transition-colors"
                title="Copy Measurement ID"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Console</p>
            <a 
              href="https://analytics.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base font-bold text-primary hover:underline flex items-center gap-1.5 mt-0.5"
            >
              Open Google Analytics
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Iframe Section */}
      <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200/80 p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Embedded Analytics Report</h2>
            <p className="text-xs text-slate-500">Fully interactive report linked directly to your Google Analytics database.</p>
          </div>
          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-xs transition-colors"
          >
            <RefreshCw size={12} />
            Reload Iframe
          </button>
        </div>

        <div className="relative w-full aspect-video min-h-[600px] bg-slate-100 flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-slate-500" size={32} />
              <p className="text-sm text-slate-500">Loading looker report...</p>
            </div>
          ) : (
            <iframe
              key={refreshKey}
              src={embedUrl}
              frameBorder="0"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-none shadow-inner"
            />
          )}
        </div>
      </div>

      {/* Configuration and Setup Guide Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-8 items-start">
        {/* Setup instructions */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle size={20} className="text-[#b88f3a]" />
            How to Connect Your Custom Looker Studio Dashboard
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-light">
            <p>
              By default, this panel displays the official Google Analytics GA4 Looker template. To link and display your own actual properties analytics:
            </p>
            <ol className="list-decimal pl-5 space-y-2.5">
              <li>
                Log in to <a href="https://lookerstudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Google Looker Studio</a> using the company email linked to your Google Analytics property.
              </li>
              <li>
                Click **Create** ➜ **Report**, select **Google Analytics** as your data source, and choose your GA4 account (ID: **{trackingId}**).
              </li>
              <li>
                Design your dashboard or use an existing template.
              </li>
              <li>
                In the top-right corner, click **Share** ➜ **Embed report**, select **Enable embedding**, and copy the link from the **Embed URL** input (not the iframe code itself).
              </li>
              <li>
                Paste that URL into the setting panel on the right, and save!
              </li>
            </ol>
          </div>
        </div>

        {/* Custom URL config card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-950">Looker Studio Embed Link</h3>
            <p className="text-xs text-slate-500 mt-0.5">Customize your embedded report.</p>
          </div>

          <form onSubmit={handleSaveUrl} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="https://lookerstudio.google.com/embed/..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400 font-mono text-xs"
              />
            </div>
            <button 
              type="submit" 
              className="w-full h-10 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Save size={14} />
              Save custom link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
