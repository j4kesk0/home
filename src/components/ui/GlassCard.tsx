"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    delay?: number;
}

export function GlassCard({
    children,
    className = "",
    hover = true,
    delay = 0,
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
                hover
                    ? {
                        y: -4,
                        transition: { duration: 0.3 },
                    }
                    : undefined
            }
            className={`rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] ${className}`}
        >
            {children}
        </motion.div>
    );
}
