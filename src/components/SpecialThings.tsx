"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { birthdayData } from "@/data/birthday";

export default function SpecialThings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-container relative py-24 md:py-32"
      aria-label="Why you're special"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-warm-white/90 mb-20 md:mb-28 tracking-wide"
        >
          {birthdayData.specialThings.title}
        </motion.h2>

        <div className="space-y-16 md:space-y-24">
          {birthdayData.specialThings.items.map((item, i) => (
            <SpecialCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialCard({
  item,
  index,
}: {
  item: { title: string; message: string };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
      className={`flex flex-col ${isEven ? "md:items-start" : "md:items-end"} items-center`}
    >
      <div
        className={`max-w-lg w-full p-6 sm:p-8 md:p-10 rounded-2xl
          border border-champagne/8 bg-charcoal/40 backdrop-blur-sm
          relative overflow-hidden group
          hover:border-champagne/15 transition-all duration-700`}
      >
        {/* Subtle gradient accent */}
        <div
          className={`absolute top-0 ${isEven ? "left-0" : "right-0"} w-32 h-32 
            bg-gradient-to-br from-champagne/5 to-transparent rounded-full blur-2xl
            group-hover:from-champagne/8 transition-all duration-700`}
        />

        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-serif text-champagne/90 mb-4 tracking-wide">
            {item.title}
          </h3>
          <p className="text-base md:text-lg font-light text-warm-white/60 leading-relaxed font-sans">
            {item.message}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className={`absolute bottom-0 ${isEven ? "left-0 origin-left" : "right-0 origin-right"} 
            h-[1px] w-full bg-gradient-to-r from-champagne/20 via-champagne/10 to-transparent`}
        />
      </div>
    </motion.div>
  );
}
