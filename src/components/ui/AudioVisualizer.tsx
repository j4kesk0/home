"use client";

import { motion } from "framer-motion";

export function AudioVisualizer() {
    const bars = 32;

    return (
        <div className="flex items-end justify-center gap-[2px] h-24 px-4">
            {Array.from({ length: bars }).map((_, i) => {
                const baseHeight = Math.sin((i / bars) * Math.PI) * 60 + 20;
                return (
                    <motion.div
                        key={i}
                        className="w-1 rounded-full bg-gradient-to-t from-text-muted/40 to-text-primary/60"
                        initial={{ height: 4 }}
                        animate={{
                            height: [
                                baseHeight * 0.3,
                                baseHeight,
                                baseHeight * 0.5,
                                baseHeight * 0.9,
                                baseHeight * 0.3,
                            ],
                        }}
                        transition={{
                            duration: 1.5 + Math.random() * 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: i * 0.04,
                        }}
                    />
                );
            })}
        </div>
    );
}
