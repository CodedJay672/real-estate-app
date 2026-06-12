"use client";

import { useState } from "react";
import { Kanban, MessageSquare, Phone, Mail, ArrowRight, User, MapPin } from "lucide-react";
import { updateMessageStatus } from "@/lib/actions/messages.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CRMLead {
  id: string;
  senderName: string;
  senderEmail: string;
  phone: string | null;
  leadType: string | null;
  status: string | null;
  propertyName: string | null;
  message: string;
  createdAt: string;
}

interface CrmDashboardProps {
  initialLeads: CRMLead[];
  isBrevoConfigured: boolean;
  googleAnalyticsId: string;
}

const CRM_STAGES = [
  { id: "inquiry", name: "Inquiry (New)", color: "border-t-blue-500 bg-blue-500/5 text-blue-700" },
  { id: "viewing", name: "Viewing Scheduled", color: "border-t-amber-500 bg-amber-500/5 text-amber-700" },
  { id: "closing", name: "Closing", color: "border-t-purple-500 bg-purple-500/5 text-purple-700" },
  { id: "closed", name: "Deal Closed", color: "border-t-emerald-500 bg-emerald-500/5 text-emerald-700" },
];

export default function CrmDashboard({ initialLeads, isBrevoConfigured, googleAnalyticsId }: CrmDashboardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buyer" | "renter" | "seller">("buyer");
  const [leads, setLeads] = useState<CRMLead[]>(initialLeads);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter leads based on active tab
  const filteredLeads = leads.filter((lead) => {
    const type = lead.leadType || "buyer";
    return type === activeTab;
  });

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    const response = await updateMessageStatus(leadId, newStatus);
    setUpdatingId(null);

    if (response.success) {
      // Trigger Google Analytics lead conversion/status update event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_status_update", {
          lead_id: leadId,
          new_status: newStatus,
          lead_type: activeTab,
        });
      }

      toast({
        title: "Status Updated",
        description: `Lead moved to ${newStatus.toUpperCase()}`,
      });
      // Update local state
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
      );
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Integration Badges */}
      <div className="flex flex-wrap gap-3 mb-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-xs">
          <span className="size-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          Google Analytics Active: {googleAnalyticsId}
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${
          isBrevoConfigured 
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
            : "bg-amber-500/10 text-amber-600 border-amber-500/20"
        }`}>
          <span className={`size-2 rounded-full inline-block ${isBrevoConfigured ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}></span>
          Brevo Email Automation: {isBrevoConfigured ? "Connected" : "Connected (Sandbox/Mock)"}
        </div>
      </div>

      {/* Lead Type Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {(["buyer", "renter", "seller"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-primary text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab}s ({leads.filter((l) => (l.leadType || "buyer") === tab).length})
          </button>
        ))}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {CRM_STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter(
            (lead) => (lead.status || "inquiry") === stage.id
          );

          return (
            <div
              key={stage.id}
              className={`rounded-xl border border-slate-200/80 bg-white/70 p-4 min-h-[500px] flex flex-col space-y-4 border-t-4 ${stage.color}`}
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-sm tracking-wide text-slate-800 uppercase">
                  {stage.name}
                </h3>
                <span className="bg-slate-200/80 px-2 py-0.5 rounded-full text-xs font-bold text-slate-700">
                  {stageLeads.length}
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
                    <Kanban size={24} className="stroke-1 mb-2" />
                    <p className="text-xs">No prospects here</p>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-lg border border-slate-200/70 p-4.5 shadow-sm hover:shadow-md transition-shadow relative space-y-3"
                    >
                      {updatingId === lead.id && (
                        <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center z-10">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <User size={13} className="text-slate-400" />
                            {lead.senderName}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      {lead.propertyName && (
                        <div className="flex items-center gap-1 text-xs text-primary font-semibold bg-primary/5 p-1.5 rounded border border-primary/10">
                          <MapPin size={12} />
                          <span className="truncate">{lead.propertyName}</span>
                        </div>
                      )}

                      {/* Message Content */}
                      <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-2 rounded">
                        "{lead.message}"
                      </p>

                      {/* Contacts */}
                      <div className="space-y-1.5 pt-1 border-t border-slate-100 text-xs">
                        <a
                          href={`mailto:${lead.senderEmail}`}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors"
                        >
                          <Mail size={12} />
                          <span className="truncate">{lead.senderEmail}</span>
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors"
                          >
                            <Phone size={12} />
                            <span>{lead.phone}</span>
                          </a>
                        )}
                      </div>

                      {/* Funnel Pipeline Changer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                        <select
                          value={lead.status || "inquiry"}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="text-[11px] font-semibold bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 cursor-pointer focus:outline-none flex-1"
                        >
                          <option value="inquiry">Inquiry</option>
                          <option value="viewing">Viewing</option>
                          <option value="closing">Closing</option>
                          <option value="closed">Closed Deal</option>
                        </select>

                        {/* WhatsApp automated journey */}
                        <a
                          href={`https://wa.me/${(lead.phone || "").replace(/[^0-9]/g, "") || "2348000000000"}?text=Hi%20${encodeURIComponent(
                            lead.senderName
                          )},%20I'm%20Lauretta%20from%20Clean%20Beautiful%20Properties%20following%20up%20on%20your%20inquiry%20regarding%20${encodeURIComponent(
                            lead.propertyName || "luxury properties"
                          )}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                          title="WhatsApp Followup"
                        >
                          <MessageSquare size={13} />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
