"use client";

import type { ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

type GroupProps = ThreeElements["group"];

export default function PhoneFrame(props: GroupProps) {
  return (
    <group {...props}>
      {/* Body */}
      <RoundedBox args={[1.05, 2.0, 0.12]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#0f172a" metalness={0.35} roughness={0.3} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[0.88, 1.75]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>

      {/* App UI blocks */}
      <mesh position={[0, 0.55, 0.075]}>
        <planeGeometry args={[0.7, 0.22]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {[0.2, -0.08, -0.36].map((y, i) => (
        <mesh key={i} position={[0, y, 0.075]}>
          <planeGeometry args={[0.75, 0.18]} />
          <meshStandardMaterial color={i % 2 ? "#111827" : "#1e293b"} />
        </mesh>
      ))}

      {/* CTA */}
      <mesh position={[0, -0.75, 0.078]}>
        <planeGeometry args={[0.48, 0.14]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}