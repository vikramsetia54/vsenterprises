"use client";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, FileText, Truck } from "lucide-react";

const footerLinks = [
	{
		label: "Catalogue",
		links: [
			{ title: "New Arrivals", href: "/shop/new-arrivals" },
			{ title: "Best Sellers", href: "/shop/best-sellers" },
			{ title: "Electronics", href: "/categories/electronics" },
			{ title: "On Sale", href: "/shop/sale" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "About Us", href: "/about" },
			{ title: "Blogs", href: "/blogs" },
			{ title: "Contact", href: "/contact" },
			{ title: "FAQs", href: "#" },
		],
	},
	{
		label: "Legal",
		links: [
			{ title: "Privacy Policy", href: "#" },
			{ title: "Terms & Conditions", href: "#" },
			{ title: "Shipping Policy", href: "#" },
			{ title: "Return Policy", href: "#" },
		],
	},
];

const assurances = [
	{ icon: ShieldCheck, text: "Certified Quality" },
	{ icon: FileText, text: "GST Invoicing" },
	{ icon: Truck, text: "Free Shipping ₹499+" },
];

export function Footer() {
	return (
		<footer className="w-full border-t border-border bg-card mt-10">
			{/* Assurance strip */}
			<div className="border-b border-border bg-muted/40">
				<div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
					{assurances.map(({ icon: Icon, text }) => (
						<div key={text} className="flex items-center justify-center gap-2.5 px-4 py-4">
							<Icon className="size-4 text-primary" />
							<span className="font-mono text-[11px] font-medium uppercase tracking-widest text-foreground">{text}</span>
						</div>
					))}
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 md:px-8 py-14">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{/* Brand Column */}
					<AnimatedContainer className="space-y-5 lg:col-span-4">
						<Logo className="h-10 md:h-12 w-auto" />
						<p className="text-sm text-muted-foreground leading-relaxed max-w-[300px]">
							Certified industrial and electrical components, spec'd to requirement and
							shipped nationwide. Serving businesses and individuals from Kanpur since day one.
						</p>
						<div className="space-y-2.5 pt-1">
							<a href="tel:+918318005329" className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
								<Phone className="size-4 text-muted-foreground" />
								+91 8318005329
							</a>
							<a href="mailto:info@vsenterprisesgroup.in" className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
								<Mail className="size-4 text-muted-foreground" />
								info@vsenterprisesgroup.in
							</a>
							<p className="flex items-start gap-2.5 text-sm text-muted-foreground">
								<MapPin className="size-4 shrink-0 translate-y-0.5" />
								53, Panki Site 3, Meeta Sarai, Kanpur Nagar, Uttar Pradesh 208022
							</p>
						</div>
					</AnimatedContainer>

					{/* Links Grid */}
					<div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-8">
						{footerLinks.map((section, index) => (
							<AnimatedContainer delay={0.1 + index * 0.08} key={section.label}>
								<h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{section.label}</h3>
								<ul className="space-y-3">
									{section.links.map((link) => (
										<li key={link.title}>
											<Link
												href={link.href}
												className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-primary"
											>
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</AnimatedContainer>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} VS Enterprises. All rights reserved.
					</p>
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						Industrial &amp; Electrical Supply
					</p>
				</div>
			</div>
		</footer>
	);
}

function AnimatedContainer({ className, delay = 0.1, children }) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 12 }}
			transition={{ delay, duration: 0.5, ease: "easeOut" }}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, y: 0 }}>
			{children}
		</motion.div>
	);
}
