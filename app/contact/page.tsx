"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    // Arbitrary pt-[250px] to force the Tailwind JIT compiler to build a new class
    <main className="min-h-screen bg-[#020202] pt-[250px] pb-32 px-6 md:px-16 flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* WE CHANGED THE TEXT HERE TO TEST SYNC */}
        <motion.div variants={itemVariants} className="text-center mb-32">
          <h1 className="text-5xl md:text-7xl text-white font-semibold tracking-tight mb-8">Let's Connect</h1>
          <p className="text-[#A6A6A6] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Our systems are online. Drop us a message below.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
          {/* Email Card */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3 className="text-white font-medium text-2xl mb-4">Email Directory</h3>
            <p className="text-[#A6A6A6] font-light text-lg">contact@aintrix.com</p>
          </motion.div>

          {/* Phone Card */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 className="text-white font-medium text-2xl mb-4">Direct Line</h3>
            <p className="text-[#A6A6A6] font-light text-lg">+91 98765 43210</p>
          </motion.div>

          {/* Location Card */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3 className="text-white font-medium text-2xl mb-4">Global HQ</h3>
            <p className="text-[#A6A6A6] font-light text-lg">Chennai, Tamil Nadu</p>
          </motion.div>
        </motion.div>

        {/* Bottom Split Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl text-white font-medium mb-12">Send a Message</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border-b border-white/20 rounded-t-xl px-6 py-5 text-white placeholder-[#888] focus:border-white focus:bg-white/10 focus:outline-none transition-all duration-300" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border-b border-white/20 rounded-t-xl px-6 py-5 text-white placeholder-[#888] focus:border-white focus:bg-white/10 focus:outline-none transition-all duration-300" />
              </div>
              <input type="tel" placeholder="Phone Number (Optional)" className="w-full bg-white/[0.03] border-b border-white/20 rounded-t-xl px-6 py-5 text-white placeholder-[#888] focus:border-white focus:bg-white/10 focus:outline-none transition-all duration-300" />
              <input type="text" placeholder="Subject" className="w-full bg-white/[0.03] border-b border-white/20 rounded-t-xl px-6 py-5 text-white placeholder-[#888] focus:border-white focus:bg-white/10 focus:outline-none transition-all duration-300" />
              <textarea placeholder="Your Message" rows={6} className="w-full bg-white/[0.03] border-b border-white/20 rounded-t-xl px-6 py-5 text-white placeholder-[#888] focus:border-white focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"></textarea>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                className="w-full bg-white text-black font-medium text-lg py-5 rounded-xl hover:bg-[#E5E5E5] transition-colors flex justify-center items-center gap-3 mt-4"
              >
                Submit Message <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </motion.button>
            </form>
          </div>

          {/* Right: Office Hours */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl text-white font-medium mb-12">Operating Hours</h2>
                
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-white font-medium">Monday – Friday</span>
                    <span className="text-[#A6A6A6] font-light">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-white font-medium">Saturday</span>
                    <span className="text-[#A6A6A6] font-light">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-6">
                    <span className="text-white font-medium">Sunday</span>
                    <span className="text-[#666] font-light">Closed</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-sm text-[#A6A6A6] font-light leading-relaxed">
                  <span className="text-white font-medium block mb-2 text-base">Global Infrastructure</span>
                  Monitored 24/7 by our technical teams.
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </main>
  );
}