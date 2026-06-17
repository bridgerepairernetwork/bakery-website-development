"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductMenu from "@/components/product-menu";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ProductMenu view="gallery" />
      <Footer />
    </main>
  );
}
