'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-2xl font-black tracking-tight uppercase text-primary">
            Perfect White
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="#story" className="text-sm font-bold text-primary hover:text-accent transition-colors">
            Our Story
          </Link>
          <Link href="#products" className="text-sm font-bold text-primary hover:text-accent transition-colors">
            Celebration Cakes
          </Link>
          <Link href="#events" className="text-sm font-bold text-primary hover:text-accent transition-colors">
            Event Planning
          </Link>
          <Link href="#contact" className="text-sm font-bold text-primary hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-accent hover:bg-accent/90 text-white text-sm font-black py-2.5 px-6 rounded-full transition-all active:scale-95 shadow-lg shadow-accent/20 uppercase tracking-wider">
            Order Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-primary/5 bg-white">
          <nav className="flex flex-col gap-1 px-6 py-4">
            <Link href="#story" className="text-sm font-bold text-primary hover:text-accent transition-colors py-2">
              Our Story
            </Link>
            <Link href="#products" className="text-sm font-bold text-primary hover:text-accent transition-colors py-2">
              Celebration Cakes
            </Link>
            <Link href="#events" className="text-sm font-bold text-primary hover:text-accent transition-colors py-2">
              Event Planning
            </Link>
            <Link href="#contact" className="text-sm font-bold text-primary hover:text-accent transition-colors py-2">
              Contact
            </Link>
            <button className="w-full mt-4 bg-accent hover:bg-accent/90 text-white text-sm font-black py-2.5 px-6 rounded-full transition-all uppercase tracking-wider">
              Order Now
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
