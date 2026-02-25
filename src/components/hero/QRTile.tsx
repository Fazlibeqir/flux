"use client";

import type { ThreeElements} from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import QRCode from "qrcode";

type GroupProps = ThreeElements["group"];

type ModuleCell = { x: number; y: number; dark: boolean };

type Props = GroupProps & {
  value?: string;
};

export default function QRTile({
  value = "https://yourfluxdomain.com",
  ...props
}: Props) {
  const group = useRef<THREE.Group>(null);
  const scanLine = useRef<THREE.Mesh>(null);

  const [cells, setCells] = useState<ModuleCell[]>([]);
  const [size, setSize] = useState<number>(21);

  useEffect(() => {
    let mounted = true;

    async function buildQR() {
      try {
        const qr = await QRCode.create(value, {
          errorCorrectionLevel: "M",
        });

        // qrcode library stores modules in a flat array
        const s = qr.modules.size;
        const data = qr.modules.data; // boolean[]

        const nextCells: ModuleCell[] = [];
        for (let y = 0; y < s; y++) {
          for (let x = 0; x < s; x++) {
            const idx = y * s + x;
            nextCells.push({ x, y, dark: Boolean(data[idx]) });
          }
        }

        if (!mounted) return;
        setCells(nextCells);
        setSize(s);
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    }

    buildQR();
    return () => {
      mounted = false;
    };
  }, [value]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.z = Math.sin(time * 0.45) * 0.02;
      group.current.rotation.y = Math.sin(time * 0.22) * 0.03;
      group.current.position.z = Math.sin(time * 0.8) * 0.02;
    }

    if (scanLine.current) {
      const y = 0.56 - ((time * 0.35) % 1) * 1.12;
      scanLine.current.position.y = y;
      scanLine.current.scale.x = 1 + Math.sin(time * 3.0) * 0.02;
    }
  });

  const tileSize = 1.38;
  const quietZone = 0.12;
  const qrPlateSize = tileSize - quietZone * 2;
  const moduleSize = qrPlateSize / Math.max(size, 1);

  // Precompute finder-ish highlight zones for a subtle style accent
  const finderZones = useMemo(() => {
    const s = size;
    return [
      { x: 0, y: 0, w: 7, h: 7 },
      { x: s - 7, y: 0, w: 7, h: 7 },
      { x: 0, y: s - 7, w: 7, h: 7 },
    ];
  }, [size]);

  const isInFinderZone = (x: number, y: number) =>
    finderZones.some((z) => x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.h);

  return (
    <group ref={group} {...props}>
      {/* Tile base */}
      <mesh>
        <boxGeometry args={[tileSize, tileSize, 0.07]} />
        <meshStandardMaterial color="#0b1220" metalness={0.12} roughness={0.42} />
      </mesh>

      {/* QR white plate */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[qrPlateSize, qrPlateSize, 0.012]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} metalness={0.02} />
      </mesh>

      {/* Render real QR modules */}
      {cells.map((c, i) => {
        if (!c.dark) return null;

        const x = -qrPlateSize / 2 + moduleSize / 2 + c.x * moduleSize;
        const y = qrPlateSize / 2 - moduleSize / 2 - c.y * moduleSize;
        const finder = isInFinderZone(c.x, c.y);

        return (
          <mesh key={i} position={[x, y, 0.055]}>
            <boxGeometry
              args={[
                moduleSize * 0.88,
                moduleSize * 0.88,
                finder ? 0.02 : 0.014,
              ]}
            />
            <meshStandardMaterial
              color={finder ? "#020617" : "#0f172a"}
              emissive={finder ? "#0ea5e9" : "#000000"}
              emissiveIntensity={finder ? 0.04 : 0}
              metalness={0.04}
              roughness={0.45}
            />
          </mesh>
        );
      })}

      {/* Scan line */}
      <mesh ref={scanLine} position={[0, 0.15, 0.09]}>
        <boxGeometry args={[qrPlateSize * 0.98, 0.024, 0.01]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>

      {/* Soft scan glow */}
      <mesh position={[0, 0, 0.078]}>
        <planeGeometry args={[qrPlateSize * 0.98, qrPlateSize * 0.98]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.018} />
      </mesh>
    </group>
  );
}