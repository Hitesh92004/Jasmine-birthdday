"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/data/birthday";

export default function Hero({ onBegin }: { onBegin: () => void }) {
  const [phase, setPhase] = useState(0);

  // Phase 0: line1
  // Phase 1: line2
  // Phase 2: greeting + name + button

  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        window.dispatchEvent(new CustomEvent("trigger-search-egg"));
        return 0;
      }
      return next;
    });
  };

  return (
    <section
      className="section-container relative overflow-hidden"
      aria-label="Welcome"
    >
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="line1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onAnimationComplete={() => setTimeout(() => setPhase(1), 2000)}
              className="text-lg md:text-xl font-light text-warm-white/70 font-serif italic tracking-wide"
            >
              {birthdayData.hero.line1}
            </motion.p>
          )}

          {phase === 1 && (
            <motion.p
              key="line2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onAnimationComplete={() => setTimeout(() => setPhase(2), 2200)}
              className="text-lg md:text-xl font-light text-warm-white/70 font-serif italic tracking-wide"
            >
              {birthdayData.hero.line2}
            </motion.p>
          )}

          {phase === 2 && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xl md:text-2xl font-serif text-warm-white/80 tracking-wide"
              >
                {birthdayData.hero.greeting}
              </motion.p>
              <motion.h1
                onClick={handleTap}
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="text-3xl xs:text-5xl sm:text-6xl md:text-8xl font-serif font-semibold text-champagne text-glow tracking-wide xs:tracking-wider select-none"
              >
                {birthdayData.name} <span className="text-rose-muted">❤️</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <button
                  onClick={onBegin}
                  className="mt-8 px-8 py-3.5 text-sm md:text-base tracking-[0.2em] uppercase
                    font-sans font-medium
                    border border-champagne/30 text-champagne/90
                    rounded-full
                    hover:bg-champagne/10 hover:border-champagne/50 hover:text-champagne
                    active:scale-95
                    transition-all duration-500 ease-out
                    backdrop-blur-sm"
                  aria-label="Begin the experience"
                >
                  Begin →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
