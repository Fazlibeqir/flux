"use client";

import type { ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

type GroupProps = ThreeElements["group"];

export default function BrowserFrame(props: GroupProps) {
  return (
    <group {...props}>
      {/* Outer frame */}
      <RoundedBox args={[3.8, 2.2, 0.12]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#0f172a" metalness={0.25} roughness={0.35} />
      </RoundedBox>

      {/* Top bar */}
      <mesh position={[0, 0.95, 0.07]}>
        <planeGeometry args={[3.5, 0.28]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Three traffic lights */}
      {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
        <mesh key={c} position={[-1.45 + i * 0.16, 0.95, 0.09]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.15} />
        </mesh>
      ))}

      {/* Main content panel */}
      <mesh position={[0, -0.05, 0.07]}>
        <planeGeometry args={[3.45, 1.75]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>

      {/* Fake dashboard blocks */}
      <mesh position={[-0.95, 0.2, 0.08]}>
        <planeGeometry args={[1.05, 0.8]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0.65, 0.28, 0.08]}>
        <planeGeometry args={[1.95, 0.65]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0.65, -0.55, 0.08]}>
        <planeGeometry args={[1.95, 0.75]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Accent lines */}
      {[
        [-0.95, 0.55, 0.09, 0.75],
        [0.25, 0.5, 0.09, 1.2],
        [0.85, 0.5, 0.09, 0.8],
        [0.3, -0.35, 0.09, 1.35],
      ].map(([x, y, z, w], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <planeGeometry args={[w as number, 0.04]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}