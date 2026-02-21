"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Skill {
    name: string;
    level: number; // 0-100
    category: string;
}

const skills: Skill[] = [
    { name: "Next.js", level: 92, category: "Framework" },
    { name: "React", level: 90, category: "Framework" },
    { name: "TypeScript", level: 85, category: "Jazyk" },
    { name: "Tailwind CSS", level: 95, category: "Styling" },
    { name: "Framer Motion", level: 80, category: "Animácie" },
    { name: "JavaScript", level: 90, category: "Jazyk" },
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "Figma", level: 78, category: "Dizajn" },
    { name: "Git", level: 82, category: "Nástroj" },
    { name: "UX Dizajn", level: 80, category: "Dizajn" },
    { name: "REST API", level: 78, category: "Backend" },
    { name: "Vercel", level: 88, category: "Deployment" },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

export function Skills() {
    return (
        <section id="skills" className="py-24 lg:py-32 bg-bg-secondary">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeading
                    label="Technológie"
                    title="Staviam s tým najlepším"
                    description="Od frontendu po deployment. Každý nástroj vyberám podľa toho, čo prinesie najlepší výsledok pre tvoj projekt."
                />

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -4,
                                transition: { duration: 0.2 },
                            }}
                            className="group relative rounded-2xl border border-border-default bg-bg-card p-5 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] cursor-default"
                        >
                            {/* Category badge */}
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-text-muted">
                                {skill.category}
                            </span>

                            {/* Skill name */}
                            <h3 className="mt-2 text-base font-semibold text-text-primary">
                                {skill.name}
                            </h3>

                            {/* Progress bar */}
                            <div className="mt-3 h-1 w-full rounded-full bg-border-default overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-accent"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.3,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                />
                            </div>

                            {/* Percentage */}
                            <span className="mt-1.5 block text-xs text-text-muted font-mono">
                                {skill.level}%
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
