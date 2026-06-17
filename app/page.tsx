import Header from "@/components/header";
import Hero from "@/components/hero";
import BrandSection from "@/components/brand-section";
import ProductsSection from "@/components/products-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import FounderSection from "@/components/founder-section";
import AdVideo from "@/components/ad-video";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AdVideo />
      <BrandSection />
      <ProductsSection />
      <CTASection />
      <FounderSection />
      <Footer />
    </main>
  );
}
