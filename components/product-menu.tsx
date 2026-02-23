"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";

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
    image: "/imgs/cake-assets-1.jpeg",
    description: "Decadent chocolate layers with silky ganache",
    servings: "10-12 servings",
  },
  {
    id: "2",
    name: "Rainbow Macaron Tower",
    category: "celebrations",
    price: "From $120",
    image: "/imgs/cake-assets-2.jpeg",
    description: "Colorful handmade macarons in elegant tower",
    servings: "24 pieces",
  },
  {
    id: "3",
    name: "Buttery Croissants",
    category: "everything",
    price: "From $4.50",
    image: "/imgs/cake-assets-3.jpeg",
    description: "Classic French butter croissants, perfectly flaky",
    servings: "Individual",
  },
  {
    id: "4",
    name: "Artisan Sourdough",
    category: "everything",
    price: "From $8",
    image: "/imgs/cake-assets-4.jpeg",
    description: "Handcrafted sourdough with perfect crust",
    servings: "1 loaf",
  },
  {
    id: "5",
    name: "Berry Tart Elegance",
    category: "celebrations",
    price: "From $65",
    image: "/imgs/cake-assets-5.jpeg",
    description: "Fresh berries on custard with pastry shell",
    servings: "8 servings",
  },
  {
    id: "6",
    name: "Tiered Wedding Cake",
    category: "wedding-cakes",
    price: "From $250",
    image: "/imgs/cake-assets-6.jpeg",
    description: "Elegant three-tier white cake with fondant",
    servings: "30-40 servings",
  },
  {
    id: "7",
    name: "Corporate Catering Platter",
    category: "corporate",
    price: "From $200",
    image: "/imgs/cake-assets-7.jpeg",
    description: "Assorted pastries and savory options",
    servings: "20-25 pieces",
  },
  {
    id: "8",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-8.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "9",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-9.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "10",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-10.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "11",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-11.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "12",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-12.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "13",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-13.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "14",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-14.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "15",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-15.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "16",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/cake-assets-16.jpeg",
    description: "Custom flavored cake with personalized design",
    servings: "15-20 servings",
  },
  {
    id: "17",
    name: "Birthday Celebration Cake",
    category: "celebrations",
    price: "From $55",
    image: "/imgs/customer-1.jpeg",
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

export default function ProductMenu() {
  const [selectedCategory, setSelectedCategory] = useState("everything");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProducts =
    selectedCategory === "everything"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
                {/* <div className="mb-3">
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
                )} */}

                {/* Price and Action */}
                {/* <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <span className="text-lg font-black text-primary">
                    {product.price}
                  </span>
                  <button className="bg-primary hover:bg-accent text-white p-2.5 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/20">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div> */}
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
            Can&#39;t Find What You&#39;re Looking For?
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
