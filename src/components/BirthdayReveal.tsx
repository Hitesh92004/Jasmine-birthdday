"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { birthdayData } from "@/data/birthday";

export default function BirthdayReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nameLetters = birthdayData.name.split("");

  return (
    <section
      ref={ref}
      className="section-container relative"
      aria-label="Birthday Reveal"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg md:text-xl font-serif italic text-warm-white/60 mb-6"
        >
          {birthdayData.reveal.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="text-lg md:text-xl font-serif italic text-warm-white/60 mb-16"
        >
          {birthdayData.reveal.line2}
        </motion.p>

        <div className="w-full px-2 py-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.8 }}
            className="text-5xl sm:text-7xl md:text-9xl font-serif font-bold tracking-[0.2em] md:tracking-[0.3em] text-champagne text-glow uppercase"
            aria-label={birthdayData.name}
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  delay: 3 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 4.5 }}
          className="mt-8"
        >
          <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
