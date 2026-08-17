"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { birthdayData } from "@/data/birthday";

export default function PersonalMessages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-container relative py-24 md:py-32"
      aria-label="Personal Messages"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white/90 mb-20 tracking-wide"
        >
          {birthdayData.personalMessages.title}
        </motion.h2>

        <div className="space-y-12 md:space-y-16">
          {birthdayData.personalMessages.messages.map((message, i) => (
            <MessageItem key={i} message={message} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MessageItem({
  message,
  index,
}: {
  message: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="relative"
    >
      {/* Decorative quote marks */}
      <span className="absolute -top-4 -left-2 md:-left-6 text-4xl md:text-5xl font-serif text-champagne/10 select-none">
        &ldquo;
      </span>
      <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-warm-white/70 leading-relaxed px-4 md:px-8">
        {message}
      </p>
      <span className="absolute -bottom-6 -right-2 md:-right-6 text-4xl md:text-5xl font-serif text-champagne/10 select-none">
        &rdquo;
      </span>

      {/* Subtle divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="w-12 h-[1px] mx-auto mt-8 bg-champagne/15 origin-center"
      />
    </motion.div>
  );
}
