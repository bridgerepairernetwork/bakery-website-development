"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface AdminItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cloudinaryId: string;
  category: "Signature" | "Seasonal" | "Wedding" | "Pastry" | "Savory";
  featured: boolean;
}

// placeholder until real data loads
const initialItems: AdminItem[] = [];

const categoryColors: Record<string, string> = {
  Signature: "bg-slate-900",
  Seasonal: "bg-accent",
  Wedding: "bg-slate-800",
  Pastry: "bg-blue-600",
  Savory: "bg-green-600",
};

interface AdminGridProps {
  viewMode: "grid" | "list";
}

export default function AdminGrid({ viewMode }: AdminGridProps) {
  const { user } = useAuth();
  const [items, setItems] = useState<AdminItem[]>(initialItems);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/creations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setItems(data.items || []);
      } else {
        console.error("fetch error", data.error);
      }
      setLoading(false);
    }
    fetchItems();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!id) {
      console.warn("attempted to delete with empty id");
      return;
    }
    if (!confirm("Delete this item?")) return;
    console.log("Deleting creation with id", id);
    const token = await user.getIdToken();
    const res = await fetch(`/api/admin/creations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      const data = await res.json();
      console.error("delete error", data.error);
    }
  };

  return (
    <>
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewUrl(null)}
        >
          <img
            src={previewUrl}
            alt="preview"
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <section className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-800">
            Active Showcase ({items.length})
          </h3>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={false}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setPreviewUrl(item.imageUrl)}
                      className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 rounded-full bg-white text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 ${categoryColors[item.category]} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full`}
                  >
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-bold text-lg mb-1 text-slate-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 p-4 flex gap-4 items-center"
              >
                <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="128px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={false}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div
                      className={`${categoryColors[item.category]} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap ml-4`}
                    >
                      {item.category}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* <button
                  onClick={() => {}}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-accent hover:text-white transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button> */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-slate-100 text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
