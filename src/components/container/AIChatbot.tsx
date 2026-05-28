"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, PhoneCall, Loader2 } from "lucide-react";
import { askPristineAI } from "@/lib/actions/chat.actions";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const QUICK_PROMPTS = [
  { label: "🏡 How to buy property?", text: "I want to buy a luxury property. What is the process?" },
  { label: "📅 Schedule viewing tour", text: "How do I schedule a virtual or physical viewing tour?" },
  { label: "📞 Connect with CEO Lauretta", text: "How can I contact CEO Lauretta Asemota on WhatsApp?" },
  { label: "💡 Profitable investments", text: "Which locations offer the highest profitable investment returns?" },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Welcome to Clean Beautiful Properties! I am Pristine AI, your luxury real estate assistant. How can I help you find your dream home or profitable investment today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Call Gemini API action
    const apiHistory = [...messages, userMessage].map((m) => ({
      role: m.role,
      text: m.text,
    }));

    const response = await askPristineAI(apiHistory);
    setIsLoading(false);

    if (response.success && response.text) {
      setMessages((prev) => [...prev, { role: "model", text: response.text! }]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I apologize, but I'm having a connection issue. Please connect with our lead agent on WhatsApp at https://wa.me/2348000000000 for instant response!",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-32 sm:bottom-36 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[500px] bg-slate-950/95 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-amber-950 p-4 border-b border-amber-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles size={16} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1">
                  Pristine AI <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                </h3>
                <p className="text-[10px] text-slate-400">Luxury Assistant • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-100 p-1 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-amber-500/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-2 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {msg.role === "model" && (
                  <div className="size-6 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Bot size={12} />
                  </div>
                )}
                <div
                  className={cn(
                    "p-3 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm",
                    msg.role === "user"
                      ? "bg-amber-500 text-slate-950 rounded-tr-none font-medium"
                      : "bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-start gap-2 max-w-[85%] mr-auto">
                <div className="size-6 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Bot size={12} />
                </div>
                <div className="bg-slate-900 text-slate-400 p-3 rounded-2xl rounded-tl-none border border-slate-800 flex items-center gap-2">
                  <Loader2 size={12} className="animate-spin text-amber-500" />
                  <span>Pristine AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Panel */}
          {messages.length === 1 && !isLoading && (
            <div className="p-3 border-t border-slate-900 bg-slate-950 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSend(prompt.text)}
                  className="text-[10px] bg-slate-900 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 border border-slate-800 px-2 py-1 rounded-full transition-all cursor-pointer"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          {/* Direct WhatsApp Concierge CTA */}
          <div className="px-4 py-2 bg-amber-500/5 border-t border-amber-500/10 flex justify-between items-center text-[10px] text-slate-400">
            <span>Need Lauretta directly?</span>
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300"
            >
              <PhoneCall size={10} />
              Open WhatsApp
            </a>
          </div>

          {/* Form Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 bg-slate-950 border-t border-slate-900 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about listings, pricing, tours..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 p-2 rounded-xl transition-all cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "size-14 rounded-full flex items-center justify-center text-slate-950 shadow-2xl hover:scale-105 transition-all active:scale-95 border cursor-pointer border-amber-500/20",
          isOpen
            ? "bg-slate-900 text-amber-500 hover:bg-slate-800"
            : "bg-amber-500 text-slate-950 hover:bg-amber-400"
        )}
        title="Pristine AI Concierge"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}
