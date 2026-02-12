"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  servings?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Velvet Chocolate Cake",
    category: "wedding-cakes",
    price: "From $85",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
    description: "Decadent chocolate layers with silky ganache",
    servings: "10-12 servings",
  },
  {
    id: "2",
    name: "Rainbow Macaron Tower",
    category: "celebrations",
    price: "From $120",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop",
    description: "Colorful handmade macarons in elegant tower",
    servings: "24 pieces",
  },
  {
    id: "3",
    name: "Buttery Croissants",
    category: "everything",
    price: "From $4.50",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop",
    description: "Classic French butter croissants, perfectly flaky",
    servings: "Individual",
  },
  {
    id: "4",
    name: "Artisan Sourdough",
    category: "everything",
    price: "From $8",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
    description: "Handcrafted sourdough with perfect crust",
    servings: "1 loaf",
  },
  // {
  //   id: '5',
  //   name: 'Berry Tart Elegance',
  //   category: 'celebrations',
  //   price: 'From $65',
  //   image: 'https://images.unsplash.com/photo-1535920527894-b40a2b77adc3?w=600&h=600&fit=crop',
  //   description: 'Fresh berries on custard with pastry shell',
  //   servings: '8 servings'
  // },
  // {
  //   id: '6',
  //   name: 'Tiered Wedding Cake',
  //   category: 'wedding-cakes',
  //   price: 'From $250',
  //   image: 'https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=600&h=600&fit=crop',
  //   description: 'Elegant three-tier white cake with fondant',
  //   servings: '30-40 servings'
  // },
  {
    id: "7",
    name: "Corporate Catering Platter",
    category: "corporate",
    price: "From $200",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
    description: "Assorted pastries and savory options",
    servings: "20-25 pieces",
  },
  {
    id: "8",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
];

const categories = [
  { id: "everything", label: "Everything" },
  { id: "wedding-cakes", label: "Wedding Cakes" },
  { id: "celebrations", label: "Celebrations" },
  { id: "corporate", label: "Corporate" },
];

export function ProductMenu() {
  const [selectedCategory, setSelectedCategory] = useState("everything");
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filteredProducts =
    selectedCategory === "everything"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleLike = (id: string) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLiked(newLiked);
  };

  return (
    <section className="py-16 md:py-24">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            PORTFOLIO
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
          The Gallery of Delights
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Exceptional craftsmanship for your most precious moments. Explore our
          curated selection of bespoke cakes and event designs.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                  : "bg-white text-primary hover:bg-blue-50 border border-primary/10 hover:border-primary/30"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Product Image */}
              <div className="relative h-72 md:h-80 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg group-hover:scale-110"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      liked.has(product.id)
                        ? "fill-accent text-accent"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-2">
                    {categories.find((c) => c.id === product.category)?.label}
                  </span>
                  <h3 className="text-lg font-black text-primary group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {product.servings && (
                  <p className="text-xs font-semibold text-gray-500 mb-4">
                    {product.servings}
                  </p>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <span className="text-lg font-black text-primary">
                    {product.price}
                  </span>
                  <button className="bg-primary hover:bg-accent text-white p-2.5 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/20">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 py-12 rounded-lg max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-black text-primary mb-3">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-600 mb-6">
            We create custom cakes and catering solutions tailored to your
            vision. Contact us for a personalized consultation.
          </p>
          <button className="bg-accent hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 shadow-lg shadow-accent/30 uppercase tracking-wider">
            Request Custom Order
          </button>
        </div>
      </div>
    </section>
  );
}
