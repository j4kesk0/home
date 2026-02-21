"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Palette, Zap, Target, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 },
};

function BeforeAfterSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    };

    useEffect(() => {
        const handleMouseUp = () => { isDragging.current = false; };
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current) handleMove(e.clientX);
        };
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    });

    return (
        <div
            ref={containerRef}
            className="relative aspect-video rounded-2xl overflow-hidden border border-border-default select-none"
            onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
            {/* "After" - full background */}
            <div className="absolute inset-0">
                <Image
                    src="/after.png"
                    alt="Po redizajne"
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover"
                />
            </div>

            {/* "Before" - clipped */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src="/before.png"
                    alt="Pred redizajnom"
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover"
                />
            </div>

            {/* Slider line and handle */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <ChevronRight size={14} className="text-gray-800 -ml-1" />
                    <ChevronRight size={14} className="text-gray-800 -ml-3 rotate-180" />
                </div>
            </div>
        </div>
    );
}

export default function CaseStudyPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">

                {/* Back link */}
                <motion.div {...fadeInUp}>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12"
                    >
                        <ArrowLeft size={14} />
                        Späť na portfólio
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div {...fadeInUp} className="space-y-4 mb-16">
                    <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-text-muted">
                        Prípadová štúdia
                    </span>
                    <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                        Radovan Tariška
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                        Kompletný redizajn online prítomnosti pre profesionálneho jazzového hudobníka. Od počiatočného konceptu cez wireframy až po finálny luxusný dark-mode web.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {["Web Dizajn", "Development", "Branding", "UX"].map((tag) => (
                            <span key={tag} className="rounded-full border border-border-default px-3 py-1 text-xs font-medium text-text-secondary">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div {...fadeInUp} className="relative aspect-video rounded-2xl overflow-hidden border border-border-default shadow-[var(--shadow-lg)] mb-20">
                    <Image
                        src="/img1.png"
                        alt="Radovan Tariška - Finálny dizajn"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 960px"
                        className="object-cover"
                    />
                </motion.div>

                {/* Process Grid */}
                <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {[
                        {
                            icon: Target,
                            title: "Problém",
                            text: "Klient nemal žiadnu online prítomnosť okrem sociálnych sietí. Potreboval profesionálnu digitálnu identitu, ktorá reflektuje kvalitu jeho hudby a priláka organizátorov podujatí.",
                        },
                        {
                            icon: Palette,
                            title: "Dizajn",
                            text: "Zvolil som hlboký dark-mode dizajn s luxusnou serifovou typografiou (Playfair Display) a zlatými akcentmi. Každý prvok bol navrhnutý tak, aby evokoval elegantný svet jazzu.",
                        },
                        {
                            icon: Code2,
                            title: "Vývoj",
                            text: "Postavené na Next.js 15 s Framer Motion animáciami. Optimalizované pre maximálny výkon — Lighthouse score 100/100. Responzívny dizajn pre všetky zariadenia.",
                        },
                        {
                            icon: Zap,
                            title: "Výsledok",
                            text: "Web bol spustený za 5 dní od prvého kontaktu. Klient zaznamenal nárast dopytov na vystúpenia a jeho online prezentácia sa dostala na úplne novú úroveň.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-border-default bg-bg-card p-6 space-y-3 shadow-[var(--shadow-sm)]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default bg-bg-secondary">
                                    <item.icon size={16} className="text-text-primary" />
                                </div>
                                <h3 className="text-sm font-semibold text-text-primary tracking-wide">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Before/After */}
                <motion.div {...fadeInUp} className="mb-20">
                    <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-text-primary mb-2">
                        Pred & Po
                    </h2>
                    <p className="text-sm text-text-muted mb-8">
                        Posuň slider a porovnaj vizuálnu transformáciu.
                    </p>
                    <BeforeAfterSlider />
                </motion.div>


                {/* Gallery */}
                <motion.div {...fadeInUp} className="mb-20">
                    <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-text-primary mb-6">
                        Galéria projektu
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["/img1.png", "/img2.png", "/img3.png", "/img4.png"].map((src, i) => (
                            <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border-default">
                                <Image
                                    src={src}
                                    alt={`Screenshot ${i + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div {...fadeInUp} className="text-center space-y-6 py-12 border-t border-border-default">
                    <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-text-primary">
                        Zaujal ťa tento projekt?
                    </h2>
                    <p className="text-sm text-text-secondary max-w-md mx-auto">
                        Pozri si živú verziu webu alebo ma kontaktuj, ak chceš niečo podobné pre seba.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="https://radovantariska.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg-primary hover:bg-accent-hover transition-colors"
                        >
                            Pozrieť živý web
                        </a>
                        <Link
                            href="/#kontakt"
                            className="inline-flex items-center gap-2 rounded-xl border border-border-default px-6 py-3 text-sm font-semibold text-text-primary hover:bg-bg-secondary transition-colors"
                        >
                            Kontaktovať ma
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
