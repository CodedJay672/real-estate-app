"use client";

import { useState } from "react";
import { FAQItems } from "../../constants";
import { IoCaretDownOutline } from "react-icons/io5";

const FAQ = () => {
  const [qstIndex, setQstIndex] = useState<number | null>(null);

  const handleQstChange = (index: number) => {
    setQstIndex(qstIndex === index ? null : index);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-20 px-4 md:px-10 bg-slate-50/50">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b88f3a] bg-[#f5c344]/10 px-3 py-1.5 rounded-full">
          Support Center
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-slate-950 mt-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-4 leading-relaxed">
          Find answers to common questions about our services, properties and even the real estate terrain as a whole. We are here to make sure that you are fully informed every step of the way.
        </p>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/5 space-y-4">
        {FAQItems.map((item, idx) => {
          const isOpen = qstIndex === idx;
          return (
            <div
              key={idx}
              className={`group cursor-pointer rounded-[1.25rem] border transition-all duration-300 p-6 ${
                isOpen
                  ? "border-[#b88f3a]/40 bg-white shadow-md"
                  : "border-slate-200/70 bg-white/70 hover:bg-white hover:border-[#b88f3a]/20 shadow-sm"
              }`}
              onClick={() => handleQstChange(idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-base font-semibold text-slate-950 flex-1 transition-colors group-hover:text-[#b88f3a]">
                  {item.question}
                </p>
                <IoCaretDownOutline 
                  size={16} 
                  className={`shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#b88f3a]" : "text-slate-400 group-hover:text-slate-600"
                  }`} 
                />
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed pt-3 border-t border-slate-100">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
