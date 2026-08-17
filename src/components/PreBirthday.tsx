"use client";

import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";

export default function PreBirthday() {
  return (
    <div className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-6 text-center relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,114,0.04) 0%, transparent 70%)",
        }}
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-4xl sm:text-5xl font-serif text-champagne/80 text-glow mb-6"
      >
        {birthdayData.preBirthday.message}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-base md:text-lg font-sans font-light text-warm-white/40 tracking-wide"
      >
        {birthdayData.preBirthday.subtitle}
      </motion.p>
    </div>
  );
}
