"use client";
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, Environment, Float } from "@react-three/drei";
import Scene from "./Scene";

function useIsMobile() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 640px)").matches;
  }, []);
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