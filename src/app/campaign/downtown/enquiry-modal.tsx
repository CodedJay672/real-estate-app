"use client";

import Link from 'next/link';
import { useState } from 'react';


import CustomDialog from '@/components/shared/CustomDialog';

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [formInputs, setFormInputs] = useState({
    fullName: "",
    phone: "",
    plot: ""
  })

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const message = `Hello, I am ${formInputs.fullName} (${formInputs.phone}), and I want to reserve ${formInputs.plot} plots of Downtown Lagos`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=+2349046439376&text=${encodedMessage}`;
    window.location.href = url;
    setIsOpen(false);
    setFormInputs({
      fullName: "",
      phone: "",
      plot: ""
    })
  }
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full h-full bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-full font-bold transition-all text-xs uppercase tracking-widest active:scale-95"
      >
        Enquire Now
      </button>

      <CustomDialog open={isOpen} onOpenChange={setIsOpen} title='' description=''>

        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        <div className="relative w-full bg-[#0a0a0a] border border-white/10 p-2 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="mb-8">
            <h2 className="text-3xl font-black italic text-yellow-500 tracking-tighter">SECURE YOUR PLOT</h2>
            <p className="text-gray-400 text-sm mt-2">Downtown Commercial City - Phase 2</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullname" className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Full Name</label>
              <input id="fullname" name="fullname" required type="text" value={formInputs.fullName} onChange={(e) => setFormInputs({ ...formInputs, fullName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-500/50 transition-all text-white" placeholder="Enter your full name" />
            </div>
            <div>
              <label htmlFor='phone' className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Phone (WhatsApp)</label>
              <input id='phone' name="phone" required type="tel" value={formInputs.phone} onChange={(e) => setFormInputs({ ...formInputs, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-500/50 transition-all text-white" placeholder="+234..." />
            </div>
            <div>
              <label htmlFor='plot' className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Plot of Interest</label>
              <div className="relative">
                <select id='plot' name="plot" value={formInputs.plot} onChange={(e) => setFormInputs({ ...formInputs, plot: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-500/50 transition-all text-white appearance-none cursor-pointer">
                  <option className="bg-black" value="500sqm">500 SQM - N60 Million</option>
                  <option className="bg-black" value="1000sqm">1000 SQM - N100 Million</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-5 rounded-xl mt-4 uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(234,179,8,0.2)] active:scale-[0.98]">
              Reserve my land now
            </button>

            <p className="block text-[10px] text-center uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Prefer to chat? <Link href="https://wa.link/a0m76f" className='text-yellow-500'>Whatsapp us directly</Link></p>
          </form>
        </div>
      </CustomDialog>
    </>
  );
}
