"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [cursorText, setCursorText] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Hide custom cursor on touch devices
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest("a, button, [data-cursor='pointer']");
            const gallery = target.closest("[data-cursor='gallery']");

            if (gallery) {
                setCursorVariant("gallery");
                setCursorText("Pozrieť");
            } else if (interactive) {
                setCursorVariant("pointer");
                setCursorText("");
            } else {
                setCursorVariant("default");
                setCursorText("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    const variants: Record<string, { width: number; height: number; opacity: number }> = {
        default: { width: 12, height: 12, opacity: 1 },
        pointer: { width: 40, height: 40, opacity: 0.6 },
        gallery: { width: 80, height: 80, opacity: 0.9 },
    };

    const currentVariant = variants[cursorVariant] || variants.default;

    return (
        <>
            {/* Hide native cursor globally */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>

            {/* Custom cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: currentVariant.width,
                    height: currentVariant.height,
                    opacity: currentVariant.opacity,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
                <div
                    className={`rounded-full transition-colors duration-200 ${cursorVariant === "gallery"
                            ? "bg-white/90 dark:bg-white/90"
                            : cursorVariant === "pointer"
                                ? "bg-text-primary/30 border border-text-primary/50"
                                : "bg-text-primary"
                        }`}
                    style={{ width: "100%", height: "100%" }}
                />
                {cursorText && (
                    <span className="absolute text-[10px] font-semibold tracking-wider uppercase text-black">
                        {cursorText}
                    </span>
                )}
            </motion.div>
        </>
    );
}
