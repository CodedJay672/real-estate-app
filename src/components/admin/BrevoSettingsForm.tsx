"use client";

import { useEffect, useState } from "react";
import { Loader2, MailCheck, AlertTriangle, Key } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { getBrevoStatusAction, sendTestEmailAction } from "@/lib/actions/email.actions";

export default function BrevoSettingsForm() {
  const [status, setStatus] = useState<{ configured: boolean; maskedKey: string | null } | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      const res = await getBrevoStatusAction();
      setStatus({ configured: res.configured, maskedKey: res.maskedKey });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;

    setLoading(true);
    try {
      const res = await sendTestEmailAction(testEmail);
      if (res.success) {
        toast({
          title: "Email Sent! ✉️",
          description: res.message,
        });
      } else {
        toast({
          title: "Failed to Send ❌",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error occurred",
        description: "An unexpected error occurred while sending test email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="animate-spin text-slate-500" size={24} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50">
        <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Connection Status</h3>
        {status?.configured ? (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <MailCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-700">Brevo SMTP Connected</p>
              <p className="text-xs text-slate-500 mt-0.5">Automated lead follow-ups and agent notifications are active.</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600 font-mono bg-white border border-slate-200/60 rounded px-2 py-1 w-max">
                <Key size={12} className="text-slate-400" />
                {status.maskedKey}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-700">SMTP Offline (Mock Mode)</p>
              <p className="text-xs text-slate-500 mt-0.5">
                The BREVO_API_KEY is not set or set to dummy. Emails are currently simulated in console logs.
              </p>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                To activate: Add <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-700">BREVO_API_KEY</code> to your deployment variables or <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-700">.env.local</code>.
              </p>
            </div>
          </div>
        )}
      </div>

      {status?.configured && (
        <form onSubmit={handleTestEmail} className="space-y-3">
          <div>
            <label htmlFor="testEmail" className="block text-xs font-medium text-slate-700 mb-1.5">
              Send Test Email
            </label>
            <input
              type="email"
              id="testEmail"
              required
              placeholder="e.g. lauretta@cleanbeautifulproperties.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
            />
          </div>
          <Button type="submit" disabled={loading || !testEmail} className="w-full flex items-center justify-center bg-primary">
            {loading && <Loader2 size={16} className="animate-spin mr-2" />}
            Send Test Verification Email
          </Button>
        </form>
      )}
    </div>
  );
}
