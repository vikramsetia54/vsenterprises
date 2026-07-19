"use client";
import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
    getVariantMetrics,
    getPricingRows,
    defaultSelection,
    findVariantPrice,
    formatValue,
} from "@/lib/variants";

export function ProductsSection({ 
    title = "Latest Products", 
    subtitle = "Explore our premium selection", 
    filterType = "newArrival",
    limit = 4 
}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                let url = `/api/products?limit=${limit}`;
                
                if (["newArrival", "bestSeller", "onSale"].includes(filterType)) {
                    url += `&${filterType}=true`;
                } else if (filterType) {
                    url += `&categoryId=${filterType}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("API Error:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [filterType, limit]);

    return (
        <section className="py-14 md:py-18">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                {/* Section Header */}
                <div className="mb-8 flex flex-col gap-5 md:mb-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="max-w-xl"
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {subtitle}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Button
                                onClick={() => window.location.href = "/categories"}
                                variant="outline"
                                className="h-10 rounded-lg px-5 text-sm font-bold border-border hover:bg-primary hover:text-primary-foreground hover:border-primary group transition-all duration-200"
                            >
                                View All
                                <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </motion.div>
                    </div>
                    <div className="h-px w-full bg-border" />
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array(limit).fill(0).map((_, i) => (
                            <div key={i} className="space-y-3 animate-pulse">
                                <div className="bg-muted aspect-square rounded-2xl" />
                                <div className="space-y-2 px-1">
                                    <div className="h-3 bg-muted rounded w-1/3" />
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-1/4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }) {
    const { 
        _id, 
        name, 
        price: defaultPrice, 
        images, 
        rating, 
        onSale, 
        salePrice, 
        newArrival, 
        categoryId,
        isVariantProduct,
        unit
    } = product;

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(_id);

    // Admin-defined variant dimensions; legacy products are normalized.
    const metrics = useMemo(
        () => (isVariantProduct ? getVariantMetrics(product) : []),
        [isVariantProduct, product]
    );
    const [selected, setSelected] = useState(() => defaultSelection(metrics));
    const [currentPrice, setCurrentPrice] = useState(salePrice || defaultPrice);

    useEffect(() => {
        const fallback = salePrice || defaultPrice;
        if (!isVariantProduct) {
            setCurrentPrice(fallback);
            return;
        }
        const rows = getPricingRows(product, metrics);
        const price = findVariantPrice(rows, metrics, selected);
        setCurrentPrice(price ?? fallback);
    }, [selected, metrics, isVariantProduct, product, salePrice, defaultPrice]);

    const handleAddToCart = () => {
        if (!product.inStock) return;

        // Label the selection so the cart/order shows "Length: 10 mm".
        const selectedOptions = {};
        for (const m of metrics) {
            const value = selected[m.key];
            if (value) selectedOptions[m.label] = formatValue(value, m.unit);
        }
        addToCart({ ...product, price: currentPrice }, 1, selectedOptions);
    };

    const handleWishlist = () => {
        toggleWishlist(product);
    };

    const mainImage = images?.[0] || "https://placehold.co/600x600?text=Product";
    
    return (
        <div className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {newArrival && (
                    <span className="px-2 py-0.5 bg-foreground text-background font-mono text-[9px] font-semibold uppercase tracking-widest rounded">
                        New
                    </span>
                )}
                {onSale && (
                    <span className="px-2 py-0.5 bg-destructive text-destructive-foreground font-mono text-[9px] font-semibold uppercase tracking-widest rounded">
                        Sale
                    </span>
                )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <button
                    aria-label="Add to wishlist"
                    onClick={handleWishlist}
                    className={cn(
                        "size-8 rounded-lg shadow-sm border flex items-center justify-center transition-colors duration-200",
                        isWishlisted ? "bg-destructive text-destructive-foreground border-destructive" : "bg-card text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    )}
                >
                    <Heart className={cn("size-3.5", isWishlisted && "fill-current")} />
                </button>
                <button
                    aria-label="Add to cart"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={cn(
                        "size-8 rounded-lg bg-card text-foreground border border-border shadow-sm flex items-center justify-center transition-colors duration-200",
                        product.inStock
                            ? "hover:bg-primary hover:text-primary-foreground hover:border-primary"
                            : "opacity-40 pointer-events-none"
                    )}
                >
                    <ShoppingCart className="size-3.5" />
                </button>
            </div>

            {/* Image */}
            <Link href={`/products/${_id}`} className="relative aspect-square overflow-hidden bg-muted">
                <img
                    src={mainImage}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Product Info */}
            <div className="flex flex-col flex-1 p-4 gap-3 border-t border-border">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                        {categoryId?.label || "Component"}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star className="size-3 fill-signal text-signal" />
                        <span className="font-mono text-[11px] font-medium text-muted-foreground tabular-nums">{rating ? Number(rating).toFixed(1) : "5.0"}</span>
                    </div>
                </div>

                <Link href={`/products/${_id}`}>
                    <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {name}
                    </h3>
                </Link>

                {/* Variant Selectors */}
                {isVariantProduct && metrics.length > 0 && (
                    <div className="space-y-2 pb-2">
                        {metrics.map((m) => (
                            <div key={m.key} className="flex items-center gap-2">
                                <label className="text-[10px] font-bold text-muted-foreground w-12 uppercase truncate" title={m.label}>
                                    {m.label}
                                </label>
                                <select
                                    className="text-[11px] bg-muted/50 border-none rounded px-1.5 py-1 focus:ring-1 focus:ring-primary w-full outline-none"
                                    value={selected[m.key] ?? ""}
                                    onChange={(e) =>
                                        setSelected((prev) => ({ ...prev, [m.key]: e.target.value }))
                                    }
                                >
                                    {m.values.map((v) => (
                                        <option key={v} value={v}>{formatValue(v, m.unit)}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <div className="flex flex-col">
                        <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-muted-foreground leading-none">Per {unit || "pcs"}</span>
                        <span className="mt-1 font-mono text-lg font-bold text-foreground tabular-nums group-hover:text-primary transition-colors">
                            {currentPrice ? `₹${currentPrice}` : "N/A"}
                        </span>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        aria-label={product.inStock ? "Add to cart" : "Out of stock"}
                        className={cn(
                            "h-9 rounded-lg px-3 gap-1.5 text-xs font-bold shadow-sm transition-all active:scale-95",
                            !product.inStock && "bg-muted text-muted-foreground pointer-events-none"
                        )}
                    >
                        <ShoppingCart className="size-3.5" />
                        {product.inStock ? "Add" : "Out of Stock"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
