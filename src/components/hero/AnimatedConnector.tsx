"use client";

import type { ThreeElements } from "@react-three/fiber";
import {useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type GroupProps = ThreeElements["group"];

type Props = GroupProps & {
  length?: number;
  radius?: number;
  color?: string;
  speed?: number;
  opacity?: number;
};

export default function AnimatedConnector({
  length = 2,
  radius = 0.01,
  color = "#22d3ee",
  speed = 0.6,
  opacity = 0.3,
  ...props
}: Props) {
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!pulseRef.current) return;

    const t = (state.clock.elapsedTime * speed) % 1; // 0..1
    // cylinder extends on Y axis by default, so animate pulse along local Y
    pulseRef.current.position.y = -length / 2 + t * length;

    const s = 0.9 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
    pulseRef.current.scale.setScalar(s);
  });

  return (
    <group {...props}>
      {/* Base line */}
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Traveling data pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[radius * 2.2, 14, 14]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}