"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Clock,
    CalendarCheck,
    Rocket,
    Shield,
    MessageSquare,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const processCards = [
    {
        icon: MessageSquare,
        title: "Prvý kontakt",
        description:
            "Napíšeš mi, čo potrebuješ. Odpovedám do hodiny — žiadne čakanie, žiadne formality.",
        span: "col-span-1",
    },
    {
        icon: Zap,
        title: "Rýchly návrh",
        description:
            "Do 24 hodín dostaneš prvý vizuálny návrh. Nie wireframe — hotový dizajn, ktorý si vieš predstaviť naživo.",
        span: "col-span-1 md:col-span-2",
    },
    {
        icon: CalendarCheck,
        title: "Víkendové dodanie",
        description:
            "Menšie projekty stihnem cez víkend. Profesionálna kvalita, startup rýchlosť.",
        span: "col-span-1 md:col-span-2",
    },
    {
        icon: Clock,
        title: "Pracovná presnosť",
        description:
            "Väčšie projekty riešim systematicky počas týždňa. Každý deň vidíš pokrok.",
        span: "col-span-1",
    },
    {
        icon: Rocket,
        title: "Spustenie",
        description:
            "Deployment na Vercel, doména nasmerovaná, SEO optimalizácia. Tvoj web ide live.",
        span: "col-span-1",
    },
    {
        icon: Shield,
        title: "Podpora",
        description:
            "Po spustení nekončím. Prvý mesiac opráv a vylepšení v cene. Pretože mi záleží.",
        span: "col-span-1",
    },
];

export function Promise() {
    return (
        <section id="proces" className="py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeading
                    label="Proces"
                    title="Od nápadu po hotový web za 24h"
                    description="Žiadne zbytočné stretnutia, žiadne oneskorenia. Mám systém, ktorý funguje — a výsledky, ktoré to dokazujú."
                />

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {processCards.map((card, i) => (
                        <GlassCard
                            key={card.title}
                            delay={i * 0.1}
                            className={`${card.span} group`}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-bg-secondary mb-4 transition-colors group-hover:border-border-accent">
                                    <card.icon
                                        size={18}
                                        className="text-text-secondary transition-colors group-hover:text-text-primary"
                                    />
                                </div>
                                <h3 className="text-base font-semibold text-text-primary mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Highlight Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-12 rounded-2xl border border-border-accent bg-bg-card p-8 text-center shadow-[var(--shadow-md)]"
                >
                    <p className="font-[var(--font-playfair)] text-xl sm:text-2xl font-bold text-text-primary">
                        &quot;Neplatíš za hodiny. Platíš za výsledok.&quot;
                    </p>
                    <p className="mt-2 text-sm text-text-muted">
                        Fixná cena, jasný rozsah, žiadne prekvapenia.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
