"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { birthdayData } from "@/data/birthday";

export default function EmotionalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-container relative min-h-screen"
      aria-label="Emotional message"
    >
      {/* Extra dark overlay for this section */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-navy to-midnight z-0" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl font-serif italic text-warm-white/60 leading-relaxed"
        >
          {birthdayData.emotional.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl font-serif italic text-warm-white/70 leading-relaxed mt-10"
        >
          {birthdayData.emotional.line2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 5, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl font-serif italic text-champagne/80 leading-relaxed mt-10 text-glow-subtle"
        >
          {birthdayData.emotional.line3}
        </motion.p>

        {/* Subtle center glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 3, delay: 6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,114,0.04) 0%, transparent 70%)",
          }}
        />
      </div>
    </section>
  );
}
