"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export default function MusicPlayer({ canPlay }: { canPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = 0.35;
      await audio.play();
      setIsPlaying(true);
    } catch {
      setHasAudio(false);
    }
  }, []);

  useEffect(() => {
    if (canPlay) tryPlay();
  }, [canPlay, tryPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setHasAudio(false));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  if (!hasAudio) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={birthdayData.musicPath}
        loop
        preload="none"
        onError={() => setHasAudio(false)}
      />
      <div
        className="fixed top-5 right-5 z-50 flex items-center gap-2"
        style={{ opacity: canPlay ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-9 h-9 rounded-full flex items-center justify-center
            border border-champagne/20 bg-midnight/80 backdrop-blur-md
            text-champagne/60 hover:text-champagne hover:border-champagne/40
            transition-all duration-300"
        >
          {isPlaying ? (
            <span className="flex gap-[2px] items-end h-3">
              <span className="w-[2px] bg-champagne rounded-full eq-bar" />
              <span className="w-[2px] bg-champagne rounded-full eq-bar-2" />
              <span className="w-[2px] bg-champagne rounded-full eq-bar-3" />
            </span>
          ) : (
            <span className="text-xs tracking-wider">▶</span>
          )}
        </button>

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="w-9 h-9 rounded-full flex items-center justify-center
            border border-champagne/20 bg-midnight/80 backdrop-blur-md
            text-champagne/60 hover:text-champagne hover:border-champagne/40
            transition-all duration-300"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </>
  );
}
