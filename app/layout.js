import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PromoBanner, MobilePromoBanner } from "@/components/promo-banner";

export const metadata = {
  title: "VS Enterprises — Premium Quality Products",
  description: "Discover premium electronics, apparel, home decor and more at VS Enterprises. 1,50,000+ orders delivered. Free shipping on ₹499+.",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <ClerkProvider>
          <CartProvider>
            <WishlistProvider>
              <PromoBanner />
              <MobilePromoBanner />
              <Header />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
