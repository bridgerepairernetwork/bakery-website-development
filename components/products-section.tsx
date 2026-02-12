"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "White Velvet Dream",
    description: "Madagascar vanilla bean",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "Signature Croissant",
    description: "Double-buttered layers",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    name: "Midnight Cocoa",
    description: "70% dark silk ganache",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "4",
    name: "Summer Berry Tart",
    description: "Wild harvested berries",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
];

export function ProductsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="products" className="py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">
              Signature Series
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-primary">
              Perfectly White Classics
            </h3>
          </div>
          <Link
            href="/gallery"
            className="text-primary font-black flex items-center gap-2 hover:text-accent transition-colors uppercase text-sm tracking-widest w-fit"
          >
            <span className="mr-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">
              Full Collection
            </span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-xl bg-white border border-primary/5">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  src={product.image || "/placeholder.svg"}
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-accent text-white font-bold px-6 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform">
                    Inquire Now
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start px-1">
                <div>
                  <h4 className="font-bold text-lg text-primary">
                    {product.name}
                  </h4>
                  <p className="text-sm text-primary/50">
                    {product.description}
                  </p>
                </div>
                <span className="text-accent font-black">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
