"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, User, Send, MapPin, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <section id="kontakt" className="py-24 lg:py-32 bg-bg-secondary">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeading
                    label="Kontakt"
                    title="Poďme spolupracovať"
                    description="Máš projekt na mysli? Ozvi sa mi a do 24 hodín ti odpoviem s návrhom."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-text-primary mb-2">
                                Oskar Tariška
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                                Webový vývojár & dizajnér. Pripravený premeniť tvoju víziu na realitu — rýchlo, profesionálne a s dôrazom na detail.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <motion.a
                                href="tel:+421948196230"
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-default bg-bg-card transition-colors group-hover:border-border-accent">
                                    <Phone size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted block">
                                        Telefón
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">
                                        +421 948 196 230
                                    </span>
                                </div>
                            </motion.a>

                            <motion.a
                                href="mailto:oskar.tariskaa@gmail.com"
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-default bg-bg-card transition-colors group-hover:border-border-accent">
                                    <Mail size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted block">
                                        Email
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">
                                        oskar.tariskaa@gmail.com
                                    </span>
                                </div>
                            </motion.a>

                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-default bg-bg-card transition-colors group-hover:border-border-accent">
                                    <MapPin size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted block">
                                        Lokácia
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">
                                        Slovensko 🇸🇰
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="rounded-2xl border border-border-default bg-bg-card p-8 shadow-[var(--shadow-md)]"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-secondary border border-border-accent">
                                    <CheckCircle size={28} className="text-text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary">
                                    Správa odoslaná!
                                </h3>
                                <p className="text-sm text-text-secondary max-w-xs">
                                    Ďakujem za tvoju správu. Ozvem sa ti čo najskôr.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-2 text-xs font-medium text-text-muted hover:text-text-primary underline underline-offset-4 transition-colors"
                                >
                                    Poslať ďalšiu správu
                                </button>
                            </motion.div>
                        ) : (
                            <form
                                action="https://formspree.io/f/mykdnzyb"
                                method="POST"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.currentTarget;
                                    fetch(form.action, {
                                        method: "POST",
                                        body: new FormData(form),
                                        headers: { Accept: "application/json" },
                                    }).then((res) => {
                                        if (res.ok) {
                                            setSubmitted(true);
                                            form.reset();
                                        }
                                    });
                                }}
                                className="space-y-5"
                            >
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-text-muted tracking-wide uppercase">
                                        Meno
                                    </label>
                                    <div className="relative">
                                        <User
                                            size={16}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                                        />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Tvoje meno"
                                            className="w-full rounded-xl border border-border-default bg-bg-primary pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-border-accent focus:shadow-[var(--shadow-sm)]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-text-muted tracking-wide uppercase">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            size={16}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="tvoj@email.sk"
                                            className="w-full rounded-xl border border-border-default bg-bg-primary pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-border-accent focus:shadow-[var(--shadow-sm)]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-text-muted tracking-wide uppercase">
                                        Správa
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Opíš mi tvoj projekt alebo nápad..."
                                        className="w-full rounded-xl border border-border-default bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-border-accent focus:shadow-[var(--shadow-sm)] resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
                                >
                                    <Send size={14} />
                                    Odoslať správu
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
