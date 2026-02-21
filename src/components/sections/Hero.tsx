"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { NoiseBg } from "@/components/NoiseBg";
import Image from "next/image";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
            {/* Animated canvas background */}
            <div className="absolute inset-0 pointer-events-none">
                <NoiseBg />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                            className="inline-flex items-center gap-2 rounded-full border border-border-default px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-text-muted"
                        >
                            <Sparkles size={12} />
                            K dispozícii pre nové projekty
                        </motion.div>

                        <SplitTextReveal
                            as="h1"
                            delay={0.1}
                            staggerDelay={0.025}
                            className="font-[var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary"
                        >
                            Pripravený za 24h. Kód na večnosť.
                        </SplitTextReveal>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg mx-auto lg:mx-0"
                        >
                            17-ročný full-stack vývojár s 2+ rokmi skúseností a 10+ dokončenými
                            projektmi. Tvorím prémiové weby, ktoré zarábajú — nie len dobre
                            vyzerajú.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-8 justify-center lg:justify-start"
                        >
                            {[
                                { value: "10+", label: "Projektov" },
                                { value: "2+", label: "Roky skúseností" },
                                { value: "24h", label: "Prvý návrh" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold text-text-primary">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-text-muted tracking-wider uppercase mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <MagneticButton href="#projekt" variant="primary">
                                Pozrieť projekty
                            </MagneticButton>
                            <MagneticButton href="#kontakt" variant="secondary">
                                Kontaktovať ma
                            </MagneticButton>
                        </motion.div>
                    </div>

                    {/* Profile Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Decorative ring */}
                            <div className="absolute -inset-4 rounded-full border border-border-default opacity-50" />
                            <div className="absolute -inset-8 rounded-full border border-border-default opacity-25" />

                            {/* Photo container */}
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-border-accent shadow-[var(--shadow-lg)]">
                                <Image
                                    src="/profile.jpg"
                                    alt="Oskar Tariška"
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                                className="absolute -bottom-2 -right-2 glass rounded-full px-4 py-2 shadow-[var(--shadow-md)]"
                            >
                                <span className="text-xs font-semibold text-text-primary">
                                    🇸🇰 Slovensko
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-text-muted tracking-widest uppercase">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={16} className="text-text-muted" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
