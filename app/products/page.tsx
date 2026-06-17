import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductMenu from "@/components/product-menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products | Perfect White Bakery",
  description:
    "Explore our collection of artisanal cakes, pastries, and corporate catering options.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ProductMenu view="store" />
      <Footer />
    </main>
  );
}
