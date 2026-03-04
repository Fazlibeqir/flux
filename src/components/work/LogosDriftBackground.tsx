"use client";

import { useEffect, useRef } from "react";

type Props = {
  logos: string[];
  className?: string;
  density?: number;
  forceMotion?: boolean;
};

type Sprite = {
  img: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  opacity: number;
};

export default function LogosDriftBackground({
  logos,
  className,
  density = 1,
  forceMotion = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const spritesRef = useRef<Sprite[]>([]);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const readyRef = useRef(false);

 
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setReduced = () => (reducedRef.current = mq.matches);
    setReduced();
    mq.addEventListener?.("change", setReduced);
    return () => mq.removeEventListener?.("change", setReduced);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let cancelled = false;

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const start = () => {
      if (!readyRef.current) return;
      if (!visibleRef.current) return;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      w = parent.clientWidth;
      h = parent.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loadImg = (src: string) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });

    const buildSprites = async () => {
      readyRef.current = false;
      spritesRef.current = [];

      if (!logos || logos.length === 0) return;

      const loaded = await Promise.all(logos.map(loadImg));
      if (cancelled) return;

      const imgs = loaded.filter(
        (i): i is HTMLImageElement => !!i && i.naturalWidth > 0
      );

      if (imgs.length === 0) return;

      const baseCount = Math.min(Math.max(imgs.length * 2, 10), 30);
      const count = Math.min(46, Math.max(10, Math.round(baseCount * density)));

      const sprites: Sprite[] = [];
      for (let i = 0; i < count; i++) {
        const img = imgs[i % imgs.length];
        const size = 90 + Math.random() * 130;
        const speed = 0.14 + Math.random() * 0.28;

        sprites.push({
          img,
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() < 0.5 ? -1 : 1) * speed,
          vy: (Math.random() < 0.5 ? -1 : 1) * speed * 0.85,
          size,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.003,
          opacity: 0.18 + Math.random() * 0.16,
        });
      }

      spritesRef.current = sprites;
      readyRef.current = true;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // soft wash
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, w, h);

      const sprites = spritesRef.current;
      const allowMotion = forceMotion ? true : !reducedRef.current;

      for (const s of sprites) {
        if (allowMotion) {
          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vr;

          const margin = s.size * 1.2;
          if (s.x < -margin) s.x = w + margin;
          if (s.x > w + margin) s.x = -margin;
          if (s.y < -margin) s.y = h + margin;
          if (s.y > h + margin) s.y = -margin;
        }

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ctx as any).filter =
          "grayscale(0.65) saturate(0.85) contrast(1.15) brightness(1.25)";
        ctx.drawImage(s.img, -s.size / 2, -s.size / 2, s.size, s.size);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ctx as any).filter = "none";

        ctx.restore();
      }

      // vignette
      const g = ctx.createRadialGradient(
        w * 0.55,
        h * 0.45,
        0,
        w * 0.55,
        h * 0.45,
        Math.max(w, h) * 0.75
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.40)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const tick = () => {
      if (cancelled) return;

      // Only run RAF while visible
      if (!visibleRef.current) {
        stop();
        return;
      }

      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    const target = canvas.parentElement ?? canvas;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = !!entry?.isIntersecting;
        if (visibleRef.current) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(target);

    // Pause on tab hidden
    const onVis = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    resize();
    window.addEventListener("resize", resize);

    buildSprites().then(() => {
      if (cancelled) return;
      draw(); // draw once
      start(); // start immediately if visible
    });


    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
      stop();
    };
  }, [logos, density, forceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0"}
      aria-hidden="true"
    />
  );
}