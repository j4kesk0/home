"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
    children,
    className = "",
    onClick,
    href,
    variant = "primary",
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const baseStyles = {
        primary:
            "bg-accent text-bg-primary hover:bg-accent-hover border border-transparent",
        secondary:
            "bg-transparent text-text-primary border border-border-accent hover:bg-bg-secondary",
        ghost:
            "bg-transparent text-text-secondary hover:text-text-primary border border-transparent",
    };

    const Component = href ? "a" : "button";

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Component
                    href={href}
                    onClick={onClick}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${baseStyles[variant]} ${className}`}
                >
                    {children}
                </Component>
            </motion.div>
        </motion.div>
    );
}
