import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/10 to-primary/60 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)",
            backgroundAttachment: "fixed",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block mb-4 text-white font-bold tracking-widest uppercase text-xs md:text-sm bg-accent/90 px-4 py-1 rounded-full">
          Excellence in Every Bite
        </span>
        <h1 className="text-white text-5xl md:text-8xl font-black leading-tight mb-6 tracking-tighter text-balance">
          Perfectly White <br />
          <span className="text-white italic font-light">Artisan Cakes</span>
        </h1>
        <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          Handcrafted celebration cakes and bespoke event catering designed for
          your most precious moments. Sophistication meets sweet perfection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/gallery"
            className="bg-accent text-white text-base font-black px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-xl shadow-accent/40 uppercase tracking-widest"
          >
            Explore Menu
          </Link>
          <Link
            href="/contact"
            className="bg-white text-primary border-2 border-white text-base font-black px-10 py-4 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all uppercase tracking-widest"
          >
            Book Event
          </Link>
        </div>
      </div>
    </section>
  );
}
