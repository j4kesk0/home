"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SplitTextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    as?: "h1" | "h2" | "h3" | "span";
    animate?: boolean;
}

export function SplitTextReveal({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.035,
    as: Tag = "h1",
    animate = true,
}: SplitTextRevealProps) {
    const words = children.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        }),
    };

    const child = {
        hidden: {
            y: "110%",
            opacity: 0,
            rotateX: 90,
        },
        visible: {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                damping: 25,
                stiffness: 200,
                mass: 0.5,
            },
        },
    };

    if (!animate) {
        return <Tag className={className}>{children}</Tag>;
    }

    return (
        <Tag className={className} style={{ perspective: "600px" }}>
            <motion.span
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="inline-flex flex-wrap"
                style={{ gap: "0.3em" }}
            >
                {words.map((word, i) => (
                    <span
                        key={i}
                        className="inline-block overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.span
                            variants={child}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}
