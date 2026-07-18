"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Layers, Sparkles, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShopPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <main className="min-h-screen bg-background pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
                {/* Page Header */}
                <div className="mb-10 md:mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl font-medium tracking-tight text-foreground"
                    >
                        Shop by Category
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl"
                    >
                        Certified fasteners, cables, connectors and hardware — organized by category so you can spec and source exactly what the job needs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.18 }}
                        className="mt-8 h-px w-full bg-border"
                    />
                </div>

                {/* Quick Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {[
                        { label: "New Arrivals", href: "/shop/new-arrivals", icon: <Sparkles className="size-3.5" /> },
                        { label: "Best Sellers", href: "/shop/best-sellers", icon: <Layers className="size-3.5" /> },
                        { label: "On Sale", href: "/shop/sale", icon: <ShoppingBag className="size-3.5" /> },
                    ].map((filter) => (
                        <Link
                            key={filter.label}
                            href={filter.href}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                        >
                            {filter.icon}
                            {filter.label}
                        </Link>
                    ))}
                </motion.div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="h-56 bg-muted animate-pulse rounded-2xl" />
                        ))
                    ) : categories.length > 0 ? (
                        categories.map((category, index) => (
                            <CategoryCard key={category._id} category={category} index={index} />
                        ))
                    ) : (
                        <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center gap-4">
                            <LayoutGrid className="size-10 text-muted-foreground/40" />
                            <p className="text-muted-foreground text-sm">No categories found. Check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function CategoryCard({ category, index }) {
    const { label, description } = category;
    // Guard: a category saved without an href (e.g. from admin) would render
    // <Link href={undefined}> and hard-crash the page in Next 16. Derive a
    // slug from the label as a fallback.
    const href =
        category.href ||
        (label ? `/categories/${label.trim().toLowerCase().replace(/\s+/g, "-")}` : "/categories");

    const mainImage = category.imageUrl || "https://placehold.co/600x400?text=Category";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
        >
            <Link
                href={href}
                className="group relative flex flex-col h-64 rounded-xl border border-border overflow-hidden bg-muted transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5"
            >
                {/* Image Overlay */}
                <div className="absolute inset-0">
                    <img 
                        src={mainImage} 
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400?text=" + encodeURIComponent(label);
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content */}
                <div className="relative mt-auto p-6 flex flex-col gap-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <div className="size-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg mb-1">
                        <ShoppingBag className="size-5" />
                    </div>

                    <h3 className="font-display text-xl font-medium text-white tracking-tight">
                        {label}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed line-clamp-2 max-w-[240px]">
                        {description || `Certified ${label} — spec'd and in stock.`}
                    </p>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest font-semibold text-white mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        Browse
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
