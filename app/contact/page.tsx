'use client'

import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    serviceType: 'custom-wedding-cake',
    vision: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormData({ name: '', email: '', eventDate: '', serviceType: 'custom-wedding-cake', vision: '' })
    setIsSubmitting(false)
    alert('Thank you for your inquiry! We will contact you soon.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl mx-auto max-w-6xl mt-8 md:mt-12 px-6 shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&h=400&fit=crop"
          alt="Perfect White bakery storefront"
          fill
          className="object-cover"
          priority
        />
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/50 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-3">Get in Touch</h1>
          <p className="text-white/90 text-base md:text-lg max-w-lg">
            Create unforgettable memories with our bespoke cakes and event planning services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-3">Let's Plan Your Next Event</h2>
              <p className="text-gray-600 text-lg">
                Contact our specialist team for a custom cake consultation or event design session.
              </p>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Inquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="px-4 py-3 rounded-xl border border-primary/20 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                      className="px-4 py-3 rounded-xl border border-primary/20 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Date and Service Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 rounded-xl border border-primary/20 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Service Type</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl border border-primary/20 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="custom-wedding-cake">Custom Wedding Cake</option>
                      <option value="event-styling">Event Styling & Decor</option>
                      <option value="corporate-catering">Corporate Catering</option>
                      <option value="private-celebration">Private Celebration</option>
                    </select>
                  </div>
                </div>

                {/* Vision Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Your Vision</label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                    placeholder="Share your theme, guest count, and any special requests..."
                    rows={4}
                    className="px-4 py-3 rounded-xl border border-primary/20 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/30 active:scale-95 uppercase tracking-wide"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Location Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Map Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold text-primary">Our Showroom</h3>
                <div className="flex items-center gap-2 text-primary font-bold text-xs bg-blue-50 px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4" />
                  Manhattan, NY
                </div>
              </div>

              {/* Map Image */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-primary/10 group">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=500&fit=crop"
                  alt="Our showroom location"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Centered Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-primary text-white p-4 rounded-full shadow-2xl ring-8 ring-white/50">
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* The Studio Card */}
              <div className="p-6 bg-blue-50/50 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-xl text-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">The Studio</p>
                    <p className="text-gray-600 text-sm mt-1">456 Artisan Square, Chelsea<br />New York, NY 10011</p>
                    <a href="#" className="text-accent text-xs font-bold mt-3 inline-block hover:underline tracking-widest uppercase">
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Inquiries Card */}
              <div className="p-6 bg-blue-50/50 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-xl text-white flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">Inquiries</p>
                    <div className="text-gray-600 text-sm mt-2 space-y-2">
                      <div className="flex justify-between gap-6 items-start">
                        <span>General</span>
                        <span className="font-semibold text-gray-800">hello@perfectwhite.com</span>
                      </div>
                      <div className="flex justify-between gap-6 items-start">
                        <span>Events</span>
                        <span className="font-semibold text-gray-800">events@perfectwhite.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-4">
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
                  aria-label="Chat"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
