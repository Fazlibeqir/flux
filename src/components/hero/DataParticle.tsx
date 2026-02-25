"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seededRandom(seed: number) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }

export default function DataParticles() {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
      const count = 180;
      const arr = new Float32Array(count * 3);
  
      for (let i = 0; i < count; i++) {
        const r1 = seededRandom(i + 1);
        const r2 = seededRandom(i + 101);
        const r3 = seededRandom(i + 1001);
  
        arr[i * 3 + 0] = (r1 - 0.5) * 6;
        arr[i * 3 + 1] = (r2 - 0.5) * 4;
        arr[i * 3 + 2] = (r3 - 0.5) * 3;
      }
  
      return arr;
    }, []);
  
    useFrame((state) => {
      if (!pointsRef.current) return;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    });
  
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#38bdf8"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    );
  }