"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import StarsCanvas from "@/components/StarsCanvas";
import Hero from "@/components/Hero";
import BirthdayReveal from "@/components/BirthdayReveal";
import SpecialThings from "@/components/SpecialThings";
import MemoryTimeline from "@/components/MemoryTimeline";
import LoveLetter from "@/components/LoveLetter";
import EmotionalSection from "@/components/EmotionalSection";
import PersonalMessages from "@/components/PersonalMessages";
import FinalBirthday from "@/components/FinalBirthday";
import ScrollIndicator from "@/components/ScrollIndicator";
import PreBirthday from "@/components/PreBirthday";
import { birthdayData } from "@/data/birthday";

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });
const EasterEggs = dynamic(() => import("@/components/EasterEggs"), { ssr: false });

function checkIsBirthday(previewMode: boolean): boolean {
  if (previewMode) return true; // ?preview=1 unlocks the full experience
  const now = new Date();
  return (
    now.getMonth() === birthdayData.birthdayMonth &&
    now.getDate() === birthdayData.birthdayDay
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4 relative z-10">
      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-champagne/15 to-transparent" />
    </div>
  );
}

function ProgressDots({ active, total }: { active: number; total: number }) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:right-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`progress-dot ${i === active ? "active" : ""}`} />
      ))}
    </div>
  );
}

export default function Home() {
  const [hasBegun, setHasBegun] = useState(false);
  const [musicCanPlay, setMusicCanPlay] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [showScroll, setShowScroll] = useState(true);

  const sectionsRef = useRef<HTMLElement[]>([]);

  // Mount + read preview param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPreviewMode(params.get("preview") === "1");
    setMounted(true);
  }, []);

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section progress dots
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    const els = sectionsRef.current;
    els.forEach((el) => { if (el) observer.observe(el); });
    return () => { els.forEach((el) => { if (el) observer.unobserve(el); }); };
  }, [hasBegun]);

  // Lock scroll completely before beginning (including touch on mobile)
  useEffect(() => {
    if (!hasBegun) {
      // Prevent all scrolling methods
      const preventScroll = (e: Event) => { e.preventDefault(); };
      const preventKeyScroll = (e: KeyboardEvent) => {
        const scrollKeys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", "Home", "End"];
        if (scrollKeys.includes(e.key)) e.preventDefault();
      };

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
      document.documentElement.style.overflow = "hidden";

      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("keydown", preventKeyScroll, { passive: false });

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("keydown", preventKeyScroll);
      };
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.documentElement.style.overflow = "";
    }
  }, [hasBegun]);

  const handleBegin = () => {
    setHasBegun(true);
    setMusicCanPlay(true);
    setTimeout(() => {
      document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Wait for mount to avoid SSR / hydration mismatch
  if (!mounted) return null;

  const totalSections = 8;

  return (
    <main className="relative">
      <StarsCanvas />
      <MusicPlayer canPlay={musicCanPlay} />
      {hasBegun && <EasterEggs />}
      {hasBegun && <ProgressDots active={activeSection} total={totalSections} />}
      {hasBegun && showScroll && <ScrollIndicator />}

      {/* ── Hero ── */}
      <section ref={(el) => { if (el) sectionsRef.current[0] = el; }}>
        <Hero onBegin={handleBegin} />
      </section>

      {/* ── Main content (revealed after Begin) ── */}
      <div
        id="main-content"
        className={`transition-opacity duration-1000 ${hasBegun ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <section ref={(el) => { if (el) sectionsRef.current[1] = el; }}>
          <BirthdayReveal />
        </section>
        <SectionDivider />

        <section ref={(el) => { if (el) sectionsRef.current[2] = el; }}>
          <SpecialThings />
        </section>
        <SectionDivider />

        <section ref={(el) => { if (el) sectionsRef.current[3] = el; }}>
          <MemoryTimeline />
        </section>
        <SectionDivider />

        <section ref={(el) => { if (el) sectionsRef.current[4] = el; }}>
          <LoveLetter />
        </section>
        <SectionDivider />

        <section ref={(el) => { if (el) sectionsRef.current[5] = el; }}>
          <EmotionalSection />
        </section>
        <SectionDivider />

        <section ref={(el) => { if (el) sectionsRef.current[6] = el; }}>
          <PersonalMessages />
        </section>
        <SectionDivider />

        <section ref={(el) => { if (el) sectionsRef.current[7] = el; }}>
          <FinalBirthday />
        </section>
      </div>
    </main>
  );
}
