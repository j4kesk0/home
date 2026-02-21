"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function NoiseBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const frameRef = useRef<number>(0);
    const { theme } = useTheme();

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const time = Date.now() * 0.0005;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        ctx.clearRect(0, 0, w, h);

        // Draw subtle floating orbs that react to mouse
        const isDark = theme === "dark";
        const orbCount = 4;

        for (let i = 0; i < orbCount; i++) {
            const phase = (i / orbCount) * Math.PI * 2;
            const baseX = w * (0.3 + 0.4 * Math.cos(time * 0.3 + phase));
            const baseY = h * (0.3 + 0.4 * Math.sin(time * 0.4 + phase));

            // Mouse influence
            const dx = mx * w - baseX;
            const dy = my * h - baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / (w * 0.5));

            const x = baseX + dx * influence * 0.15;
            const y = baseY + dy * influence * 0.15;
            const radius = w * (0.15 + 0.05 * Math.sin(time + phase));

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

            if (isDark) {
                const colors = [
                    "rgba(255, 255, 255, 0.015)",
                    "rgba(200, 200, 255, 0.008)",
                    "rgba(180, 160, 255, 0.012)",
                    "rgba(255, 220, 180, 0.01)",
                ];
                gradient.addColorStop(0, colors[i % colors.length]);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            } else {
                const colors = [
                    "rgba(45, 45, 45, 0.02)",
                    "rgba(100, 80, 60, 0.015)",
                    "rgba(60, 60, 80, 0.018)",
                    "rgba(80, 60, 40, 0.012)",
                ];
                gradient.addColorStop(0, colors[i % colors.length]);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            }

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Very subtle grain overlay
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const grainIntensity = isDark ? 8 : 4;

        for (let i = 0; i < data.length; i += 16) {
            const noise = (Math.random() - 0.5) * grainIntensity;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
        ctx.putImageData(imageData, 0, 0);

        frameRef.current = requestAnimationFrame(animate);
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            // Use lower resolution for performance
            canvas.width = Math.floor(window.innerWidth * 0.5);
            canvas.height = Math.floor(window.innerHeight * 0.5);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener("mousemove", handleMouse);

        // Intersection observer to pause when not visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    frameRef.current = requestAnimationFrame(animate);
                } else {
                    cancelAnimationFrame(frameRef.current);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(frameRef.current);
            observer.disconnect();
        };
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: "auto" }}
        />
    );
}
