"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Gallery />
      <Footer />
    </main>
  );
}
