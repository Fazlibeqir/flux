"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, Environment, Float } from "@react-three/drei";
import Scene from "./Scene";

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#05070a"]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={1.1} color="#22d3ee" />

      <Suspense fallback={null}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Scene />
        </Float>

        {/* Optional studio-like reflections if you add metallic materials later */}
        <Environment preset="city" />
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}