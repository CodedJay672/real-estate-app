"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Bot, PhoneCall, Loader2 } from "lucide-react";
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
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Dragging States for custom floating physics
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startClickPos = useRef({ x: 0, y: 0 });

  // Initialize welcome message dynamically to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
    setMessages([
      {
        role: "model",
        text: "Welcome to Clean Beautiful Properties! I am Clean & Beautiful AI, your luxury real estate assistant. How can I help you find your dream home or profitable investment today?",
      },
    ]);

    // Show popup notification after 2 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Drag listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.current.x,
        y: touch.clientY - dragStart.current.y,
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    startClickPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
    startClickPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleMouseUpAndClick = (e: React.MouseEvent) => {
    setIsDragging(false);
    const dx = Math.abs(e.clientX - startClickPos.current.x);
    const dy = Math.abs(e.clientY - startClickPos.current.y);
    if (dx < 15 && dy < 15) {
      setIsOpen(!isOpen);
      setShowNotification(false);
    }
  };

  const handleTouchEndAndClick = (e: React.TouchEvent) => {
    setIsDragging(false);
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - startClickPos.current.x);
    const dy = Math.abs(touch.clientY - startClickPos.current.y);
    if (dx < 25 && dy < 25) {
      setIsOpen(!isOpen);
      setShowNotification(false);
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowNotification(false);

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
          text: "I apologize, but I'm having a connection issue. Please connect with our lead agent on WhatsApp at https://wa.link/a0m76f for instant response!",
        },
      ]);
    }
  };

  if (!isMounted) return null;

  return (
    <div 
      className="fixed bottom-64 sm:bottom-72 right-6 z-[9999] flex flex-col items-end select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: "none"
      }}
    >
      {/* 1. Popup Speech Notification Bubble */}
      {showNotification && !isOpen && (
        <div className="absolute bottom-full right-0 mb-3 bg-[#000a24]/95 border border-[#b88f3a]/30 text-slate-100 text-xs px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap animate-bounce flex items-center gap-2.5 backdrop-blur-md">
          <span className="size-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>Need investment guidance? Chat with Clean & Beautiful AI!</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowNotification(false);
            }} 
            className="text-slate-400 hover:text-slate-200 ml-1 cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-50 p-4 border-b border-slate-200/60 flex justify-between items-center cursor-move" onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="Clean & Beautiful AI"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1">
                  Clean & Beautiful AI <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                </h3>
                <p className="text-[10px] text-slate-500">Luxury Assistant • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-200 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-2 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {msg.role === "model" && (
                  <div className="size-6 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/assets/logo.png"
                      alt="AI"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "p-3 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm border",
                    msg.role === "user"
                      ? "bg-amber-500 text-white border-amber-600 rounded-tr-none font-medium"
                      : "bg-white text-slate-800 border-slate-200/80 rounded-tl-none"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-start gap-2 max-w-[85%] mr-auto">
                <div className="size-6 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/assets/logo.png"
                    alt="AI"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white text-slate-500 p-3 rounded-2xl rounded-tl-none border border-slate-200/80 flex items-center gap-2">
                  <Loader2 size={12} className="animate-spin text-amber-500" />
                  <span>Clean & Beautiful AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Panel */}
          {messages.length === 1 && !isLoading && (
            <div className="p-3 border-t border-slate-100 bg-white flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSend(prompt.text)}
                  className="text-[10px] bg-slate-50 text-slate-600 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-500/30 border border-slate-200/80 px-2 py-1 rounded-full transition-all cursor-pointer"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          {/* Direct WhatsApp Concierge CTA */}
          <div className="px-4 py-2 bg-amber-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-600">
            <span>Need Lauretta directly?</span>
            <a
              href="https://wa.link/a0m76f"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-600 font-bold hover:text-amber-700"
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
            className="p-3 bg-white border-t border-slate-100 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about listings, pricing, tours..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white p-2 rounded-xl transition-all cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Bubble (Draggable & Clickable) */}
      <button
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseUp={handleMouseUpAndClick}
        onTouchEnd={handleTouchEndAndClick}
        className={cn(
          "size-14 rounded-full flex items-center justify-center text-slate-950 shadow-2xl hover:scale-105 transition-all active:scale-95 border cursor-grab border-[#b88f3a]/40 overflow-hidden",
          isOpen
            ? "bg-[#07163c] text-amber-500 hover:bg-[#000a24]"
            : "bg-[#07163c] text-slate-950 hover:bg-[#0b2259]"
        )}
        title="Clean & Beautiful AI"
      >
        {isOpen ? (
          <X size={22} className="text-amber-500" />
        ) : (
          <div className="size-14 flex items-center justify-center p-0.5 bg-[#07163c] rounded-full overflow-hidden">
            <Image
              src="/assets/logo.png"
              alt="Clean & Beautiful AI Logo"
              width={56}
              height={56}
              className="object-cover size-full scale-105"
            />
          </div>
        )}
      </button>
    </div>
  );
}
