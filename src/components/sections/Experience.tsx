"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Project {
    year: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
}

const projects: Project[] = [
    {
        year: "2026",
        title: "Portfólio pre hudobníka",
        description:
            "Luxusný web s audio vizualizérom a dynamickými prechodmi. Tmavý dizajn, prémiový feel.",
        tags: ["Next.js", "Framer Motion", "Tailwind"],
    },
    {
        year: "2026",
        title: "E-commerce platforma",
        description:
            "Kompletný obchod s produktovým katalógom, košíkom a platobnou bránou. Mobilný responzívny dizajn.",
        tags: ["React", "Node.js", "Stripe"],
    },
    {
        year: "2025",
        title: "Dashboard pre SaaS",
        description:
            "Analytický dashboard s real-time grafmi, používateľským managementom a dark mode.",
        tags: ["Next.js", "TypeScript", "Chart.js"],
    },
    {
        year: "2025",
        title: "Landing page pre startup",
        description:
            "Konverzne optimalizovaná stránka s A/B testovaním. 40% nárast registrácií.",
        tags: ["React", "Tailwind", "Vercel"],
    },
    {
        year: "2025",
        title: "Firemná webstránka",
        description:
            "Moderný web pre stavebnú firmu. Galéria projektov, kontaktný formulár, SEO optimalizácia.",
        tags: ["Next.js", "Tailwind", "Figma"],
    },
    {
        year: "2025",
        title: "Blog platforma",
        description:
            "Osobný blog s MDX, kategóriami, vyhľadávaním a RSS feedom. Rýchly, čistý, čitateľný.",
        tags: ["Next.js", "MDX", "Tailwind"],
    },
    {
        year: "2024",
        title: "Booking systém",
        description:
            "Online rezervačný systém pre salón krásy. Kalendár, notifikácie, admin panel.",
        tags: ["React", "Node.js", "MongoDB"],
    },
    {
        year: "2024",
        title: "Portfólio fotografa",
        description:
            "Minimalistické portfólio s masonry grid galériou a lightbox prezeraním.",
        tags: ["Next.js", "Framer Motion", "Vercel"],
    },
    {
        year: "2024",
        title: "Aplikácia pre fitness",
        description:
            "Tracker tréningov s vizualizáciou pokroku, plánovačom a zdieľaním výsledkov.",
        tags: ["React", "TypeScript", "Firebase"],
    },
    {
        year: "2024",
        title: "Prezentačný web pre realitnú kanceláriu",
        description:
            "Katalóg nehnuteľností s filtrovaním, mapovou integráciou a kontaktnými formulármi.",
        tags: ["Next.js", "Tailwind", "Google Maps"],
    },
];

export function Experience() {
    return (
        <section id="skusenosti" className="py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeading
                    label="Skúsenosti"
                    title="10+ projektov, ktoré hovoria za mňa"
                    description="Každý projekt ma posunul ďalej. Tu sú tie, na ktoré som najviac hrdý."
                />

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-translate-x-px" />

                    <div className="space-y-12">
                        {projects.map((project, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <motion.div
                                    key={`${project.title}-${i}`}
                                    initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={`relative flex flex-col md:flex-row items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-primary -translate-x-1 md:-translate-x-[5px] mt-6 z-10" />

                                    {/* Content card */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                                            }`}
                                    >
                                        <span className="text-xs font-mono text-text-muted">
                                            {project.year}
                                        </span>
                                        <h3 className="mt-1 text-lg font-semibold text-text-primary">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div
                                            className={`mt-3 flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""
                                                }`}
                                        >
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-border-default px-2.5 py-0.5 text-[11px] font-medium text-text-muted"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Empty spacer for the other side */}
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
