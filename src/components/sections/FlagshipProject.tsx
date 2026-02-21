"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import Image from "next/image";
import Link from "next/link";

const galleryImages = [
    {
        id: 1,
        src: "/img1.png",
        alt: "Projekt 1",
    },
    {
        id: 2,
        src: "/img2.png",
        alt: "Projekt 2",
    },
    {
        id: 3,
        src: "/img3.png",
        alt: "Projekt 3",
    },
    {
        id: 4,
        src: "/img4.png",
        alt: "Projekt 4",
    },
];

export function FlagshipProject() {
    const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

    return (
        <section id="projekt" className="py-24 lg:py-32 bg-bg-secondary">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeading
                    label="Vlajkový projekt"
                    title="Digitálna identita hudobníka"
                    description="Kompletný redizajn online prítomnosti pre profesionálneho hudobníka. Od vizuálneho branding-u po interaktívny web s audio prvkami."
                />

                {/* Main Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Gallery - large area */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Main Image with 3D Tilt */}
                        <TiltCard tiltAmount={6} parallaxAmount={8} className="relative">
                            <motion.div
                                className="relative aspect-video rounded-2xl overflow-hidden border border-border-default shadow-[var(--shadow-lg)]"
                                layoutId="flagship-main"
                                data-cursor="gallery"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage.id}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={selectedImage.src}
                                            alt={selectedImage.alt}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 60vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </TiltCard>

                        {/* Gallery Thumbnails */}
                        <div className="grid grid-cols-4 gap-3">
                            {galleryImages.map((img) => (
                                <motion.button
                                    key={img.id}
                                    onClick={() => setSelectedImage(img)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage.id === img.id
                                        ? "border-accent shadow-[var(--shadow-md)]"
                                        : "border-border-default opacity-60 hover:opacity-100"
                                        }`}
                                    data-cursor="gallery"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 1024px) 25vw, 15vw"
                                        className="object-cover"
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Project Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-sm)] space-y-5"
                        >
                            <h3 className="font-[var(--font-playfair)] text-xl font-bold text-text-primary">
                                Prečo tento projekt vyniká
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        label: "Výzva",
                                        text: "Vytvoriť jedinečnú a prémiovú online prítomnosť, ktorá okamžite zachytáva energiu a nezameniteľnú atmosféru živých jazzových vystúpení, a zároveň pôsobí mimoriadne profesionálne.",
                                    },
                                    {
                                        label: "Riešenie",
                                        text: 'Návrh luxusného \u201Edark mode\u201C dizajnu s elegantnou serifovou typografiou, ktorý dáva dokonale vyniknúť dynamickej koncertnej fotografii. Dizajn je doplnený o žiarivé, kontrastné zlaté prvky a intuitívne tlačidlá (Call-to-Action) zamerané na okamžitú interakciu.',
                                    },
                                    {
                                        label: "Výsledok",
                                        text: "Vysoko profesionálny dojem na svetovej úrovni, ktorý vizuálne zrkadlí kvalitu samotnej hudby. Zjednodušená a lákavá cesta k novým booking príležitostiam (výrazné tlačidlo).",
                                    },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                                            {item.label}
                                        </span>
                                        <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-sm)]"
                        >
                            <h4 className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-3">
                                Technológie
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Next.js",
                                    "React",
                                    "Tailwind",
                                    "Framer Motion",
                                    "Figma",
                                    "Vercel",
                                ].map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-border-default px-3 py-1 text-xs font-medium text-text-secondary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <div className="space-y-3">
                            <Link href="/projekty/radovan-tariska" className="block">
                                <MagneticButton variant="primary" className="w-full justify-center">
                                    Pozrieť prípadovú štúdiu
                                    <ExternalLink size={14} />
                                </MagneticButton>
                            </Link>
                            <MagneticButton href="https://radovantariska.com" variant="secondary" className="w-full justify-center">
                                Pozrieť živý web
                                <ExternalLink size={14} />
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
