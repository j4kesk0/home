"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Extreme easing curves
const SNAP: [number, number, number, number] = [0.76, 0, 0.24, 1];
const AGGRESSIVE: [number, number, number, number] = [0.87, 0, 0.13, 1];
const SILK: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ──────────────────────────────────────────────
// Non-linear counter: burst → crawl → pause → snap
// ──────────────────────────────────────────────
function getTargetProgress(elapsed: number): number {
    if (elapsed < 300) return (elapsed / 300) * 38;
    if (elapsed < 1800) {
        const t = (elapsed - 300) / 1500;
        return 38 + (1 - Math.pow(1 - t, 0.3)) * 49;
    }
    if (elapsed < 2000) return 87;
    if (elapsed < 2200) {
        const t = (elapsed - 2000) / 200;
        return 87 + t * t * t * 13;
    }
    return 100;
}

// ──────────────────────────────────────────────
// WebGL-like Canvas with vivid fluid gradients
// ──────────────────────────────────────────────
function FluidCanvas({ intensity, phase }: { intensity: number; phase: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const time = Date.now() * 0.001;

        ctx.clearRect(0, 0, w, h);

        // Deep black base
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Fluid orbs with vivid colors — intensity controls opacity & size
        const orbs = [
            { color: [212, 168, 83], x: 0.3, y: 0.4, phase: 0 },       // Gold #d4a853
            { color: [0, 188, 212], x: 0.7, y: 0.3, phase: 1.5 },      // Teal
            { color: [156, 39, 176], x: 0.5, y: 0.7, phase: 3.0 },     // Purple
            { color: [255, 87, 34], x: 0.2, y: 0.6, phase: 4.5 },      // Deep Orange
            { color: [0, 150, 136], x: 0.8, y: 0.5, phase: 2.0 },      // Emerald
        ];

        for (const orb of orbs) {
            const orbX = w * (orb.x + 0.15 * Math.sin(time * 0.4 + orb.phase) + (mx - 0.5) * 0.2 * intensity);
            const orbY = h * (orb.y + 0.15 * Math.cos(time * 0.5 + orb.phase) + (my - 0.5) * 0.2 * intensity);
            const radius = Math.min(w, h) * (0.2 + intensity * 0.25 + 0.05 * Math.sin(time * 0.8 + orb.phase));

            const grad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, radius);
            const alpha = 0.03 + intensity * 0.12;
            grad.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${alpha})`);
            grad.addColorStop(0.5, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${alpha * 0.3})`);
            grad.addColorStop(1, `rgba(0, 0, 0, 0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(orbX, orbY, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Climax flash — all orbs burst at once
        if (phase === "climax") {
            const flashGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
            flashGrad.addColorStop(0, "rgba(212, 168, 83, 0.4)");
            flashGrad.addColorStop(0.3, "rgba(0, 188, 212, 0.2)");
            flashGrad.addColorStop(0.6, "rgba(156, 39, 176, 0.1)");
            flashGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = flashGrad;
            ctx.fillRect(0, 0, w, h);
        }

        // Film grain overlay — intensifies with progress
        const grainStrength = Math.floor(5 + intensity * 30);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 8) {
            const noise = (Math.random() - 0.5) * grainStrength;
            data[i] += noise;
            data[i + 1] += noise;
            data[i + 2] += noise;
        }
        ctx.putImageData(imageData, 0, 0);

        frameRef.current = requestAnimationFrame(draw);
    }, [intensity, phase]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = Math.floor(window.innerWidth * 0.35);
        canvas.height = Math.floor(window.innerHeight * 0.35);

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
        };
        window.addEventListener("mousemove", handleMouse);
        frameRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(frameRef.current);
        };
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: phase === "climax" ? "brightness(2) saturate(1.5)" : "none" }}
        />
    );
}

// ──────────────────────────────────────────────
// Letter-by-letter 3D stagger reveal
// ──────────────────────────────────────────────
function SplitReveal({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <span className="inline-flex flex-wrap justify-center" style={{ perspective: "800px" }}>
            {text.split("").map((char, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "130%", rotateX: 90, opacity: 0 }}
                        animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                        transition={{
                            duration: 0.7,
                            delay: delay + i * 0.045,
                            ease: SNAP,
                        }}
                        style={{ transformOrigin: "bottom center" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

// ──────────────────────────────────────────────
// MAIN PRELOADER
// ──────────────────────────────────────────────
export function Preloader() {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "climax" | "exit" | "done">("loading");
    const startTime = useRef(Date.now());

    useEffect(() => {
        if (phase !== "loading") return;
        const tick = () => {
            const elapsed = Date.now() - startTime.current;
            const target = getTargetProgress(elapsed);
            setProgress(Math.min(100, Math.floor(target)));
            if (target >= 100) {
                setPhase("climax");
                setTimeout(() => setPhase("exit"), 500);
                setTimeout(() => setPhase("done"), 1500);
                return;
            }
            requestAnimationFrame(tick);
        };
        const frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [phase]);

    const intensity = progress / 100;
    // Chromatic aberration offset — kicks in hard at 80%+
    const chromaOffset = progress > 80 ? (progress - 80) * 0.15 : 0;

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <>
                    {/* ═══ PHASE 4: MULTI-BLOCK CURTAIN EXIT ═══ */}
                    {phase === "exit" && (
                        <>
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={`shard-${i}`}
                                    className="fixed z-[9999]"
                                    style={{
                                        top: `${i * 20}%`,
                                        left: 0,
                                        right: 0,
                                        height: "20.5%",
                                        background: `linear-gradient(${90 + i * 15}deg, #050505 0%, ${["#1a1510", "#0a1515", "#120a18", "#1a0f0a", "#0a1210"][i]} 100%)`,
                                    }}
                                    initial={{ x: 0, skewX: 0 }}
                                    animate={{
                                        x: i % 2 === 0 ? "105vw" : "-105vw",
                                        skewX: i % 2 === 0 ? -3 : 3,
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: i * 0.06,
                                        ease: AGGRESSIVE,
                                    }}
                                />
                            ))}
                        </>
                    )}

                    {/* ═══ MAIN PRELOADER SCREEN ═══ */}
                    {phase !== "exit" && (
                        <motion.div
                            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden"
                            style={{ backgroundColor: "#050505" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.05 }}
                        >
                            {/* Vivid fluid canvas background */}
                            <FluidCanvas intensity={intensity} phase={phase} />

                            {/* ── Ghost watermark counter ── */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: phase === "climax" ? 0 : 1,
                                    scale: phase === "climax" ? 4 : 1,
                                }}
                                transition={{
                                    opacity: { duration: 0.25, ease: SNAP },
                                    scale: { duration: 0.5, ease: AGGRESSIVE },
                                }}
                            >
                                {/* RGB split — 3 layered numbers for chromatic aberration */}
                                <div className="relative">
                                    {/* Red channel */}
                                    <span
                                        className="absolute inset-0 flex items-center justify-center font-mono font-bold tabular-nums leading-none"
                                        style={{
                                            fontSize: "clamp(120px, 30vw, 400px)",
                                            color: "rgba(255, 60, 60, 0.04)",
                                            transform: `translate(${chromaOffset}px, ${-chromaOffset * 0.5}px)`,
                                            mixBlendMode: "screen",
                                        }}
                                    >
                                        {progress}
                                    </span>
                                    {/* Green channel */}
                                    <span
                                        className="absolute inset-0 flex items-center justify-center font-mono font-bold tabular-nums leading-none"
                                        style={{
                                            fontSize: "clamp(120px, 30vw, 400px)",
                                            color: "rgba(60, 255, 120, 0.04)",
                                            transform: `translate(${-chromaOffset * 0.7}px, ${chromaOffset * 0.3}px)`,
                                            mixBlendMode: "screen",
                                        }}
                                    >
                                        {progress}
                                    </span>
                                    {/* Blue channel (base) */}
                                    <span
                                        className="font-mono font-bold tabular-nums leading-none"
                                        style={{
                                            fontSize: "clamp(120px, 30vw, 400px)",
                                            color: "transparent",
                                            WebkitTextStroke: "1px rgba(100, 160, 255, 0.06)",
                                        }}
                                    >
                                        {progress}
                                    </span>
                                </div>
                            </motion.div>

                            {/* ── Center content ── */}
                            <div className="relative z-10 text-center px-4">
                                {/* Name — letter-by-letter 3D reveal */}
                                <h1
                                    className="font-[var(--font-playfair)] font-bold text-white tracking-tight mb-4"
                                    style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}
                                >
                                    <SplitReveal text="Oskar Tariška" delay={0.1} />
                                </h1>

                                {/* Subtitle — elegant slide in */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8, ease: SILK }}
                                    className="flex items-center justify-center gap-3"
                                >
                                    <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
                                    <span
                                        className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase"
                                        style={{
                                            background: "linear-gradient(90deg, #d4a853, #00bcd4)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        Creative Developer
                                    </span>
                                    <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-cyan-400/60" />
                                </motion.div>
                            </div>

                            {/* ── Progress track — full width, bottom ── */}
                            <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 px-6 sm:px-16">
                                {/* Track */}
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5, ease: SILK }}
                                    className="relative h-[1px] bg-white/10 origin-left overflow-hidden"
                                >
                                    {/* Gradient fill */}
                                    <motion.div
                                        className="absolute inset-y-0 left-0 origin-left"
                                        style={{
                                            width: `${progress}%`,
                                            background: phase === "climax"
                                                ? "linear-gradient(90deg, #d4a853, #00bcd4, #9c27b0)"
                                                : `linear-gradient(90deg, #d4a853, #00bcd4)`,
                                            boxShadow: phase === "climax"
                                                ? "0 0 30px #d4a853, 0 0 60px #00bcd4"
                                                : progress > 80
                                                    ? `0 0 ${(progress - 80) * 1}px #d4a853`
                                                    : "none",
                                            height: phase === "climax" ? "3px" : "1px",
                                            transition: "height 0.2s",
                                        }}
                                        animate={phase === "climax" ? { scaleX: [1, 0], opacity: [1, 0] } : {}}
                                        transition={{ duration: 0.4, ease: AGGRESSIVE }}
                                    />
                                </motion.div>

                                {/* Labels */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex justify-between mt-3"
                                >
                                    <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-white/30 font-medium">
                                        Načítavam portfólio
                                    </span>
                                    <span
                                        className="text-[9px] sm:text-[10px] font-mono tabular-nums font-bold"
                                        style={{
                                            background: "linear-gradient(90deg, #d4a853, #00bcd4)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {progress}%
                                    </span>
                                </motion.div>
                            </div>

                            {/* ── Corner decorations — luxury framing ── */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.15 }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 border-l border-t border-amber-400/40"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.15 }}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 border-r border-b border-cyan-400/40"
                            />
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
