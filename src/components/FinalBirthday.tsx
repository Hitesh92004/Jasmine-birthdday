"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { birthdayData } from "@/data/birthday";

// Floating petals component
function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 4 + Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal absolute rounded-full"
          style={{
            left: `${petal.left}%`,
            top: "-10px",
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            background: `radial-gradient(circle, rgba(201,160,160,${petal.opacity}) 0%, rgba(212,175,114,${petal.opacity * 0.5}) 100%)`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Glowing particles
function GlowParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              "radial-gradient(circle, rgba(212,175,114,0.6) 0%, transparent 70%)",
            boxShadow: "0 0 8px rgba(212,175,114,0.3)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function FinalBirthday() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showFinal, setShowFinal] = useState(false);
  const [showClosing, setShowClosing] = useState(false);

  // Reset states when component mounts
  useEffect(() => {
    setShowFinal(false);
    setShowClosing(false);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
      aria-label="Final Birthday"
    >
      {/* Warm gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 3 }}
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,114,0.06) 0%, rgba(10,10,15,1) 70%)",
        }}
      />

      {isInView && <FloatingPetals />}
      {isInView && <GlowParticles />}

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key="birthday-main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-sm tracking-[0.35em] uppercase text-champagne/40 font-sans mb-8"
              >
                ✦
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{ duration: 1.5, delay: 1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-warm-white/90 tracking-wider mb-4"
              >
                HAPPY BIRTHDAY
              </motion.h2>

              <motion.h2
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : {}
                }
                transition={{ duration: 1.5, delay: 2 }}
                className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-champagne text-glow tracking-[0.12em] mb-8"
              >
                {birthdayData.name.toUpperCase()}{" "}
                <span className="text-rose-muted">❤️</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 3.5 }}
                className="text-lg md:text-xl font-serif italic text-warm-white/50 mb-12 max-w-md"
              >
                {birthdayData.finale.subtitle}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 4.5 }}
                onClick={() => setShowFinal(true)}
                className="px-8 py-3.5 text-sm md:text-base tracking-[0.15em]
                  font-sans font-medium
                  border border-champagne/30 text-champagne/90
                  rounded-full
                  hover:bg-champagne/10 hover:border-champagne/50
                  active:scale-95
                  transition-all duration-500"
              >
                {birthdayData.finale.buttonText}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="final-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="flex flex-col items-center gap-10"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl font-serif italic text-warm-white/70 leading-relaxed max-w-lg"
              >
                {birthdayData.finale.finalMessage}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.5 }}
                onAnimationComplete={() =>
                  setTimeout(() => setShowClosing(true), 500)
                }
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
              />

              {showClosing && (
                <motion.h3
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-serif text-champagne text-glow-rose tracking-wide"
                >
                  {birthdayData.finale.closing}
                </motion.h3>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
