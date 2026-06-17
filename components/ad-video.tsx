"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AdVideo() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[16px] border-white group">
          <video
            src="/ads.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-contain"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-700" />

          {/* Mute/Unmute Toggle Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-8 right-8 z-20 w-12 h-12 text-black rounded-full bg-gray-500/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-all border border-white/20 shadow-lg"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
            <h3 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter">
              Experience Sweet Reality
            </h3>
            <p className="text-base md:text-xl font-medium text-white/90 max-w-2xl leading-relaxed">
              Watch how we turn your sweet dreams into handcrafted reality with
              love and the finest ingredients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
