"use client";

import { useEffect, useRef, useCallback } from "react";

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<
    { x: number; y: number; r: number; alpha: number; speed: number }[]
  >([]);

  const initStars = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 8000), 120);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.0008 + 0.0003,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      for (const star of starsRef.current) {
        const twinkle = prefersReducedMotion
          ? star.alpha
          : star.alpha + Math.sin(time * star.speed * 60) * 0.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 114, ${Math.max(0, twinkle)})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="stars-canvas"
      aria-hidden="true"
    />
  );
}
