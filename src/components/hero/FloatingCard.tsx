"use client";

import type { ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

type GroupProps = ThreeElements["group"];

type Props = GroupProps & {
  variant?: "chart" | "form" | "menu";
};

export default function FloatingCard({ variant = "chart", ...props }: Props) {
  return (
    <group {...props}>
      {/* Card body */}
      <RoundedBox args={[1.45, 0.9, 0.08]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#0b1220" metalness={0.2} roughness={0.35} />
      </RoundedBox>

      {/* Soft glow plate */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.25, 0.72]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.06} />
      </mesh>

      {variant === "chart" && (
        <group position={[-0.45, -0.05, 0.06]}>
          {[0.2, 0.45, 0.32, 0.6].map((h, i) => (
            <mesh key={i} position={[i * 0.22, -0.15 + h / 2, 0]}>
              <boxGeometry args={[0.12, h, 0.02]} />
              <meshStandardMaterial
                color={i % 2 ? "#22d3ee" : "#60a5fa"}
                emissive={i % 2 ? "#22d3ee" : "#60a5fa"}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      )}

      {variant === "form" && (
        <group position={[-0.45, 0.15, 0.06]}>
          {[0, -0.22, -0.44].map((y, i) => (
            <mesh key={i} position={[0.28, y, 0]}>
              <boxGeometry args={[0.9, 0.07, 0.01]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          ))}
          <mesh position={[0.15, -0.48, 0]}>
            <boxGeometry args={[0.35, 0.12, 0.02]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {variant === "menu" && (
        <group position={[-0.35, 0.2, 0.06]}>
          {[0, -0.22, -0.44].map((y, i) => (
            <group key={i} position={[0, y, 0]}>
              <mesh position={[-0.35, 0, 0]}>
                <boxGeometry args={[0.18, 0.12, 0.01]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0.02, 0.02, 0]}>
                <boxGeometry args={[0.55, 0.03, 0.01]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
              <mesh position={[0.02, -0.03, 0]}>
                <boxGeometry args={[0.35, 0.025, 0.01]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}