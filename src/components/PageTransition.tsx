"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* Top sliding curtain */}
                <motion.div
                    className="fixed inset-0 z-[9990] bg-bg-primary pointer-events-none"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    style={{ transformOrigin: "bottom" }}
                />
                <motion.div
                    className="fixed inset-0 z-[9990] bg-bg-primary pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    style={{ transformOrigin: "top" }}
                />

                {children}
            </motion.div>
        </AnimatePresence>
    );
}
