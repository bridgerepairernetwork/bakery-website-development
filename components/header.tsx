'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Gallery', href: '/menu' },
    { label: 'Our Portfolio', href: '#portfolio' },
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '/contact' },
  ]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={handleNavClick}>
          <div className="flex flex-col">
            <div className="text-lg font-black tracking-tight uppercase text-primary">
              Perfect White
            </div>
            <div className="text-xs font-bold text-accent uppercase tracking-widest">
              Cakes and Events
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-primary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-primary hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-wider">
            Book Event
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" strokeWidth={3} />
          ) : (
            <Menu className="w-6 h-6 text-primary" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-white h-screen max-h-[calc(100vh-4rem)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Menu Content */}
            <nav className="flex flex-col px-6 py-8">
              {/* Navigation Links */}
              <div className="space-y-2 pb-8 border-b border-primary/10">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="block text-base font-semibold text-primary hover:text-accent transition-colors py-3 pl-4 border-l-4 border-transparent hover:border-accent hover:bg-secondary rounded-r-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full mt-6 bg-primary hover:bg-blue-700 text-white text-sm font-bold py-3 px-6 rounded-full transition-all active:scale-95 uppercase tracking-wider shadow-lg shadow-primary/20">
                Book Event
              </button>

              {/* Contact Info Section */}
              <div className="mt-10 pt-8 border-t border-primary/10 space-y-6">
                <h3 className="text-xs uppercase font-bold text-primary tracking-widest">Get in Touch</h3>
                
                <a href="tel:+1234567890" className="flex items-center gap-4 text-primary hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase font-bold text-accent">Phone</span>
                    <span className="text-sm font-semibold">(555) 123-4567</span>
                  </div>
                </a>

                <a href="mailto:hello@perfectwhite.com" className="flex items-center gap-4 text-primary hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase font-bold text-accent">Email</span>
                    <span className="text-sm font-semibold">hello@perfectwhite.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-primary">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase font-bold text-accent">Visit Us</span>
                    <span className="text-sm font-semibold">123 Pastry Lane, Suite 100</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-primary/10">
                <h3 className="text-xs uppercase font-bold text-primary tracking-widest mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
