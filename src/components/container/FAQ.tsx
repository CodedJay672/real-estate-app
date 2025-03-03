"use client";

import { useState } from "react";
import { FAQItems } from "../../constants";
import { IoCaretDownOutline } from "react-icons/io5";

const FAQ = () => {
  const [qstIndex, setQstIndex] = useState<number | null>(null);

  const handleQstChange = (index: number) => {
    setQstIndex(index);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-10 px-2">
      <h2 className="text-3xl lg:text-4xl px-10 font-bold text-blue-300 text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-sm md:text-base lg:text-lg my-2 px-10 text-center">
        Find answers to common questions about our services and properties.
      </p>
      <div className="w-full md:w-4/5 lg:w-3/5">
        {FAQItems.map((item, idx) => (
          <div
            key={idx}
            className="hover:bg-blue-50 cursor-pointer rounded-lg transition-all py-2 px-4 my-6 md:my-7 lg:my-8"
            onClick={() => handleQstChange(idx)}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm md:text-base font-light flex-1">
                {item.question}
              </p>
              <IoCaretDownOutline size={10} className="text-blue-300 ml-20" />
            </div>
            <p
              className={`animate-in slide-in-from-top-6 text-gray-900 text-xs md:text-sm lg:text-base transition-all ${
                qstIndex === idx ? "block px-2 py-6" : "hidden"
              }`}
            >
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
