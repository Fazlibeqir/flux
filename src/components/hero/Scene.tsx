"use client";

import { Group, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";
import FloatingCard from "./FloatingCard";
import QRTile from "./QRTile";
import DataParticles from "./DataParticle";
import AnimatedConnector from "./AnimatedConnector";

type Pose = {
    pos: [number, number, number];
    rot: [number, number, number];
};

function lerpPose(
    obj: Group | null,
    from: Pose,
    to: Pose,
    t: number,
    alpha = 0.08
) {
    if (!obj) return;

    const tx = MathUtils.lerp(from.pos[0], to.pos[0], t);
    const ty = MathUtils.lerp(from.pos[1], to.pos[1], t);
    const tz = MathUtils.lerp(from.pos[2], to.pos[2], t);

    const rx = MathUtils.lerp(from.rot[0], to.rot[0], t);
    const ry = MathUtils.lerp(from.rot[1], to.rot[1], t);
    const rz = MathUtils.lerp(from.rot[2], to.rot[2], t);

    obj.position.x += (tx - obj.position.x) * alpha;
    obj.position.y += (ty - obj.position.y) * alpha;
    obj.position.z += (tz - obj.position.z) * alpha;

    obj.rotation.x += (rx - obj.rotation.x) * alpha;
    obj.rotation.y += (ry - obj.rotation.y) * alpha;
    obj.rotation.z += (rz - obj.rotation.z) * alpha;
}

export default function Scene() {
    const root = useRef<Group>(null);
    const browserRef = useRef<Group>(null);
    const phoneRef = useRef<Group>(null);
    const cardARef = useRef<Group>(null);
    const cardBRef = useRef<Group>(null);
    const cardCRef = useRef<Group>(null);
    const qrRef = useRef<Group>(null);

    const scrollProgress = useRef(0);
    const scrollSmoothed = useRef(0);

    const poses = useMemo(() => {
        return {
            browser: {
                from: {
                    pos: [1.6, 0.9, -0.8],
                    rot: [0.18, -0.55, 0.08],
                } as Pose,
                to: {
                    pos: [0.5, 0.2, 0],
                    rot: [0.05, -0.2, 0],
                } as Pose,
            },
            phone: {
                from: {
                    pos: [-2.8, -0.9, 1.4],
                    rot: [0.2, 0.95, -0.18],
                } as Pose,
                to: {
                    pos: [-1.8, -0.25, 0.8],
                    rot: [0.08, 0.70, -0.08],
                } as Pose,
            },
            cardA: {
                from: {
                    pos: [2.9, 2.1, 1.4],
                    rot: [-0.12, -0.55, 0.15],
                } as Pose,
                to: {
                    pos: [1.8, 1.4, 0.7],
                    rot: [-0.05, -0.25, 0.04],
                } as Pose,
            },
            cardB: {
                from: {
                    pos: [-1.7, 1.8, 1.9],
                    rot: [0.14, 0.45, -0.12],
                } as Pose,
                to: {
                    pos: [-0.6, 1.2, 1.2],
                    rot: [0.05, 0.15, -0.02],
                } as Pose,
            },
            cardC: {
                from: {
                    pos: [3.2, -1.8, 1.5],
                    rot: [0.1, -0.35, 0.13],
                } as Pose,
                to: {
                    pos: [2.2, -1.1, 0.9],
                    rot: [0.03, -0.15, 0.03],
                } as Pose,
            },
            qr: {
                from: {
                    pos: [-1.8, -2.0, 1.7],
                    rot: [0.12, 0.55, -0.08],
                } as Pose,
                to: {
                    pos: [-0.9, -1.25, 1.1],
                    rot: [0.02, 0.25, 0],
                } as Pose,
            },
        };
    }, []);

    useFrame((state) => {
        // Safe guard for SSR-ish environments / edge timing
        if (typeof window === "undefined" || typeof document === "undefined") return;

        // Read page scroll progress (0 -> 1)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;

        // Map first portion of page scroll into 0..1 for hero animation
        const target = Math.min(Math.max(raw * 2.2, 0), 1);
        scrollProgress.current = target;

        // Smooth progress
        scrollSmoothed.current = MathUtils.lerp(
            scrollSmoothed.current,
            scrollProgress.current,
            0.08
        );

        const t = scrollSmoothed.current;

        // Mouse parallax (subtle)
        const px = state.pointer.x * 0.12;
        const py = state.pointer.y * 0.08;

        if (root.current) {
            const targetRotY = MathUtils.lerp(0.18, 0.02, t) + px;
            const targetRotX = MathUtils.lerp(-0.06, 0.02, t) - py;

            root.current.rotation.y += (targetRotY - root.current.rotation.y) * 0.06;
            root.current.rotation.x += (targetRotX - root.current.rotation.x) * 0.06;

            const rootX = MathUtils.lerp(2.0, 1.55, t);
            const rootY =
                MathUtils.lerp(0.25, 0, t) +
                Math.sin(state.clock.elapsedTime * 0.5) * 0.04;

            root.current.position.x += (rootX - root.current.position.x) * 0.06;
            root.current.position.y += (rootY - root.current.position.y) * 0.06;
        }

        function remap01(t: number, start: number, end: number) {
            if (t <= start) return 0;
            if (t >= end) return 1;
            return (t - start) / (end - start);
        }

        // Staggered assembly timing (feels much more "designed")
        const tBrowser = remap01(t, 0.0, 0.55);
        const tPhone = remap01(t, 0.08, 0.68);
        const tCardA = remap01(t, 0.16, 0.82);
        const tCardB = remap01(t, 0.22, 0.88);
        const tCardC = remap01(t, 0.28, 0.94);
        const tQR = remap01(t, 0.35, 1.0);

        lerpPose(browserRef.current, poses.browser.from, poses.browser.to, tBrowser, 0.08);
        lerpPose(phoneRef.current, poses.phone.from, poses.phone.to, tPhone, 0.08);
        lerpPose(cardARef.current, poses.cardA.from, poses.cardA.to, tCardA, 0.08);
        lerpPose(cardBRef.current, poses.cardB.from, poses.cardB.to, tCardB, 0.08);
        lerpPose(cardCRef.current, poses.cardC.from, poses.cardC.to, tCardC, 0.08);
        lerpPose(qrRef.current, poses.qr.from, poses.qr.to, tQR, 0.08);

        // Camera subtle push-in + slight pan
        const camX = MathUtils.lerp(0.15, 0.0, t);
        const camY = MathUtils.lerp(0.08, 0.0, t);
        const camZ = MathUtils.lerp(8.7, 7.8, t);

        // IMPORTANT: use state.camera (mutable runtime object), not useThree() destructured camera
        const cam = state.camera;
        cam.position.x += (camX - cam.position.x) * 0.05;
        cam.position.y += (camY - cam.position.y) * 0.05;
        cam.position.z += (camZ - cam.position.z) * 0.05;
        cam.lookAt(0.6, 0.05, 0);
    });

    return (
        <group ref={root} position={[1.8, 0.25, 0]}>

            {/* Main browser frame */}
            <group ref={browserRef}>
                <BrowserFrame />
            </group>

            {/* Phone frame */}
            <group ref={phoneRef}>
                <PhoneFrame />
            </group>

            {/* UI cards */}
            <group ref={cardARef}>
                <FloatingCard variant="chart" />
            </group>

            <group ref={cardBRef}>
                <FloatingCard variant="form" />
            </group>

            <group ref={cardCRef}>
                <FloatingCard variant="menu" />
            </group>

            {/* QR tile */}
            <group ref={qrRef}>
                <QRTile />
            </group>

            {/* Particles */}
            <DataParticles />

            {/* Connector 1: browser -> top card */}
            <AnimatedConnector
                position={[0.6, 1.05, 0.65]}
                rotation={[0, 0, 0.45]}
                length={2.1}
                radius={0.01}
                color="#22d3ee"
                speed={0.55}
                opacity={0.28}
            />


            {/* Connector 2: browser -> lower/qr region */}
            <AnimatedConnector
                position={[0.05, -0.65, 0.95]}
                rotation={[0.4, 0.2, -0.2]}
                length={1.8}
                radius={0.008}
                color="#60a5fa"
                speed={0.8}
                opacity={0.22}
            />
        </group>
    );
}