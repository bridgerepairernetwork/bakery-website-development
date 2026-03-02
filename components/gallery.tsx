"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LocalProduct {
  id: string;
  image: string;
}

interface RemoteItem {
  id: string;
  imageUrl: string;
  createdAt?: string;
}

// simple in-place Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// pull local images from hardcoded products list
// note: we import the products array from product-menu to avoid duplication
import { products } from "@/components/product-menu";

const PAGE_SIZE = 9;

export default function Gallery() {
  const [remoteItems, setRemoteItems] = useState<RemoteItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<LocalProduct[]>([]);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const localImages: LocalProduct[] = products.map((p) => ({
    id: p.id,
    image: p.image,
  }));

  // whenever remote items change, recompute shuffled gallery
  useEffect(() => {
    const combined: LocalProduct[] = [
      ...localImages,
      ...remoteItems.map((r) => ({ id: r.id, image: r.imageUrl })),
    ];
    setGalleryItems(shuffle(combined));
  }, [remoteItems]);

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let url = `/api/creations?limit=${PAGE_SIZE}`;
      if (lastCreatedAt) {
        url += `&startAfter=${encodeURIComponent(lastCreatedAt)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        if (data.items && data.items.length) {
          setRemoteItems((prev) => [...prev, ...data.items]);
          setLastCreatedAt(data.items[data.items.length - 1].createdAt || null);
          if (data.items.length < PAGE_SIZE) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } else {
        console.error("failed to load creations", data.error);
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  // fetch first page on mount
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <section className="py-16 md:py-24">
      {/* Gallery header same as product menu for styling */}
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

      {/* image grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative h-72 md:h-80 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt="gallery"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              disabled={loading}
              onClick={loadMore}
              className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition"
            >
              {loading ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
