"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setEmail("");
    }, 500);
  };

  return (
    <section id="events" className="py-20 px-6">
      <div className="max-w-6xl mx-auto bg-primary rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />

        <div className="relative z-10 w-full text-center md:text-left">
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Host the <br />
            <span className="text-white">Perfect Event.</span>
          </h3>
          <p className="text-white/80 text-lg mb-10 max-w-md">
            Our bespoke services book up fast. Secure your date and let us
            handle the details of your next celebration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <Link
              href="/contact"
              className="bg-accent text-white font-black px-12 py-5 rounded-full hover:scale-105 transition-transform uppercase tracking-widest shadow-xl shadow-accent/20"
            >
              Inquire Now
            </Link>
            <Link
              href="/gallery"
              className="bg-transparent border-2 border-white/30 text-white font-black px-10 py-5 rounded-full hover:bg-white/10 transition-all uppercase tracking-widest"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
