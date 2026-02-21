"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    parallaxAmount?: number;
    scale?: number;
    perspective?: number;
}

export function TiltCard({
    children,
    className = "",
    tiltAmount = 8,
    parallaxAmount = 10,
    scale = 1.02,
    perspective = 800,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };

    const rotateX = useSpring(
        useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]),
        springConfig
    );
    const rotateY = useSpring(
        useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]),
        springConfig
    );

    // Reverse parallax for inner content
    const translateX = useSpring(
        useTransform(mouseX, [0, 1], [parallaxAmount, -parallaxAmount]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(mouseY, [0, 1], [parallaxAmount, -parallaxAmount]),
        springConfig
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: `${perspective}px`,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale: isHovering ? scale : 1,
                    transformStyle: "preserve-3d",
                }}
                transition={{ scale: { type: "spring", damping: 20, stiffness: 200 } }}
            >
                {children}

                {/* Glare overlay */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{
                        background: isHovering
                            ? `radial-gradient(circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
                            : "transparent",
                        opacity: isHovering ? 1 : 0,
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

// Simpler context for inner elements that need reverse parallax
export function TiltCardInner({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return <div className={`relative z-0 ${className}`}>{children}</div>;
}
