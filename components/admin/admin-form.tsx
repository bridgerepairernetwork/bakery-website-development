"use client";

import { useState, useRef } from "react";
import { X, ImagePlus } from "lucide-react";
import { auth } from "@/lib/firebaseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminFormProps {
  onClose: () => void;
}

export default function AdminForm({ onClose }: AdminFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Signature Collection");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState<"product" | "media">("product");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    try {
      // upload to cloudinary via our API
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      // create Firestore document
      const creationRes = await fetch("/api/admin/creations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          price: price ? Number(price) : null,
          type,
          featured,
          imageUrl: uploadData.url,
          cloudinaryId: uploadData.public_id,
        }),
      });
      const creationData = await creationRes.json();
      if (!creationRes.ok) throw new Error(creationData.error || "Save failed");

      toast.success("Creation saved successfully!");
      setTitle("");
      setCategory("Signature Collection");
      setPrice("");
      setDescription("");
      setType("product");
      setFeatured(false);
      setFile(null);
      setPreview(null);

      onClose();
      router.push("/admin");
    } catch (err: any) {
      console.error("save error", err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full lg:w-[450px] border-l border-slate-100 bg-white flex flex-col shadow-2xl fixed right-0 top-0 bottom-0 z-40 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h3 className="text-xl font-bold text-slate-900">New Entry</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-50 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto p-8 space-y-8"
      >
        {/* Image Upload */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            Main Photography
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                if (f) {
                  setPreview(URL.createObjectURL(f));
                } else {
                  setPreview(null);
                }
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/3] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 hover:border-accent transition-all cursor-pointer group-hover:scale-[1.02]"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="object-cover w-full h-full rounded-xl"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ImagePlus className="w-8 h-8 text-accent" />
                  </div>
                  <p className="font-bold text-slate-700">
                    Upload high-res image
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Recommended: 1200 x 900px (JPG or PNG)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Entry Type Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            Entry Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType("product")}
              className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                type === "product"
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-slate-100 bg-slate-50 text-slate-400"
              }`}
            >
              Product
            </button>
            <button
              type="button"
              onClick={() => setType("media")}
              className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                type === "media"
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-slate-100 bg-slate-50 text-slate-400"
              }`}
            >
              Gallery Media
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]"
          >
            Creation Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Lavender & Honey Macarons"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
            >
              <option>Signature Collection</option>
              <option>Seasonal Special</option>
              <option>Wedding & Events</option>
              <option>Pastry Series</option>
              <option>Savory Selections</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Price Input - only for products */}
        {type === "product" && (
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]"
            >
              Price Information
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 85000"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
            />
          </div>
        )}

        {/* Description Textarea */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]"
          >
            Story & Details
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the ingredients, the process, and what makes this creation unique..."
            rows={5}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none resize-none"
          />
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium text-slate-600 cursor-pointer"
          >
            Featured in Homepage
          </label>
        </div>
      </form>

      {/* Footer Buttons */}
      <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-white hover:border-slate-300 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-4 bg-accent text-white rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Creation"}
        </button>
      </div>
    </section>
  );
}
