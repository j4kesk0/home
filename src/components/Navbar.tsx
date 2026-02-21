"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { href: "#hero", label: "Domov" },
    { href: "#projekt", label: "Projekt" },
    { href: "#proces", label: "Proces" },
    { href: "#skills", label: "Skills" },
    { href: "#skusenosti", label: "Skúsenosti" },
    { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 glass-strong"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="group flex items-center gap-2">
                        <span
                            className="font-[var(--font-playfair)] text-xl font-bold tracking-tight text-text-primary transition-opacity group-hover:opacity-70"
                        >
                            OT
                        </span>
                        <span className="hidden sm:inline text-xs font-medium tracking-widest uppercase text-text-muted">
                            Portfolio
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium text-text-secondary transition-colors hover:text-text-primary group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border-default transition-colors hover:border-border-accent hover:bg-bg-secondary"
                            aria-label="Prepnúť tému"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {theme === "dark" ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Sun size={16} className="text-text-secondary" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Moon size={16} className="text-text-secondary" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-default md:hidden transition-colors hover:border-border-accent"
                            aria-label="Menu"
                        >
                            {isOpen ? (
                                <X size={16} className="text-text-secondary" />
                            ) : (
                                <Menu size={16} className="text-text-secondary" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-border-default md:hidden"
                    >
                        <div className="flex flex-col gap-1 px-6 py-4">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
