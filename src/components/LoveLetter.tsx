"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export default function LoveLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      ref={ref}
      className="section-container relative py-24 md:py-32"
      aria-label="Love Letter"
    >
      <div className="max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope-view"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif text-warm-white/80 tracking-wide"
              >
                {birthdayData.loveLetter.intro}
              </motion.h2>

              {/* Envelope */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="envelope-wrapper"
              >
                <div className="envelope">
                  <div className="envelope-body" />
                  <div className="envelope-flap" />
                  <div className="envelope-seal">
                    <Heart size={14} className="text-midnight" fill="currentColor" />
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                onClick={() => setIsOpen(true)}
                className="px-8 py-3.5 text-sm md:text-base tracking-[0.15em]
                  font-sans font-medium
                  border border-champagne/30 text-champagne/90
                  rounded-full
                  hover:bg-champagne/10 hover:border-champagne/50
                  active:scale-95
                  transition-all duration-500"
              >
                {birthdayData.loveLetter.buttonText}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="letter-view"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full"
            >
              {/* Open envelope animation */}
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ duration: 0.8 }}
                className="envelope-wrapper mb-8"
              >
                <div className="envelope mx-auto">
                  <div className="envelope-body" />
                  <div className="envelope-flap open" />
                  <div className="envelope-seal hidden" />
                </div>
              </motion.div>

              {/* Letter */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="letter-paper max-w-lg mx-auto p-6 sm:p-8 md:p-12 text-left"
              >
                <p className="text-xl md:text-2xl font-serif mb-8 text-[#2a2318]">
                  {birthdayData.loveLetter.greeting}
                </p>

                <div className="space-y-6">
                  {birthdayData.loveLetter.paragraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.2 + i * 0.4,
                      }}
                      className="text-base md:text-lg leading-relaxed font-handwritten text-[#3d3225]"
                      style={{ fontSize: "clamp(1.05rem, 4.5vw, 1.25rem)" }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay:
                      1.2 +
                      birthdayData.loveLetter.paragraphs.length * 0.4 +
                      0.5,
                  }}
                  className="mt-10 pt-6 border-t border-[#d4c5a8]"
                >
                  <p className="text-base font-handwritten text-[#3d3225]">
                    {birthdayData.loveLetter.closing}
                  </p>
                  <p className="text-lg font-handwritten text-[#2a2318] mt-1 font-semibold">
                    {birthdayData.loveLetter.signature}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
