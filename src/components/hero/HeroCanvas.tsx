"use client";
import { Suspense, useEffect, useMemo, useRef  } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Float } from "@react-three/drei";
import Scene from "./Scene";

function useIsMobile() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 640px)").matches;
  }, []);
}
function FrameTicker({ fps }: { fps: number }) {
  const { invalidate } = useThree();
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let stopped = false;
    const interval = Math.max(16, Math.floor(1000 / fps));

    const tick = () => {
      if (stopped) return;
      invalidate();
      raf.current = window.setTimeout(tick, interval) as unknown as number;
    };

    // start
    tick();

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        stopped = true;
        if (raf.current) window.clearTimeout(raf.current);
        raf.current = null;
      } else {
        if (!stopped) return;
        stopped = false;
        tick();
      }
    };

    document.addEventListener("visibilitychange", onVis);
    return () => {
      stopped = true;
      if (raf.current) window.clearTimeout(raf.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fps, invalidate]);

  return null;
}

export default function HeroCanvas() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 8], fov: 45 }}
      // Lower DPR on mobile to reduce work
      dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      // Turn off AA on mobile (big perf win)
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05070a"]} />

      <FrameTicker fps={isMobile ? 18 : 30} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={1.1} color="#22d3ee" />

      <Suspense fallback={null}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Scene />
        </Float>

        {/* Environment can be heavy; keep it on desktop, simplify on mobile */}
        {!isMobile && <Environment preset="city" />}
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}