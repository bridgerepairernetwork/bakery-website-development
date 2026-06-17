"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string | number;
  image: string;
  description: string;
  servings?: string;
  type: "product" | "media";
}

const categories = [
  { id: "everything", label: "Everything" },
  { id: "Signature Collection", label: "Signature" },
  { id: "Seasonal Special", label: "Seasonal" },
  { id: "Wedding & Events", label: "Weddings" },
  { id: "Pastry Series", label: "Pastry" },
  { id: "Savory Selections", label: "Savory" },
];

interface ProductMenuProps {
  view?: "store" | "gallery";
}

export const products: Product[] = [];

export default function ProductMenu({ view = "store" }: ProductMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("everything");
  const [menuProducts, setMenuProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/creations?limit=100");
        const data = await res.json();
        if (res.ok && data.items) {
          const mapped = data.items.map((item: any) => ({
            id: item.id,
            name: item.title,
            category: item.category,
            price:
              item.price !== undefined && item.price !== null
                ? item.price
                : "Contact for Price",
            image: item.imageUrl,
            description: item.description,
            servings: item.servings,
            type: item.type,
          }));
          setMenuProducts(mapped);
        }
      } catch (e) {
        console.error("Error fetching products:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = menuProducts.filter((p) => {
    // Store view only shows products, Gallery view shows everything
    const typeMatch = view === "store" ? p.type === "product" : true;
    const matchesCategory =
      selectedCategory === "everything" || p.category === selectedCategory;
    return typeMatch && matchesCategory;
  });

  const openModal = (imageUrl: string) => {
    document.body.style.overflow = "hidden";
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setSelectedImage(null);
  };

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
            {view === "store" ? "OUR MENU" : "PORTFOLIO"}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
          {view === "store"
            ? "Artisanal Collection"
            : "The Gallery of Delights"}
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          {view === "store"
            ? "Explore our curated selection of bespoke cakes, pastries, and savory delights available for order."
            : "Exceptional craftsmanship for your most precious moments. Explore our curated selection of bespoke cakes and event designs."}
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
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Product Image */}
                <div className="relative h-72 md:h-80 overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => openModal(product.image)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={false}
                    />
                  </div>
                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
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

                  {view === "store" && (
                    <>
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
                          {typeof product.price === "number"
                            ? new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 0,
                              }).format(product.price)
                            : product.price}
                        </span>
                        <button className="bg-primary hover:bg-accent text-white p-2.5 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/20">
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-medium">
              {view === "store"
                ? "No products are currently available in this category."
                : "Our gallery is currently being updated. Check back soon!"}
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 py-12 rounded-lg max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-black text-primary mb-3">
            Can&#39;t Find What You&#39;re Looking For?
          </h3>
          <p className="text-gray-600 mb-6">
            We create custom cakes and catering solutions tailored to your
            vision. Contact us for a personalized consultation.
          </p>
          <Button
            asChild
            className="bg-accent hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 shadow-lg shadow-accent/30 uppercase tracking-wider"
          >
            <Link href="/contact">Request Custom Order</Link>
          </Button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="absolute top-4 right-4 text-white z-[110] bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
            onClick={closeModal}
            aria-label="Close image view"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-4xl max-h-fit w-fit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
          >
            <Image
              src={selectedImage}
              alt="Enlarged product view"
              width={1200}
              height={1200}
              className="object-contain w-full h-full rounded-lg shadow-2xl"
              style={{ maxHeight: "90vh" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
