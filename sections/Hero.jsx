"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
    ArrowRight, PhoneCall, ShieldCheck, FileText, Truck, Package, Star,
} from "lucide-react";

const stats = [
    { icon: Package, value: "1,50,000+", label: "Orders shipped" },
    { icon: ShieldCheck, value: "Certified", label: "IS / DIN / AISI" },
    { icon: FileText, value: "GST", label: "Invoicing" },
    { icon: Truck, value: "Free", label: "Shipping ₹499+" },
];

const Hero = () => {
    const reduce = useReducedMotion();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        fetch("/api/products?limit=4")
            .then((r) => r.json())
            .then((d) => { if (alive && Array.isArray(d)) setProducts(d.slice(0, 4)); })
            .catch(() => {})
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, []);

    const ease = [0.16, 1, 0.3, 1];
    const fade = {
        hidden: { opacity: 0, y: reduce ? 0 : 18 },
        show: (i = 0) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.6, delay: reduce ? 0 : 0.05 + i * 0.08, ease },
        }),
    };

    return (
        <section className="relative flex items-center overflow-hidden border-b border-border bg-background lg:min-h-[calc(100svh-100px)]">
            {/* Engineered ground */}
            <div aria-hidden className="absolute inset-0 blueprint-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_30%_0%,black,transparent_80%)]" />
            <div aria-hidden className="absolute -top-32 -left-24 size-[460px] rounded-full bg-primary/[0.07] blur-3xl" />
            <div aria-hidden className="absolute top-20 right-0 size-[380px] rounded-full bg-signal/[0.06] blur-3xl" />

            <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 md:px-8 lg:grid-cols-12 lg:gap-8 lg:py-8">
                {/* ── Left: statement ── */}
                <div className="lg:col-span-6 xl:col-span-6">
                    <motion.div
                        variants={fade} initial="hidden" animate="show" custom={0}
                        className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 shadow-sm"
                    >
                        <span className="relative flex size-2">
                            <span className={`absolute inline-flex size-full rounded-full bg-success/60 ${reduce ? "" : "animate-ping"}`} />
                            <span className="relative inline-flex size-2 rounded-full bg-success" />
                        </span>
                        <span className="tech-label text-muted-foreground">In stock · Shipping nationwide</span>
                    </motion.div>

                    <motion.h1
                        variants={fade} initial="hidden" animate="show" custom={1}
                        className="mt-5 font-display font-medium leading-[0.95] tracking-tight text-foreground text-[clamp(2.5rem,5vw,4.5rem)]"
                    >
                        Components<br />
                        your work<br />
                        <span className="text-primary">depends on.</span>
                    </motion.h1>

                    <motion.p
                        variants={fade} initial="hidden" animate="show" custom={2}
                        className="mt-5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground"
                    >
                        Certified cables, fasteners, connectors and hardware — spec'd to your
                        requirement and ready to ship. Trusted by businesses across India,
                        available to everyone.
                    </motion.p>

                    <motion.div
                        variants={fade} initial="hidden" animate="show" custom={3}
                        className="mt-6 flex flex-wrap items-center gap-3"
                    >
                        <Link
                            href="/categories"
                            className="group inline-flex h-13 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Browse Catalogue
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex h-13 items-center gap-2 rounded-lg border border-border bg-card px-7 text-sm font-bold text-foreground transition-colors hover:bg-muted hover:border-primary/40"
                        >
                            <PhoneCall className="size-4 text-primary" />
                            Request a Quote
                        </Link>
                    </motion.div>

                    {/* Trust rail */}
                    <motion.dl
                        variants={fade} initial="hidden" animate="show" custom={4}
                        className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-4 sm:gap-x-4"
                    >
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex flex-col gap-1">
                                <Icon className="size-4 text-primary" />
                                <dd className="mt-1 font-display text-lg font-extrabold leading-none text-foreground">{value}</dd>
                                <dt className="tech-label text-muted-foreground">{label}</dt>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                {/* ── Right: live component showcase ── */}
                <motion.div
                    variants={fade} initial="hidden" animate="show" custom={2}
                    className="lg:col-span-6 xl:col-span-6"
                >
                    <div className="relative rounded-2xl border border-border bg-card p-3 shadow-xl shadow-primary/5">
                        {/* dimension-tick ruler */}
                        <div aria-hidden className="absolute inset-x-4 top-0 h-3 [background:repeating-linear-gradient(90deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_11px)] opacity-70" />

                        {/* panel header */}
                        <div className="mb-3 flex items-center justify-between px-1 pt-1">
                            <span className="tech-label text-muted-foreground">Featured Components</span>
                            <span className="tech-label text-primary">04 / IN STOCK</span>
                        </div>

                        <div className="relative grid grid-cols-2 gap-3">
                            {(loading ? Array.from({ length: 4 }) : products).map((p, i) => (
                                <ShowcaseCard key={p?._id || i} product={p} index={i} reduce={reduce} />
                            ))}

                            {/* corner glow */}
                            <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/10 blur-2xl" />
                        </div>

                        {/* floating assurance chip */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: reduce ? 0 : 0.7, duration: 0.5, ease }}
                            className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-lg"
                        >
                            <span className="flex size-8 items-center justify-center rounded-lg bg-signal/15 text-signal-foreground">
                                <Star className="size-4 fill-signal text-signal" />
                            </span>
                            <div className="leading-tight">
                                <p className="font-display text-sm font-extrabold text-foreground">Certified quality</p>
                                <p className="tech-label text-muted-foreground">Docs with every order</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

function ShowcaseCard({ product, index, reduce }) {
    const loading = !product;
    const image = product?.images?.[0] || "https://placehold.co/400x400?text=Component";
    const price = product?.salePrice || product?.price;
    const category = product?.categoryId?.label || "Component";

    const inner = (
        <>
            <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                {loading ? (
                    <div className="h-full w-full animate-pulse bg-muted" />
                ) : (
                    <img
                        src={image}
                        alt={product?.name || "Component"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                )}
                {product?.onSale && (
                    <span className="absolute left-2 top-2 rounded bg-destructive px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-destructive-foreground">
                        Sale
                    </span>
                )}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-border px-2.5 py-2">
                <div className="min-w-0">
                    <span className="block font-mono text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                        {loading ? "—" : category}
                    </span>
                    <span className="line-clamp-1 text-[13px] font-bold leading-tight text-foreground group-hover/card:text-primary transition-colors">
                        {loading ? "Loading…" : product?.name}
                    </span>
                </div>
                <span className="shrink-0 font-mono text-sm font-bold tabular-nums text-foreground">
                    {loading ? "" : price ? `₹${price}` : "—"}
                </span>
            </div>
        </>
    );

    const base = "group/card block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md";

    if (loading) {
        return <div className={base}>{inner}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.35 + index * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link href={`/products/${product._id}`} className={base}>
                {inner}
            </Link>
        </motion.div>
    );
}

export default Hero;
