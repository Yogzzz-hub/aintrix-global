"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    // pt-[160px] clears the fixed navbar (top-6 + h-[60px] = ~84px) with generous breathing room
    <div id="contact-main" className="min-h-screen bg-[#020202] pt-[160px] pb-16 px-4 sm:px-6 md:px-16 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight mb-4">Let's Connect</h1>
          <p className="text-[#A6A6A6] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Our systems are online. Drop us a message below.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Email Card */}
          <motion.div whileHover={{ scale: 1.01, y: -4 }} className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3 className="text-white font-medium text-xl mb-1">Email Directory</h3>
            <p className="text-[#A6A6A6] font-light text-base">contact@aintrix.com</p>
          </motion.div>

          {/* Phone Card */}
          <motion.div whileHover={{ scale: 1.01, y: -4 }} className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 className="text-white font-medium text-xl mb-1">Direct Line</h3>
            <p className="text-[#A6A6A6] font-light text-base">+91 98765 43210</p>
          </motion.div>

          {/* Location Card */}
          <motion.div whileHover={{ scale: 1.01, y: -4 }} className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3 className="text-white font-medium text-xl mb-1">Global HQ</h3>
            <p className="text-[#A6A6A6] font-light text-base">Chennai, Tamil Nadu</p>
          </motion.div>
        </motion.div>

        {/* Bottom Form & Hours Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-2xl text-white font-medium mb-8">Send a Message</h2>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-[#666] focus:border-white/40 focus:outline-none transition-all" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-[#666] focus:border-white/40 focus:outline-none transition-all" />
              </div>
              <input type="tel" placeholder="Phone Number (Optional)" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-[#666] focus:border-white/40 focus:outline-none transition-all" />
              <input type="text" placeholder="Subject" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-[#666] focus:border-white/40 focus:outline-none transition-all" />
              <textarea placeholder="Your Message" rows={5} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-[#666] focus:border-white/40 focus:outline-none transition-all resize-none"></textarea>
              <button type="button" className="w-full bg-white text-black font-medium text-base py-4 rounded-xl hover:bg-[#E5E5E5] transition-colors flex justify-center items-center gap-2">
                Submit Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between h-full">
              <h2 className="text-2xl text-white font-medium mb-8">Operating Hours</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white font-medium">Monday – Friday</span>
                  <span className="text-[#A6A6A6] font-light">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white font-medium">Saturday</span>
                  <span className="text-[#A6A6A6] font-light">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Sunday</span>
                  <span className="text-[#666] font-light">Closed</span>
                </div>
              </div>
              <div className="mt-12 border-t border-white/5 pt-6 text-center">
                <span className="text-xs uppercase tracking-widest text-[#555] block mb-1 font-semibold">Global Infrastructure</span>
                <span className="text-sm text-[#888] font-light">Monitored 24/7 by our technical teams.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}