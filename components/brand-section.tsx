import { CheckCircle2, CalendarCheck } from 'lucide-react'

export function BrandSection() {
  return (
    <section id="story" className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Our Brand</h2>
            <h3 className="text-4xl md:text-5xl font-black leading-tight text-primary">
              Pure Craftsmanship, Timeless Elegance
            </h3>
          </div>
          <p className="text-lg text-primary/70 leading-relaxed">
            At Perfect White, we believe that every event deserves a center-piece that is as stunning as it is
            delicious. Our cakes are created using premium ingredients, focusing on clean aesthetics and sophisticated
            flavor profiles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <CheckCircle2 className="text-accent text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-primary mb-1">Premium Ingredients</h4>
                <p className="text-sm text-primary/60">Only the finest organic flours and artisanal chocolates.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <CalendarCheck className="text-accent text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-primary mb-1">Bespoke Design</h4>
                <p className="text-sm text-primary/60">Tailored event planning and cake design for your unique vision.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 rounded-3xl rotate-2 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border-8 border-white">
            <img
              alt="Chef at Work"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
