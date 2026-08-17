"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { birthdayData } from "@/data/birthday";

function MemoryImage({
  src,
  alt,
  className,
  isFirst = false,
}: {
  src: string;
  alt: string;
  className?: string;
  isFirst?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`image-placeholder ${className || ""}`}>
        <Camera size={28} strokeWidth={1} />
        <span className="text-xs tracking-wider opacity-60">
          Replace with your photo
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 90vw, 500px"
      className={`object-cover ${className || ""}`}
      onError={() => setError(true)}
      {...(isFirst ? { priority: true, loading: "eager" as const } : { loading: "lazy" as const })}
    />
  );
}

export default function MemoryTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative"
      aria-label="Memory Timeline"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-warm-white/90 mb-20 md:mb-28 tracking-wide"
        >
          {birthdayData.memories.title}
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-champagne/20 to-transparent" />

          <div className="space-y-20 md:space-y-28">
            {birthdayData.memories.items.map((memory, i) => (
              <TimelineItem key={i} memory={memory} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  memory,
  index,
}: {
  memory: {
    image: string;
    chapter: string;
    title: string;
    caption: string;
  };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-start gap-8
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
        pl-12 md:pl-0`}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-2 w-[10px] h-[10px] rounded-full bg-champagne/60 border-2 border-midnight z-10 shadow-[0_0_12px_rgba(212,175,114,0.3)]"
      />

      {/* Image side */}
      <div
        className={`w-full md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <MemoryImage src={memory.image} alt={memory.caption} isFirst={index === 0} />
        </div>
      </div>

      {/* Text side */}
      <div
        className={`w-full md:w-[45%] ${
          isEven ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"
        }`}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-champagne/40 font-sans mb-2 block"
        >
          {memory.chapter}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-xl md:text-2xl font-serif text-warm-white/80 mb-3"
        >
          {memory.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-sm md:text-base text-warm-white/40 font-light leading-relaxed"
        >
          {memory.caption}
        </motion.p>
      </div>
    </motion.div>
  );
}
