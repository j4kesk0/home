"use client";

import { motion } from "framer-motion";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";

interface SectionHeadingProps {
    label: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

export function SectionHeading({
    label,
    title,
    description,
    align = "center",
}: SectionHeadingProps) {
    return (
        <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-text-muted mb-4"
            >
                {label}
            </motion.span>

            <SplitTextReveal
                as="h2"
                delay={0.1}
                staggerDelay={0.03}
                className={`font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight ${align === "center" ? "justify-center" : ""}`}
            >
                {title}
            </SplitTextReveal>

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`mt-4 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}
