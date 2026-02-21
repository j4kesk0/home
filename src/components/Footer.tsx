"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/o.s.k.r.r", label: "Instagram" },
];

export function Footer() {
    return (
        <footer className="border-t border-border-default bg-bg-primary">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <span className="font-[var(--font-playfair)] text-2xl font-bold text-text-primary">
                            OT
                        </span>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            Tvorím digitálne zážitky, ktoré zanechávajú dojem. Každý pixel má
                            svoj účel.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                            Navigácia
                        </h4>
                        <div className="flex flex-col gap-2">
                            {["Domov", "Projekt", "Proces", "Skills", "Skúsenosti"].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                        className="text-sm text-text-secondary hover:text-text-primary transition-colors w-fit"
                                    >
                                        {item}
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                            Kontakt
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default transition-colors hover:border-border-accent hover:bg-bg-secondary"
                                    aria-label={label}
                                >
                                    <Icon size={16} className="text-text-secondary" />
                                </motion.a>
                            ))}
                        </div>
                        <a
                            href="https://instagram.com/o.s.k.r.r"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                        >
                            o.s.k.r.r
                            <ArrowUpRight size={12} />
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-muted">
                        © {new Date().getFullYear()} Oskar Tariška. Všetky práva vyhradené.
                    </p>
                    <p className="text-xs text-text-muted">
                        Navrhnuté a vyvinuté s&nbsp;
                        <span className="text-text-secondary">precíznosťou</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
