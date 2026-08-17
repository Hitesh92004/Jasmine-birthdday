"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30
        flex flex-col items-center gap-1 text-champagne/20"
    >
      <span className="text-[10px] tracking-[0.3em] uppercase font-sans">
        Scroll
      </span>
      <ChevronDown size={16} className="float-arrow" />
    </motion.div>
  );
}
