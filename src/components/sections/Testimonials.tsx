"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Matej Drugda",
        role: "Podnikateľ v gastronómii",
        quote: "Za 24 hodín sme mali funkčný prototyp. Za týždeň hotový produkt. Komunikácia bola excelentná od začiatku do konca.",
        rating: 5,
    },
    {
        name: "Simona Lednická",
        role: "Freelance fotografka",
        quote: "Môj nový web zvýšil počet dopytov o 200%. Návrhol riešenie, na ktoré by som sama nikdy neprišla. Jednoznačne odporúčam.",
        rating: 5,
    },
    {
        name: "Erik Valko",
        role: "Majiteľ fitness centra",
        quote: "Profesionálny prístup napriek mladému veku. Web beží perfektne, zákazníci si ho pochvaľujú. Najlepšia investícia tohoto roku.",
        rating: 5,
    },
    {
        name: "Natália Ďurcová",
        role: "Vizážistka",
        quote: "Rýchlosť dodania ma šokovala. Kvalita ešte viac. Spolupráca bola absolútne bezproblémová a výsledok prekvapil celý tím.",
        rating: 5,
    },
    {
        name: "Filip Straka",
        role: "Zakladateľ e-shopu",
        quote: "Oskar nie je len vývojár — je to dizajnér, konzultant a partner v jednom. Dal nášmu produktu tvár, ktorú zákazníci milujú.",
        rating: 5,
    },
];

// Double the array for seamless loop
const marqueeItems = [...testimonials, ...testimonials];

export function Testimonials() {
    return (
        <section id="referencie" className="py-24 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
                <SectionHeading
                    label="Referencie"
                    title="Čo hovoria klienti"
                    description="Reálne výsledky. Reálna spokojnosť. Tu sú slová tých, pre ktorých som tvoril."
                />
            </div>

            {/* Infinite Marquee Row 1 — left to right */}
            <div className="relative mb-6">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((t, i) => (
                        <TestimonialCard key={`row1-${i}`} testimonial={t} />
                    ))}
                </motion.div>
            </div>

            {/* Infinite Marquee Row 2 — right to left */}
            <div className="relative">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        x: {
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {[...marqueeItems].reverse().map((t, i) => (
                        <TestimonialCard key={`row2-${i}`} testimonial={t} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function TestimonialCard({
    testimonial,
}: {
    testimonial: (typeof testimonials)[0];
}) {
    return (
        <div className="flex-shrink-0 w-[380px] rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-sm)] space-y-4">
            <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                    />
                ))}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-border-default">
                <div className="w-9 h-9 rounded-full bg-bg-secondary border border-border-default flex items-center justify-center">
                    <span className="text-xs font-bold text-text-primary">
                        {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </span>
                </div>
                <div>
                    <p className="text-sm font-semibold text-text-primary">
                        {testimonial.name}
                    </p>
                    <p className="text-[11px] text-text-muted">
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </div>
    );
}
