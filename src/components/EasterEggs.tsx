"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Search, X } from "lucide-react";
import { birthdayData } from "@/data/birthday";

// Easter Egg 1: Clicking the star
function StarEasterEgg() {
  const [found, setFound] = useState(false);

  return (
    <>
      <button
        onClick={() => setFound(true)}
        className="fixed bottom-6 left-6 z-40 w-8 h-8 flex items-center justify-center
          text-champagne/10 hover:text-champagne/30 transition-colors duration-500"
        aria-label="A hidden surprise"
        title=""
      >
        <Star size={12} />
      </button>

      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/95 backdrop-blur-md"
            onClick={() => setFound(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center max-w-sm px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl font-serif italic text-warm-white/70 mb-6"
              >
                {birthdayData.easterEggs.starMessage.line1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl md:text-2xl font-serif text-champagne/90"
              >
                {birthdayData.easterEggs.starMessage.line2}
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setFound(false)}
                className="mt-8 text-warm-white/30 hover:text-warm-white/50 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Easter Egg 2: Console-style search
function SearchEasterEgg() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState(0);

  const handleTrigger = useCallback(() => {
    setOpen(true);
    setPhase(0);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ctrl/Cmd + Shift + F to trigger
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
      e.preventDefault();
      handleTrigger();
    }
  }, [handleTrigger]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-search-egg", handleTrigger);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-search-egg", handleTrigger);
    };
  }, [handleKeyDown, handleTrigger]);

  useEffect(() => {
    if (!open) return;
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/95 backdrop-blur-md"
          onClick={() => {
            setOpen(false);
            setPhase(0);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-charcoal/80 border border-champagne/10 rounded-xl p-8 max-w-sm w-[90vw] font-mono text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-champagne/40 mb-4">
              <Search size={14} />
              <span className="text-xs tracking-wider">SEARCH</span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-warm-white/50 mb-2"
            >
              {`> ${birthdayData.easterEggs.searchResult.query}`}
            </motion.p>

            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-champagne/30 mb-2"
              >
                <span className="inline-block animate-pulse">
                  Scanning...
                </span>
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-champagne/50 text-xs mb-1">
                  Result found:
                </p>
                <p className="text-xl font-serif text-champagne mt-2">
                  {birthdayData.easterEggs.searchResult.result}
                </p>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              onClick={() => {
                setOpen(false);
                setPhase(0);
              }}
              className="mt-6 text-warm-white/20 hover:text-warm-white/40 text-xs transition-colors"
            >
              close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EasterEggs() {
  return (
    <>
      <StarEasterEgg />
      <SearchEasterEgg />
    </>
  );
}
